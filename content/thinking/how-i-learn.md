# How I Think: Learning

## Question
How do you learn new tech?

## Surface Answer (Layer 1)
I don't "learn" in the traditional sense - I build. 12,500 AI conversations over 2.5 years = systematic pattern recognition through solving real problems, not completing tutorials.

---

## Expand: The Full Answer (Layer 2)

### The Pattern

Most people approach learning like this:
1. Read documentation
2. Watch tutorials
3. Complete exercises
4. *Then* maybe build something

I do this:
1. Identify real problem I need to solve
2. Build minimum viable solution with AI assistance
3. Encounter gaps in understanding
4. Research *only what's needed* to solve those gaps
5. Iterate until production-ready

**Difference**: I learn *just enough, just in time* vs *everything upfront, maybe useful later*

### Why It Works

**Traditional learning**:
- Front-loads information you might not need
- Optimizes for breadth (know many things)
- Low retention (if you don't use it, you lose it)

**Building-first learning**:
- Loads information when you need it (high motivation)
- Optimizes for depth (understand what you actually use)
- High retention (learned through application, not memorization)

**Example**: I didn't "learn PostgreSQL" - I needed vector search for 253K messages, discovered pgvector, implemented it, encountered performance issues, learned keyset pagination, optimized. Now I *understand* pgvector at production level, not tutorial level.

### The AI Multiplier

12,500 conversations with AI tools taught me:
- How to ask questions that get useful answers
- How to recognize when AI is wrong (and why)
- How to translate vague requirements → specific prompts
- How to iterate from working → production-ready

**Key insight**: AI doesn't replace understanding. It accelerates the feedback loop.

Old: Read docs → write code → wait hours/days for results → debug → repeat
New: Ask AI → get code → test immediately → refine → repeat (minutes not days)

The skill isn't "knowing everything" - it's **efficient iteration toward understanding**.

---

## Expand: Concrete Examples (Layer 3)

### Example 1: Learning RAG

**Didn't do**: Complete "RAG from scratch" course

**Did do**:
1. Had problem: search 253K messages semantically
2. Built basic vector search (FAISS) - worked but slow
3. Discovered pgvector - migrated, faster
4. Noticed irrelevant results - added classification metadata
5. Still getting wrong results - built query routing
6. Users needed context - added conversation expansion
7. Now: production RAG system with 19 metadata fields

**Result**: I understand RAG at *implementation depth*, not *tutorial depth*

### Example 2: Learning PostGIS

**Didn't do**: PostGIS certification course

**Did do**:
1. Needed: verify if address is in Empowerment Zone
2. Found: PostGIS can do spatial queries
3. Implemented: `ST_Contains(geometry, ST_Point(lng, lat))`
4. Slow: added spatial indexes
5. Fast: <50ms per address lookup
6. Production: verifying hundreds of addresses

**Result**: I know *exactly what I need* for this use case, nothing more

### Example 3: Learning TypeScript

**Didn't do**: TypeScript handbook cover-to-cover

**Did do**:
1. Project needed: 1,220-line mapping service (nested → flat)
2. Started in Python - hit type safety issues
3. Migrated to TypeScript - caught errors at compile time
4. Learned generics *when needed* for type-safe mapping
5. Learned conditional types *when needed* for flexible interfaces
6. Now: comfortable with advanced TypeScript patterns

**Result**: Learned through 1,200 lines of real code, not toy examples

---

## Related Topics

- [The Disconnect](./the-disconnect.md) - Why companies don't operate this way
- [What I've Built](../projects/) - Evidence of this approach working
- [Tech I Use](../tech/) - Tools that enable this workflow

---

## Meta Notes
<!-- This explains your learning philosophy -->
<!-- Ties directly to your 12,500 AI conversations -->
<!-- Shows depth over breadth approach -->
