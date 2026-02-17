# Phase 5: Email Results — Research Report

**Research Date:** 2026-02-17
**Researcher:** Claude (Sonnet)

## Objective

Research implementation approach for Phase 5: Email Results — Users receive test results via email after completing the vocational test.

## Project Context

**Tech Stack:**

- Backend: Fastify 5.3, TypeBox 0.34, Prisma 6.9, JWT, PostgreSQL
- Frontend: React 19, TypeScript 5.8, Vite 6, Tailwind CSS v4
- PDF Client-Side: jsPDF
- Existing Email Flow: None currently exists

**Current Data Flow:**

1. Email validation → JWT auth
2. Test session creation/resume
3. Progress saving during test
4. Test completion
5. Results saved to database
6. PDF generation (client-side) + JSON download
7. Results displayed in ResultsScreen

**Key Files Identified:**

- Backend routes: `api/src/routes/sessions.ts`, `api/src/routes/results.ts`
- Backend schema: `api/src/schemas/results.ts`
- Backend server: `api/src/server.ts`
- Frontend results: `components/test/ResultsScreen.tsx`
- PDF generator: `test/pdfGenerator.ts`
- Test service: `services/testService.ts`

## Email Service Options

### Recommended: Nodemailer (Industry Standard for Node.js)

**Why Nodemailer:**

- **Official:** nodemailer.com
- **GitHub:** nodemailer/nodemailer: **17.5K stars, maintained since 2010**
- **Pros:**
  - Mature, battle-tested solution
  - Extensive transport options (SMTP, SendGrid, Mailgun, etc.)
  - Full TypeScript type definitions
  - Async/await support out of the box
  - Active community and support
- **Cons:**
  - No built-in queue management (will implement custom queue in production)

### Alternatives Considered:

- `resend`: Modern alternative, excellent DX, but shorter track record
- `nodemailer-sendgrid-transport`: Good for SendGrid-only, but less flexible
- Native `fetch + SMTP`: Not recommended (no battle-tested retry logic)

**Chosen:** Nodemailer for reliability and ecosystem maturity.

## Technical Architecture

### Proposed Flow:

```
Test Completed → API Route Trigger → Email Service Module → Nodemailer → SMTP Server
```

### Key Components:

#### 1. Email Service Module (`api/src/services/email.ts`)

**Responsibilities:**

- PDF generation and attachment
- HTML template rendering
- Nodemailer instance creation (reusable transporter)
- Queue management (basic batching, optional enhancement)

**Structure:**

```typescript
class EmailService {
  private transporter: nodemailer.Transporter;
  constructor(config: SMTPConfig) {
    /* nodemailer setup */
  }

  async sendEmail(data: EmailData) {
    /* actual send */
  }
  sendResults(sessionId, profile, scores) {
    /* specialized method */
  }
}
```

#### 2. Email Route (`api/src/routes/email.ts`)

**Endpoint:**

- `POST /api/send-results/:sessionId`

**Trigger Decision:**

- Option A: **Automatic upon test completion** (recommended for simplicity)
  - Pros: Seamless user experience
  - Cons: Must handle async errors gracefully
- Option B: **Explicit user action via ResultsScreen button**
  - Pros: User consent, error visibility
  - Cons: Extra interaction step
- **Decision:** Start with Option A (on completion), add Option B later if needed

#### 3. Email Schema (`api/src/schemas/email.ts`)

**TypeBox Model:**

```typescript
export const SendResultsBody = Type.Object({
  sessionId: Type.String(),
  email: Type.Optional(Type.String()),
});
export type SendResultsBodyType = Static<typeof SendResultsBody>;
```

#### 4. Backend Route Integration Point

**Where to trigger?:**

- After `POST /api/sessions/:sessionId/results` success in backend
- Asynchronous sending (fire-and-forget pattern)
- Cache results data for optional notification

## PDF vs HTML vs Mixed Delivery

### Option A: Client-Side PDF → Send via Email ❌

**Pros:**

- Simpler setup (PDF already exists)
- No backend PDF generation logic needed

**Cons:**

- Large attachments → slow delivery, spam filters
- Privacy concern: PDF contains sensitive test data
- CORS issues (unlikely, but possible)
- No inline analytics (can't track if PDF opened)

**Verdict:** ❌ Not recommended

### Option B: Backend PDF Generation (Recommended) ⚠️

**Pros:**

- Privacy control (backend sends, client doesn't download raw PDF)
- Smaller attachments
- Reliability (sends from stable backend, not user browser)
- Consistent formatting across email clients

**Cons:**

- Requires jsPDF in backend (already available)
- More disk I/O operations
- Larger codebase (duplicate PDF logic needed)

**Verdict:** ⚠️ Valid, but adds complexity

### Option C: HTML Report Email (Best for UX) ✅

**Pros:**

- No file transfer (no attachment size concerns)
- Inline images, responsive design
- Easier analytics (can track if email opened/clicked)
- Quicker delivery (no attachment processing)

**Cons:**

- Different visual quality vs PDF
- More complex template system
- No offline viewing

**Verdict:** ✅ **Recommended** for Phase 5

**Rationale:**

- Better user experience (instant delivery)
- Privacy: link to secure PDF, not raw PDF in email
- Analytics capabilities (optional enhancement)
- Immediate visibility of results
- Mobile-friendly email rendering

## Production Considerations

### Email Queue System

**If scaling needed:**

- **Bull/BullMQ**: Redis-backed message queue for email sending
- Use when email volumes increase significantly (>100/day)
- Current GSD phase: Basic implementation (sync send), queue enhancement for Phase X

### Rate Limiting

**Required for:**

- Prevent email spam
- Protect SMTP provider quotas
- Avoid rate-limited IP bans

**Implementation:**

- Redis-based rate limiter (e.g., `rate-limiter-flexible`)
- Configurable limits per IP/user
- Optional for Phase 5 MVP

### Template Management

**Approach:**

- Store templates as `ejs/pug` templates in `api/src/templates/`
- Simple interpolation for MVP (template string constants in `email.ts`)
- Migration path: templates → compiled templates if needed

### Analytics (Optional)

**Possible integrations:**

- Track if email opened → open tracking
- Track if link clicked → click tracking
- Email performance metrics in DB (optional dashboard)

## Implementation Phases

### Phase 5.1: Infrastructure Setup ✅ (To Plan)

- Install Nodemailer: `npm install nodemailer`
- Create email service module structure
- Add email configuration to `.env.docker`
- Set up SMTP credential environment variables
- Register email route in Fastify server

### Phase 5.2: Email Service Core 🔄 (To Plan)

- Nodemailer transporter configuration
- Email template system (Pug/jHTML)
- PDF generation function (backend-compatible)
- Email sending logic (sendResults function)

### Phase 5.3: Route & Integration 🔄 (To Plan)

- Add `POST /api/results` → trigger email dispatch
- Create `POST /api/send-results/:sessionId` route
- Implement email template rendering
- Add delivery status tracking (TestResult model)

### Phase 5.4: UI Updates 🔄 (To Plan)

- Add "Send results by email" button/checkbox in ResultsScreen
- Add loading state during email sending
- Display success/error notification
- Link to view results in dashboard (if implemented)

### Phase 5.5: Production Considerations 📋 (Out of Scope for Phase 5)

- Email queue system (Bull/BullMQ) for reliability
- Rate limiting (prevent email spam)
- Template management
- Analytics/logging

## Critical Design Decisions

### Decision 1: Email Trigger Method

- **Current decision:** Automatic trigger on test completion (async fire-and-forget)
- **Why:** Seamless user experience, simplest MVP
- **Alternative:** Explicit user action in ResultsScreen (deferred)

### Decision 2: PDF vs HTML Report

- **Current decision:** HTML email with link to PDF (privacy + UX balance)
- **Why:** No attachment size limit, analytics trackable, immediate visibility
- **Alternative:** PDF attachment (privacy risk, slower delivery)

### Decision 3: Template System

- **Current decision:** Raw HTML strings in service module (simplest MVP)
- **Why:** No external dependency overhead, easy iteration
- **Alternative:** Pug/jHTML templates (better organization, reusable)

### Decision 4: Delivery Time

- **Current decision:** Immediate (sync), fire-and-forget pattern
- **Why:** Predictable user experience, no queuing overhead
- **Alternative:** Queued (Bull/BullMQ) for reliability (scales later)

### Decision 5: Privacy Approach

- **Current decision:** HTML summary email + link to PDF (secure delivery)
- **Why:** Don't send raw PDF in email (privacy risk)
- **Alternative:** Send encrypted PDF in email

### Decision 6: Retry Strategy

- **Current decision:** Only retry failed sends once (synchronous send)
- **Why:** Simplicity for MVP, avoid email duplicate confusion
- **Alternative:** Exponential backoff retries for bulk sends

## Environment Variables Required

```bash
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=mvp@techcareer.com
SMTP_PASS=your-app-specific-password
SMTP_FROM="TechCareer Test Drive <mvp@techcareer.com>"

# Optional: Email throttling/queue
SMTP_QUEUE_SIZE=10
SMTP_MAX_RETRIES=3
```

### SMTP Provider Options:

- **Gmail:** Free, requires "App Password" (not regular password)
- **Mailgun:** Free tier (1000 emails/month), requires API key
- **SendGrid:** Free tier (100 emails/day), requires API key
- **Mailtrap:** For sandbox/testing (no real emails sent)
- **Netlify:** If using Netlify functions
- **AWS SES:** Cheap, but requires proper setup

## Testing Strategy

### Unit Tests:

- Send email with mocked transporter
- Template rendering with different profiles/scores
- Error handling (missing env vars, SMTP failure)

### Integration Tests:

- Full flow: Submit test → Trigger email → Verify email delivered
- Database-driven email data fetching
- Edge cases: Invalid sessionId, missing result data

### Manual Testing:

- Send SMTP config (Mailtrap for sandbox testing)
- Test with valid credentials
- Verify email content and template rendering
- Test mobile email client compatibility

## Next Steps

1. **Implement backend PDF generator** (backend-compatible version if still chosen)
2. **Create email service module** with Nodemailer and template system
3. **Generate HTML email template** with test results summary and link
4. **Add email route** and integrate with results flow
5. **Update frontend ResultsScreen** with email option (if using explicit trigger)
6. **Add delivery status tracking** to database (optional enhancement)

## Conclusion

**Email Infrastructure:** Nodemailer + HTML template approach chosen for MVP
**Reasoning:** Reliability, simplicity, better UX, privacy-friendly approach

**Phase 5 Strategy:**

1. Backend email service (module + route)
2. Email template with Portuguese content
3. Immediate send on test completion
4. Frontend integration for trigger option

**Time Estimate:** 2-3 hours (installation, implementation, testing)

**Dependencies:**

- None (email is independent of DX phases)
- Requires only working codebase
- SMTP credentials and .env configuration needed
