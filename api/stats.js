// Sparkii RAG Stats API - Cached System Statistics
// Shows 253K messages, stella quality, coverage metrics

export const config = {
  runtime: 'edge',
};

let cachedStats = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 3600000; // 1 hour - stats don't change often

export default async function handler(req) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Check cache
    if (cachedStats && (Date.now() - cacheTimestamp) < CACHE_TTL_MS) {
      return new Response(
        JSON.stringify({
          ...cachedStats,
          cached: true,
          cache_age_seconds: Math.floor((Date.now() - cacheTimestamp) / 1000)
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

    const response = await fetch(`${railwayUrl}/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Fallback to hardcoded stats if Railway is down
      return new Response(
        JSON.stringify({
          total_messages: 253432,
          stella_embeddings: 250872,
          stella_coverage: 0.9899,
          avg_similarity: 0.948,
          conversations: 11438,
          embedding_model: 'stella-en-1.5B-v5',
          embedding_dimensions: 1024,
          mteb_score: 71.54,
          mteb_rank: 3,
          improvement_vs_old: 0.818,
          skills: {
            pandas: 668,
            vector_databases: 263,
            langchain: 284,
            embeddings: 581,
            supabase: 907,
            openai: 324,
            anthropic: 175
          },
          fallback: true,
          message: 'Using cached stats (Railway backend offline)'
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'X-Cache': 'FALLBACK'
          }
        }
      );
    }

    const stats = await response.json();

    // Cache the results
    cachedStats = stats;
    cacheTimestamp = Date.now();

    return new Response(
      JSON.stringify({
        ...stats,
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
    console.error('Stats API error:', error);

    // Return hardcoded stats as fallback
    return new Response(
      JSON.stringify({
        total_messages: 253432,
        stella_embeddings: 250872,
        stella_coverage: 0.9899,
        avg_similarity: 0.948,
        conversations: 11438,
        embedding_model: 'stella-en-1.5B-v5',
        embedding_dimensions: 1024,
        mteb_score: 71.54,
        mteb_rank: 3,
        improvement_vs_old: 0.818,
        skills: {
          pandas: 668,
          vector_databases: 263,
          langchain: 284,
          embeddings: 581,
          supabase: 907,
          openai: 324,
          anthropic: 175
        },
        fallback: true,
        error: error.message
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-Cache': 'ERROR-FALLBACK'
        }
      }
    );
  }
}
