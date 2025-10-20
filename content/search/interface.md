---
title: Search AI Knowledge
description: Search 253,432 AI conversations with 94.8% average similarity using stella embeddings
---

<div class="search-hero">
  <h1>Search 253,432 AI Conversations</h1>
  <p class="search-subtitle">2.5 years of learning • stella-en-1.5B-v5 embeddings • 94.8% avg similarity</p>
</div>

<div class="search-container">
  <!-- Search Input -->
  <div class="search-input-wrapper">
    <input
      type="text"
      id="search-query"
      class="search-input"
      placeholder="Ask anything: pandas dataframes, postgres pooling, RAG systems, FastAPI async..."
      autocomplete="off"
    />
    <button id="search-btn" class="search-button">Search</button>
  </div>

  <!-- Search Filters -->
  <div class="search-filters">
    <select id="filter-language" class="filter-select">
      <option value="">All Languages</option>
      <option value="python">Python</option>
      <option value="typescript">TypeScript</option>
      <option value="sql">SQL</option>
      <option value="javascript">JavaScript</option>
      <option value="bash">Bash</option>
    </select>

    <select id="filter-depth" class="filter-select">
      <option value="">All Levels</option>
      <option value="BASIC">BASIC</option>
      <option value="INTERMEDIATE">INTERMEDIATE</option>
      <option value="ADVANCED">ADVANCED</option>
    </select>

    <label class="filter-checkbox">
      <input type="checkbox" id="filter-code-only">
      <span>Code examples only</span>
    </label>

    <label class="filter-checkbox">
      <input type="checkbox" id="filter-solutions">
      <span>Solutions only</span>
    </label>
  </div>

  <!-- Quick Example Queries -->
  <div class="example-queries">
    <p>Try:</p>
    <button class="example-query" data-query="pandas groupby performance">pandas groupby</button>
    <button class="example-query" data-query="postgres connection pooling async">postgres pooling</button>
    <button class="example-query" data-query="RAG vector search optimization">RAG systems</button>
    <button class="example-query" data-query="FastAPI authentication patterns">FastAPI auth</button>
  </div>

  <!-- Loading State -->
  <div id="search-loading" class="search-loading hidden">
    <div class="spinner"></div>
    <p>Searching 253K messages with stella embeddings...</p>
  </div>

  <!-- Search Results -->
  <div id="search-results" class="search-results"></div>

  <!-- Search Stats -->
  <div id="search-stats" class="search-stats hidden"></div>
</div>

<style>
.search-hero {
  text-align: center;
  margin: 2rem 0 3rem;
}

.search-subtitle {
  color: #666;
  font-size: 1.1rem;
  margin-top: 0.5rem;
}

.search-container {
  max-width: 900px;
  margin: 0 auto;
}

.search-input-wrapper {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.search-input {
  flex: 1;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
}

.search-button {
  padding: 1rem 2rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.search-button:hover {
  background: #0056b3;
}

.search-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.filter-select {
  padding: 0.5rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: white;
  cursor: pointer;
}

.filter-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.example-queries {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  align-items: center;
}

.example-queries p {
  margin: 0;
  color: #666;
  font-weight: 500;
}

.example-query {
  padding: 0.5rem 1rem;
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.example-query:hover {
  background: #e0e0e0;
}

.search-loading {
  text-align: center;
  padding: 3rem;
}

.search-loading.hidden {
  display: none;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.search-results {
  margin-top: 2rem;
}

.result-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: box-shadow 0.2s;
}

.result-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.similarity-score {
  padding: 0.25rem 0.75rem;
  background: #e8f5e9;
  color: #2e7d32;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
}

.similarity-score.excellent {
  background: #e8f5e9;
  color: #2e7d32;
}

.similarity-score.good {
  background: #fff3e0;
  color: #e65100;
}

.result-content {
  margin-bottom: 1rem;
  line-height: 1.6;
  white-space: pre-wrap;
  max-height: 300px;
  overflow: hidden;
  position: relative;
}

.result-content.expanded {
  max-height: none;
}

.result-metadata {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 0.9rem;
  color: #666;
}

.metadata-tag {
  padding: 0.25rem 0.75rem;
  background: #f5f5f5;
  border-radius: 4px;
}

.search-stats {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: center;
}

.search-stats.hidden {
  display: none;
}

.expand-btn {
  color: #007bff;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 0.5rem;
}
</style>

<script>
(function() {
  const searchInput = document.getElementById('search-query');
  const searchButton = document.getElementById('search-btn');
  const resultsContainer = document.getElementById('search-results');
  const loadingEl = document.getElementById('search-loading');
  const statsEl = document.getElementById('search-stats');

  // Example queries
  document.querySelectorAll('.example-query').forEach(btn => {
    btn.addEventListener('click', () => {
      searchInput.value = btn.dataset.query;
      performSearch();
    });
  });

  // Search on button click
  searchButton.addEventListener('click', performSearch);

  // Search on Enter key
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  async function performSearch() {
    const query = searchInput.value.trim();
    if (!query) return;

    // Get filters
    const filters = {};
    const language = document.getElementById('filter-language').value;
    const depth = document.getElementById('filter-depth').value;
    const codeOnly = document.getElementById('filter-code-only').checked;
    const solutionsOnly = document.getElementById('filter-solutions').checked;

    if (language) filters.code_language = language;
    if (depth) filters.technical_depth = depth;
    if (codeOnly) filters.contains_code = true;
    if (solutionsOnly) filters.has_solution = true;

    // Show loading
    loadingEl.classList.remove('hidden');
    resultsContainer.innerHTML = '';
    statsEl.classList.add('hidden');

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          top_k: 10,
          filters: Object.keys(filters).length > 0 ? filters : null
        })
      });

      const data = await response.json();

      // Hide loading
      loadingEl.classList.add('hidden');

      if (data.error) {
        resultsContainer.innerHTML = `
          <div class="result-card">
            <p><strong>Error:</strong> ${data.error}</p>
            <p>${data.hint || data.details || ''}</p>
          </div>
        `;
        return;
      }

      // Display results
      if (data.results && data.results.length > 0) {
        resultsContainer.innerHTML = data.results.map((result, idx) => {
          const similarity = (result.similarity * 100).toFixed(1);
          const scoreClass = similarity >= 90 ? 'excellent' : 'good';

          return `
            <div class="result-card">
              <div class="result-header">
                <span><strong>Result ${idx + 1}</strong></span>
                <span class="similarity-score ${scoreClass}">${similarity}% match</span>
              </div>
              <div class="result-content" id="content-${idx}">
                ${escapeHtml(result.content.substring(0, 500))}${result.content.length > 500 ? '...' : ''}
              </div>
              ${result.content.length > 500 ? `<button class="expand-btn" onclick="toggleExpand(${idx})">Show full content</button>` : ''}
              <div class="result-metadata">
                ${result.metadata.code_language ? `<span class="metadata-tag">📝 ${result.metadata.code_language}</span>` : ''}
                ${result.metadata.technical_depth ? `<span class="metadata-tag">🎯 ${result.metadata.technical_depth}</span>` : ''}
                ${result.metadata.has_solution ? '<span class="metadata-tag">✅ Solution</span>' : ''}
              </div>
            </div>
          `;
        }).join('');

        // Show stats
        const avgSimilarity = (data.results.reduce((sum, r) => sum + r.similarity, 0) / data.results.length * 100).toFixed(1);
        statsEl.innerHTML = `
          <p><strong>${data.results.length} results</strong> • Avg similarity: ${avgSimilarity}% • Search time: ${data.search_time_ms}ms ${data.cached ? '(cached)' : ''}</p>
        `;
        statsEl.classList.remove('hidden');
      } else {
        resultsContainer.innerHTML = '<div class="result-card"><p>No results found. Try a different query or remove filters.</p></div>';
      }

    } catch (error) {
      loadingEl.classList.add('hidden');
      resultsContainer.innerHTML = `
        <div class="result-card">
          <p><strong>Search failed:</strong> ${error.message}</p>
          <p>The search backend may be starting up. Try again in a moment.</p>
        </div>
      `;
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Make toggleExpand global
  window.toggleExpand = function(idx) {
    const content = document.getElementById(`content-${idx}`);
    content.classList.toggle('expanded');
  };
})();
</script>
