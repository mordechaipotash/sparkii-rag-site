# Project: Israeli Tech Content Corpus

## Card Summary (Layer 1)
Automated pipeline for collecting, transcribing, and translating Israeli tech podcasts and articles. Built to understand the Israeli ecosystem through primary sources - 31 podcast episodes + 75+ articles processed.

## Quick Facts (Layer 1)
- **Sources:** Reversim podcast, Geektime articles, NoCamels innovation coverage
- **Processing:** Hebrew→English translation, AI summarization, entity extraction
- **Volume:** 31 podcast episodes (full transcripts), 75+ articles
- **Tech:** Whisper transcription, Gemini translation, RSS parsing
- **Status:** Active data collection

---

## Expand: What It Does (Layer 2)

### The Problem
Understanding the Israeli tech ecosystem requires reading Hebrew content (podcasts, articles, industry reports). English sources are limited and often surface-level.

### The Solution
Built automated content collection and processing:

1. **Podcast Transcription**: Reversim episodes → Whisper → timestamped transcripts
2. **Translation Pipeline**: Batch Hebrew→English translation (Gemini 2.5 Flash Lite)
3. **Article Scraping**: RSS feeds from Geektime, NoCamels → structured data
4. **AI Analysis**: Extract companies mentioned, people, technologies, key topics
5. **Structured Storage**: JSON with metadata (topics, confidence, summaries)

### Why It Matters
- **Primary sources**: Not filtered through US tech press
- **Hebrew fluency**: Access to content unavailable in English
- **Pattern recognition**: Identify trends before they go global
- **Network mapping**: Track who's building what, where

---

## Expand: Technical Details (Layer 3)

### Architecture

```
RSS Feeds (Reversim, Geektime, NoCamels)
    ↓
Feed Parser (Python feedparser)
    ↓
Audio Transcription (Whisper for Hebrew)
    ↓
Batch Translation (Gemini 2.5 Flash Lite)
    - 20 segments per batch
    - ~5 sec per 512 segments
    ↓
AI Analysis (entity extraction, summarization)
    ↓
Structured JSON Storage
    - Hebrew + English text
    - Metadata (topics, companies, people)
    - Confidence scores
```

### Translation Optimization

**Batch Processing**:
```python
def translate_in_batches(segments, batch_size=20):
    """Combine 20 segments, send to Gemini, parse results"""
    for batch in chunks(segments, batch_size):
        # Format: [0] speaker: text\n[1] speaker: text...
        combined = "\n".join(
            f"[{i}] {seg['speaker']}: {seg['text']}"
            for i, seg in enumerate(batch)
        )

        # Single API call for 20 segments
        translation = gemini.translate(combined)

        # Parse numbered results back to individual segments
        return parse_translation_results(translation)
```

**Why Batch?**:
- Single API call vs 20 calls = 20x faster
- Lower cost (fewer API requests)
- Better context for translation (sees surrounding segments)

### Content Analysis

**Entity Extraction**:
```python
def analyze_article(content):
    """Extract structured metadata from Hebrew content"""
    return {
        "main_topic": "...",
        "key_points": [...],
        "companies_mentioned": [...],
        "people_mentioned": [...],
        "technologies": [...],
        "category": "...",  # funding, product launch, hiring, etc.
        "sentiment": "...",
        "importance_score": 0.85
    }
```

### Data Structure

**Podcast Episode JSON**:
```json
{
  "episode_number": 502,
  "title": "...",
  "date": "2024-10-15",
  "summary_hebrew": "...",
  "summary_english": "...",
  "transcript": [
    {
      "timestamp": "00:05:23",
      "speaker": "Ran Tavory",
      "text_hebrew": "...",
      "text_english": "..."
    }
  ],
  "topics": ["AI", "Startups", "Investment"],
  "companies_mentioned": ["Wiz", "monday.com"],
  "translation_confidence": 0.89
}
```

### Implementation Challenges

**Challenge 1: Hebrew transcription accuracy**
- **Solution**: Whisper model tuned for Hebrew, manual verification
- **Result**: ~85% accuracy, good enough for gist extraction

**Challenge 2: Translation preserving technical terms**
- **Solution**: Batch translation maintains context, technical terms preserved
- **Result**: "RAG" stays "RAG", not translated to Hebrew equivalent

**Challenge 3: RSS feed protection (Calcalist)**
- **Solution**: Pivoted to accessible feeds (Geektime, NoCamels)
- **Result**: 75+ articles from open sources

---

## Links

### Code
- **GitHub**: Part of larger content processing suite
- **Data**: JSON files with full transcripts + translations

### Outputs
- 31 Reversim episodes fully translated
- 75+ articles (30 Geektime Hebrew + 45 NoCamels English)
- Structured metadata for all content

---

## Tech Stack Tags
`python` `whisper` `openrouter` `gemini` `feedparser` `rss` `hebrew` `translation` `transcription` `nlp`

---

## What This Proves

**Language Flexibility**: Hebrew→English translation pipeline
**Data Processing**: Automated content collection at scale
**Systematic Approach**: Not one-off scraping - reusable pipeline
**Domain Knowledge**: Understanding Israeli tech ecosystem through primary sources
**Tool Selection**: Chose right tools (Whisper, Gemini, feedparser) for each step

Built to solve my own need: understand the ecosystem I'm operating in.

---

## Meta Notes
<!-- This shows breadth: not just backend/API, but data processing too -->
<!-- Hebrew fluency is differentiator - most developers can't access this content -->
<!-- The "systematic learning" angle ties back to "How I Think" -->
