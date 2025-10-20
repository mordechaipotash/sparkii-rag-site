// Sparkii RAG Search API - Vercel Edge Proxy with Caching
// Proxies requests to Railway FastAPI backend

export const config = {
  runtime: 'edge',
};

// In-memory cache for edge function (resets on cold start)
const cache = new Map();
const CACHE_TTL_MS = 3600000; // 1 hour

export default async function handler(req) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await req.json();
    const { query, top_k = 10, filters = null } = body;

    if (!query || query.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate cache key
    const cacheKey = JSON.stringify({ query, top_k, filters });

    // Check cache
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return new Response(
        JSON.stringify({
          ...cached.data,
          cached: true,
          cache_age_seconds: Math.floor((Date.now() - cached.timestamp) / 1000)
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'X-Cache': 'HIT',
            'Cache-Control': `public, max-age=${Math.floor(CACHE_TTL_MS / 1000)}`
          }
        }
      );
    }

    // Call Railway FastAPI backend
    const railwayUrl = process.env.RAILWAY_API_URL || 'https://your-railway-app.railway.app';

    const response = await fetch(`${railwayUrl}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        top_k,
        filters,
        include_context: true,
        distance_threshold: 1.0
      }),
    });

    if (!response.ok) {
      throw new Error(`Railway API error: ${response.status} ${response.statusText}`);
    }

    const results = await response.json();

    // Cache the results
    cache.set(cacheKey, {
      data: results,
      timestamp: Date.now()
    });

    // Clean up old cache entries (keep last 100)
    if (cache.size > 100) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    return new Response(
      JSON.stringify({
        ...results,
        cached: false
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-Cache': 'MISS',
          'Cache-Control': `public, max-age=${Math.floor(CACHE_TTL_MS / 1000)}`
        }
      }
    );

  } catch (error) {
    console.error('Search proxy error:', error);
    return new Response(
      JSON.stringify({
        error: 'Search failed',
        details: error.message,
        hint: 'Railway backend may not be running. Check RAILWAY_API_URL env variable.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
