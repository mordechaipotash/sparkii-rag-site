# Tech Stack

## How I Work

I'm **platform-agnostic** and **tool-agnostic**. The right tool depends on the problem.

This isn't my "preferred stack" - these are tools I've used in production to solve real problems.

---

## Daily Development Tools

### AI-Assisted Development
- **Claude Code** - Primary development environment
- **Cursor** - AI-first code editor
- **Windsurf** - Alternative AI coding assistant
- **OpenRouter** - API orchestration for multiple LLMs

### Why These Matter
Traditional developers write code from scratch. I orchestrate AI to:
- Generate boilerplate 10x faster
- Suggest patterns I haven't seen
- Catch errors before runtime
- Refactor at scale instantly

**Result**: What takes a team weeks, I ship in days.

---

## Backend & Infrastructure

### Languages
- **Python** - Data processing, AI pipelines, backend services
- **TypeScript** - Type-safe complex logic (1,220-line mapping service)
- **SQL** - PostgreSQL queries, optimization

### Frameworks
- **FastAPI** - REST APIs (Sparkii RAG endpoints)
- **Next.js** - Full-stack React applications
- **LangChain** - RAG orchestration

### Databases
- **PostgreSQL** - Primary database
- **pgvector** - Vector similarity search
- **PostGIS** - Geospatial queries
- **Supabase** - Managed Postgres with auth/realtime

### Deployment
- **Vercel** - Frontend hosting
- **Railway** - Backend microservices
- **GitHub Actions** - CI/CD when needed

---

## AI & Machine Learning

### Models & APIs
- **OpenAI API** - GPT-4, GPT-3.5 for generation
- **OpenRouter** - Multi-provider LLM routing
- **Anthropic Claude** - Claude Haiku 4.5 for RAG synthesis
- **Google Gemini** - Translation, PDF extraction

### Embedding Models
- **Stella en 1.5B v5** - State-of-the-art sentence embeddings
- **sentence-transformers** - Python library for embeddings
- **OpenAI embeddings** - When needed

### RAG Stack
- **LangChain** - RAG chains and retrieval
- **pgvector** - Vector storage in PostgreSQL
- **FAISS** - Fast similarity search (prototyping)

---

## MCP Servers (Claude Code)

I run 9 MCP servers for enhanced capabilities:

1. **Supabase MCP** - Direct database queries
2. **GitHub MCP** - Repository operations
3. **Notion MCP** - Documentation/knowledge base
4. **Sequential Thinking MCP** - Multi-step reasoning
5. **Context7 MCP** - Documentation lookup
6. **Magic MCP** - UI component generation
7. **Morphllm MCP** - Code transformations
8. **Serena MCP** - Project memory
9. **Playwright MCP** - Browser automation/testing

**Why MCP Servers Matter**: Extend Claude Code's capabilities beyond code editing - database queries, API calls, browser automation, all in one environment.

---

## Data Processing

### Text & NLP
- **Whisper** - Audio transcription (Hebrew podcasts)
- **feedparser** - RSS feed parsing
- **BeautifulSoup** - Web scraping when needed

### Translation
- **Google Gemini 2.5 Flash Lite** - Batch Hebrew→English translation
- **OpenRouter** - Multi-model translation fallback

---

## Platform Services

### Google Cloud
- **Gmail API** - Email processing (WOTC app)
- **Service Account** - Domain-wide delegation
- **OAuth2** - Authentication flows

### APIs
- **OpenRouter** - LLM orchestration
- **Supabase** - Database, auth, storage, realtime
- **Vercel** - Serverless functions

---

## Development Patterns

### Architecture Preferences
- **Microservices** when needed (WOTC: 3-tier)
- **Monolith** when simpler (Sparkii RAG)
- **Serverless** for scale (Vercel functions)
- **Static** when possible (this site)

### Database Design
- **Normalization** for transactional data
- **Denormalization** for read-heavy (RAG metadata)
- **JSONB** for flexible schemas
- **PostGIS** for spatial queries

### AI Integration Patterns
- **Confidence scoring** - Never trust AI 100%
- **Batch processing** - Optimize API costs
- **Fallback strategies** - Multiple model providers
- **Human-in-loop** - Review low-confidence outputs

---

## What I Don't Use (And Why)

**✗ React frameworks other than Next.js**
- Next.js covers 95% of use cases, learning others is diminishing returns

**✗ ORMs (usually)**
- Raw SQL is more flexible for complex queries (109-column tables, spatial queries)
- Use when simple CRUD, skip for complex joins

**✗ Kubernetes**
- Railway/Vercel handle scaling without K8s complexity
- Maybe at huge scale, not there yet

**✗ NoSQL databases**
- PostgreSQL with JSONB gives flexibility + SQL power
- Haven't hit a use case where MongoDB/Mongo would be better

---

## Projects Using This Stack

### Sparkii RAG System
`python` `fastapi` `postgresql` `pgvector` `stella` `claude` `langchain`

### WOTC Tax Processing
`typescript` `nextjs` `postgresql` `postgis` `supabase` `railway` `vercel` `openrouter` `gemini`

### Israeli Tech Corpus
`python` `whisper` `gemini` `feedparser` `hebrew-translation`

[See all projects →](../projects/)

---

## Learning New Tools

I don't "master" tools upfront. I:
1. Identify problem
2. Research best tool for problem
3. Learn *just enough* to solve problem
4. Iterate to production

**Example**: Didn't "learn PostGIS" - needed spatial queries, learned `ST_Contains`, added indexes, shipped.

This is why my stack is diverse - I choose best tool for the job, not "tools I already know."

---

## Meta Notes
<!-- Shows breadth without claiming to be expert in everything -->
<!-- The MCP servers section shows advanced Claude Code usage -->
<!-- "What I Don't Use" shows thoughtfulness about tool selection -->
