# Project: WOTC Tax Credit Processing

## Card Summary (Layer 1)
AI-powered tax credit processing application: 3-tier microservices architecture handling PDF extraction, nested JSON→flat table mapping, and PostGIS spatial queries for Work Opportunity Tax Credit (WOTC) eligibility.

## Quick Facts (Layer 1)
- **Architecture:** 3-tier microservices (Vercel frontend + 2 Railway services)
- **Database:** PostgreSQL with 109-column applicants table + PostGIS
- **AI Pipeline:** PDF extraction via OpenRouter/Gemini with confidence scoring
- **Scale:** 1,220-line field mapping service, 81-column email metadata
- **Status:** Production for tax consulting business

---

## Expand: What It Does (Layer 2)

### The Problem
Tax credit consultants receive PDFs from clients with WOTC forms (8850, questionnaires, etc.). Manual data entry is:
- Time-consuming (20+ minutes per applicant)
- Error-prone (missing fields, wrong eligibility)
- Difficult to verify (Empowerment Zone eligibility requires GIS)

### The Solution
Built end-to-end automation:

1. **Gmail Integration**: Service Account with domain-wide delegation fetches PDFs from client emails
2. **AI Extraction**: OpenRouter/Gemini extracts 60+ nested fields from PDFs with confidence scores
3. **Field Mapping**: 1,220-line service maps nested AI output → flat 109-column database structure
4. **Spatial Verification**: PostGIS queries verify address eligibility for Empowerment Zones (#4, #6)
5. **Web Interface**: Milestone-based UI for reviewing/correcting extracted data

### Impact
- **20 minutes → 2 minutes** per applicant
- **Higher accuracy** with AI extraction + confidence scores
- **Automatic GIS verification** (was manual lookup)
- **Scalable** to hundreds of applicants per batch

---

## Expand: Technical Details (Layer 3)

### Architecture

```
Gmail API (Service Account)
    ↓
Email Processing Service (Railway)
    ↓
PDF → AI Extraction (OpenRouter/Gemini)
    ↓
Nested JSON Output (60+ fields)
    ↓
Field Mapping Service (1,220 lines)
    ↓
PostgreSQL Database (Supabase)
    - 81-column emails table
    - 109-column applicants table
    - PostGIS for spatial queries
    ↓
Frontend (Vercel + Next.js)
    - Milestone-based review UI
    - Confidence highlighting
    - Spatial map display
```

### Database Complexity

**emails table (81 columns)**
- Gmail metadata (ID, subject, sender, date)
- Attachment tracking (count, PDF status)
- Processing stages (queued → processing → completed)
- AI extraction status + confidence scores

**applicants table (109 columns)**
- Personal info (14 fields)
- Address (5 fields)
- Form 8850 (9 fields)
- WOTC Questionnaire (28 fields)
- NYS Youth form (12 fields)
- EZ eligibility (PostGIS spatial results)
- Processing metadata (20+ fields)

### The Crown Jewel: Field Mapping Service

**Challenge**: AI returns deeply nested JSON (60+ fields), database needs flat structure (109 columns)

**Solution**: 1,220-line TypeScript service that:

```typescript
// AI returns this:
{
  analysis_summary: { total_pages: 5, confidence: 0.87 },
  applicants: [{
    basic_info: { first_name: "John", ssn: "123-45-6789" },
    form_8850: { "8850_1": true, "8850_2": false },
    form_8qf_questions: { q_1: "yes", q_2a: "2024-01-15" }
  }]
}

// Maps to this:
{
  "First Name": "John",
  "SSN#": "123-45-6789",
  "8850 #1": "checked",
  "8850 #2": "unchecked",
  "Q - 1": "yes",
  "Q - 2a": "01/15/2024"
}
```

**Handles**:
- Date format conversions
- Boolean → checkbox values
- Null/undefined → empty strings
- Nested paths → flat column names
- Type coercion + validation

### PostGIS Spatial Queries

**Empowerment Zone Eligibility**:
```sql
SELECT
  CASE
    WHEN EXISTS (
      SELECT 1 FROM empowerment_zones
      WHERE zone_type = 'type_4'
      AND ST_Contains(geometry, ST_Point(lng, lat))
    ) THEN '#4'
    WHEN EXISTS (
      SELECT 1 FROM empowerment_zones
      WHERE zone_type = 'type_6'
      AND ST_Contains(geometry, ST_Point(lng, lat))
    ) THEN '#6'
    ELSE NULL
  END as ez_type
```

Verifies addresses against GIS boundaries for tax credit eligibility.

### Implementation Challenges & Solutions

**Challenge 1: Service Account authentication across Google Workspace**
- **Solution**: Domain-wide delegation with proper OAuth2 scopes
- **Result**: Automated email access without manual auth

**Challenge 2: AI extraction inconsistency (forms vary widely)**
- **Solution**: Confidence scoring + manual review for low-confidence fields
- **Result**: 87% average confidence, fast correction for rest

**Challenge 3: Nested JSON → Flat DB without losing data**
- **Solution**: Comprehensive mapping with bidirectional transforms
- **Result**: No data loss, full round-trip support

**Challenge 4: Spatial queries were slow**
- **Solution**: PostGIS spatial indexes on zone geometries
- **Result**: <50ms lookup time per address

---

## Links

### Code
- **GitHub**: Private - available on request
- **Tech Docs**: Comprehensive database schema + API documentation

### Stack Details
- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Python (AI pipeline), TypeScript (mapping service)
- **Database**: Supabase (PostgreSQL + PostGIS)
- **Hosting**: Vercel (frontend), Railway (backend services)
- **AI**: OpenRouter with Gemini 2.5 Flash Lite

---

## Tech Stack Tags
`typescript` `nextjs` `postgresql` `postgis` `supabase` `railway` `vercel` `google-api` `openai` `openrouter` `gemini` `pdf-extraction` `spatial-queries` `microservices`

---

## What This Proves

**Platform-Agnostic Problem Solving**: Combined Vercel + Railway + Supabase + Google APIs seamlessly
**Complex Data Modeling**: 109-column table isn't simple CRUD
**AI Integration**: Production AI pipeline with confidence scoring and error handling
**Enterprise Architecture**: 3-tier microservices, proper separation of concerns
**Domain Adaptation**: Learned tax credit domain, built production solution

This was built for a real business with real money at stake. Not a side project.

---

## Meta Notes
<!-- This shows enterprise capability: microservices, complex DBs, production AI -->
<!-- Emphasize the 1,220-line mapping service - shows you handle complexity -->
<!-- The "real business" angle separates you from tutorial followers -->
