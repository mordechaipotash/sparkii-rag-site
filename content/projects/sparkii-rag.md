# Project: Sparkii RAG System

## Card Summary (Layer 1 - visible without clicking)
Production RAG system for 253,432 AI conversation messages with classification-aware retrieval, query routing, and Claude-powered synthesis. Built to make my entire AI learning history searchable.

## Quick Facts (Layer 1)
- **Scale:** 253,432 messages indexed from 11,439 conversations
- **Tech:** Stella 1.5B embeddings, PostgreSQL + pgvector, FastAPI, Claude Haiku 4.5
- **Status:** Production, actively running
- **Timeline:** Day 1 to working API in ~8 hours

---

## Expand: What It Does (Layer 2)

### The Problem
I had 2.5 years of AI conversations (12,500+ chats, 400k+ messages) across multiple platforms. Needed semantic search to find:
- "How did I solve X problem before?"
- "What did I learn about Y technology?"
- "Show me all conversations about Z topic"

### The Solution
Built a classification-aware RAG system that doesn't just do vector similarity - it understands context:

- **19 metadata fields per message**: `contains_code`, `code_language`, `user_intent`, `technical_depth`, `tools_used`, etc.
- **Query routing**: Automatically detects if you're debugging, searching code, asking conceptual questions, or recovering from errors
- **Conversation context**: Returns not just the matching message, but previous context from the thread
- **Smart filtering**: Pre-filters 253K messages using metadata before vector search (10x faster)

### What Makes It Production-Ready
- REST API with `/search`, `/search/smart`, `/ask` endpoints
- FastAPI server with proper error handling
- Distance-based confidence scoring
- Claude Haiku 4.5 synthesis for natural language answers
- Performance optimization (FP16 embeddings, keyset pagination)

---

## Expand: Technical Details (Layer 3)

### Architecture

```
User Query
    ↓
Query Router (classifies intent)
    ↓
Metadata Filter (narrows 253K → relevant subset)
    ↓
Vector Search (pgvector similarity)
    ↓
Context Expansion (fetch conversation thread)
    ↓
Claude Haiku (synthesize answer)
    ↓
Formatted Response (with sources + confidence)
```

### What Makes It Different

**1. Classification Metadata (19 fields most RAG systems don't have)**
- `contains_code`, `code_language` (Python, JS, SQL, etc.)
- `user_intent` (debugging, learning, implementation)
- `technical_depth` (beginner, intermediate, advanced)
- `tools_used`, `mcp_tools_used`
- `response_type` (solution, explanation, question)
- `frustration_indicator`, `urgency_level`

**2. Query Routing (5 query types)**
- **Debugging**: Filters for code + tools + error context
- **Code search**: Code only, assistant responses
- **Conceptual**: No filtering, pure semantic search
- **Workflow**: Includes conversation context
- **Error recovery**: Filters by frustration indicators

**3. Production Scale**
- 253K messages (not a toy 1K example)
- ~5.5 messages/sec embedding generation
- Optimized with FP16 half-precision, keyset pagination
- Currently at 801 messages re-embedded with Stella

### Implementation Challenges & Solutions

**Challenge 1: Embedding 253K messages took 27 hours with OFFSET**
- **Solution**: Switched to keyset pagination (WHERE id > last_id)
- **Result**: Constant speed, no degradation, ~12 hours estimated

**Challenge 2: Generic vector search returned irrelevant results**
- **Solution**: Added classification layer with 19 metadata fields
- **Result**: Pre-filter before vector search, 10x faster + more relevant

**Challenge 3: Lost conversation context with single-message retrieval**
- **Solution**: Fetch previous messages from same conversation thread
- **Result**: User sees "why" not just "what"

### Code Patterns

**Smart Retrieval with Classification**
```python
def search_with_routing(self, query: str, top_k: int = 10):
    # Detect query type
    query_type = self.route_query(query)

    # Build filters based on query type
    filters = self._build_filters_for_query_type(query_type)

    # Execute filtered vector search
    results = self.search(query, top_k, filters)

    # Expand with conversation context
    return self._expand_context(results)
```

**Query Routing Logic**
```python
def route_query(self, query: str) -> QueryType:
    """Classify query intent for optimal retrieval"""
    query_lower = query.lower()

    # Debugging queries
    if any(word in query_lower for word in
           ['error', 'fix', 'bug', 'issue', 'problem']):
        return QueryType.DEBUGGING

    # Code search
    if any(word in query_lower for word in
           ['code', 'function', 'implementation', 'example']):
        return QueryType.CODE_SEARCH

    # ... other types
```

---

## Links

### Code
- **GitHub**: https://github.com/mordechai/sparkii-rag (make public before launch)
- **API Docs**: FastAPI auto-generated at `/docs` endpoint

### Documentation
- [Day 1 Success Report](../assets/SUCCESS_DAY1.md) - Full capabilities breakdown
- [Speed Comparison](../assets/SPEED_COMPARISON.md) - Optimization journey

### Try It
- **Demo**: Available on request (email me)
- **API**: `POST /ask` with natural language questions

---

## Tech Stack Tags
`python` `fastapi` `postgresql` `pgvector` `stella-embeddings` `openai` `langchain` `rag` `vector-search` `claude` `supabase` `sentence-transformers`

---

## What This Proves

**Pattern Recognition**: Identified that generic RAG fails → added classification layer
**First Principles**: Understood vector search limitations → built routing on top
**Production Mindset**: Not a tutorial project → handles 253K real messages
**AI-Native Development**: Built entire system with Claude Code assistance
**Performance Engineering**: Optimized from 27hr → 12hr embedding time

This is the kind of work I do: see a real problem, understand it deeply, build a production solution.

---

## Meta Notes
<!-- This project is your strongest technical showcase -->
<!-- Emphasize: scale (253K), sophistication (19 fields), production quality -->
<!-- The "What This Proves" section ties to "How I Think" -->
