# ClipForge Cloud

Multi-tenant SaaS control plane for the existing ClipForge captioned-Shorts engine. It monitors YouTube uploads and completed livestream replays plus Twitch VODs, then publishes captioned clips to a connected YouTube destination.

## Customer flow

1. Start the trial and connect a YouTube channel using server-side OAuth with offline access.
2. ClipForge provisions the customer workspace and verifies the owned channel automatically.
3. Subscribe through Whop Checkout before the trial ends (Stripe remains an optional fallback).
4. Save the connected channel as the monitored source (Studio can later support additional owned sources).
5. YouTube WebSub sends a near-real-time upload/replay notification.
6. An idempotent job receives a three-hour deadline.
7. A trusted worker leases the earliest deadline, runs the existing transcript -> selection -> evaluation -> render pipeline, then uploads approved Shorts.
8. The dashboard shows progress, published links, plan usage, and SLA performance.

## Local demo

```powershell
Copy-Item .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000/dashboard`. `DEMO_MODE=true` uses the in-memory demo repository. It never calls Google or Stripe unless credentials are configured.

## Production setup

1. Create PostgreSQL and apply `migrations/001_initial.sql`.
2. Set `DATABASE_URL`, a 32-byte `TOKEN_ENCRYPTION_KEY`, `SESSION_SECRET`, and `WORKER_SECRET`.
3. Configure a Google Web Application OAuth client. Add `https://YOUR_DOMAIN/api/auth/youtube/callback` as an authorized redirect URI and request YouTube upload/read/analytics verification.
4. Configure a Twitch Developer Console application with OAuth redirect URL `https://YOUR_DOMAIN/api/webhooks/twitch`, then set `TWITCH_CLIENT_ID`, `TWITCH_CLIENT_SECRET`, and a random `TWITCH_EVENTSUB_SECRET` (20-100 characters).
4. Configure Stripe products/prices and send webhooks to `/api/billing/webhook`.
5. In the Clerk dashboard, add a webhook endpoint at `https://YOUR_DOMAIN/api/webhooks/clerk` subscribed to `user.deleted`, and set `CLERK_WEBHOOK_SECRET` to its signing secret (`whsec_...`). This is the safety net that deletes ClipForge data and revokes Google tokens if an account is removed from Clerk's own UI instead of ClipForge's "Delete account" button.
5. Deploy the Next.js control plane to a public HTTPS domain; WebSub cannot reach localhost.
6. Start one or more media workers on machines with FFmpeg and the ClipForge runtime:

```powershell
$env:CONTROL_PLANE_URL='https://YOUR_DOMAIN'
$env:WORKER_SECRET='...'
npm run worker
```

Call `POST /api/cron/poll-youtube` every 15 minutes with `Authorization: Bearer $CRON_SECRET`. It acts as the missed-notification fallback and renews WebSub leases.

The repository also includes `docker-compose.yml`, `Dockerfile.web`, and `Dockerfile.worker`. Create `saas/.env.production` from `.env.example`, then run `docker compose up --build`.

The worker receives short-lived Google access tokens, not refresh tokens, from the control plane. Refresh tokens remain AES-256-GCM encrypted in PostgreSQL.

## Three-hour SLA

- WebSub is the primary detector; polling should run every 15 minutes as a fallback.
- Jobs are leased by `deadline_at`, earliest first.
- Worker leases expire after ten minutes and can be recovered after crashes.
- Source video IDs are unique per tenant, preventing duplicate jobs from YouTube metadata-update events.
- The app can promise processing effort, not immunity from YouTube channel upload caps, API quota, copyright checks, or platform outages. Surface those separately to customers.

## Production gaps before accepting money

- Add a scheduled WebSub renewal/polling service and dead-letter alerts.
- Store rendered assets in object storage and add automatic cleanup.
- Run workers in isolated containers with per-job disk and CPU/GPU limits.
- Complete Stripe tax/legal setup and a reused-content/copyright attestation.
- Add load tests and at least two workers before advertising a contractual three-hour guarantee.

## Google OAuth verification checklist

`YOUTUBE_SCOPES` in `lib/youtube.ts` requests two restricted scopes
(`youtube.upload`, `yt-analytics.readonly`) and one sensitive scope
(`youtube.readonly`), so the OAuth consent screen must pass Google's
verification before it can go out of testing mode. What's in the repo:

- `/privacy`, `/terms`, and `/data-deletion` — public pages covering data use, the
  Google API Services / YouTube API Limited Use disclosure, and how a user
  deletes their account and data.
- `DELETE /api/account` — self-service deletion, wired to the "Delete account
  and all data" button in Dashboard → Profile & Security. Revokes the stored
  Google refresh token via `revokeGoogleToken`, deletes the tenant row
  (cascades to channels/jobs/clips), and deletes the Clerk user.
- `POST /api/webhooks/clerk` — handles `user.deleted` as a fallback so
  deleting the Clerk user directly still revokes tokens and deletes tenant data.

Still required outside this codebase, in Google Cloud Console:

- Verify domain ownership of `clipforge.klippdstudio.com` in Search Console
  and link it to the OAuth consent screen.
- Fill in app name, logo, support email, and developer contact email on the
  consent screen — use a real, monitored inbox (this codebase assumes
  `support@klippdstudio.com`; update every reference if that changes).
- Add `/privacy` and `/terms` as the consent screen's privacy policy and
  terms of service links.
- Submit scope justifications and a screencast showing the OAuth flow and
  each scope's actual use, since `youtube.upload` and `yt-analytics.readonly`
  require Google's manual review.
- Complete the separate **YouTube API Services** audit (Google contacts you
  after the OAuth review) confirming the Limited Use policy compliance
  described in `/privacy`.
