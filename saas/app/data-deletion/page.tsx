import Link from 'next/link';
import { Play } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Data Deletion | ClipForge Cloud', description: 'How to delete your ClipForge Cloud account and every piece of data associated with it, including Google/YouTube access.' };

const SUPPORT_EMAIL = 'support@klippdstudio.com';

export default function DataDeletionPage() {
  return (
    <main className="landing-shell">
      <nav className="marketing-nav">
        <Link className="brand" href="/"><span className="brand-mark"><Play size={16} fill="currentColor" /></span>ClipForge <em>Cloud</em></Link>
        <div className="legal-nav"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/sign-in">Sign in</Link></div>
      </nav>

      <article className="legal-page">
        <p className="overline">Legal</p>
        <h1>Data Deletion</h1>
        <p className="updated">Last updated August 15, 2026</p>

        <section>
          <p>
            You can permanently delete your ClipForge Cloud account and all associated data at any time, without
            contacting support.
          </p>
        </section>

        <section>
          <h2>Self-service deletion</h2>
          <ol>
            <li>Sign in and open <strong>Dashboard → Profile &amp; Security</strong>.</li>
            <li>Scroll to <strong>&ldquo;Delete account and all data&rdquo;</strong> and select <strong>Delete my account</strong>.</li>
            <li>Confirm the permanent deletion.</li>
          </ol>
          <p>This immediately and irreversibly:</p>
          <ul>
            <li>Revokes your connected Google OAuth token, calling Google&rsquo;s token-revocation endpoint so ClipForge can no longer access your YouTube account.</li>
            <li>Deletes every source and destination channel connection, encrypted refresh token, job, clip record, analytics snapshot, and creator preference tied to your account.</li>
            <li>Deletes your ClipForge sign-in account.</li>
            <li>Cancels processing of any in-progress jobs.</li>
          </ul>
          <p>Deletion is processed immediately in our production database; there is no retention or &ldquo;soft delete&rdquo; window.</p>
        </section>

        <section>
          <h2>Revoking access without deleting your account</h2>
          <p>
            To stop ClipForge from accessing a specific YouTube or Twitch channel while keeping your account, remove
            that source from <strong>Dashboard → Sources</strong>, or revoke ClipForge&rsquo;s Google access directly
            from your{' '}
            <a href="https://myaccount.google.com/permissions" target="_blank" rel="noreferrer">Google Account permissions page</a>. Revoking access this way immediately invalidates the token; ClipForge will stop monitoring that channel on its next scheduled check.
          </p>
        </section>

        <section>
          <h2>Requesting deletion by email</h2>
          <p>
            If you can&rsquo;t access your dashboard, email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>{' '}
            from the address on your account and ask us to delete your data. We verify the request and complete
            deletion within 30 days, and confirm by email once it&rsquo;s done.
          </p>
        </section>

        <section>
          <h2>Data exports</h2>
          <p>Prefer a copy of your data before deleting it? Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> and we&rsquo;ll send a machine-readable export within 30 days.</p>
        </section>

        <section>
          <h2>What isn&rsquo;t deleted</h2>
          <p>
            Shorts already published to your YouTube channel remain on YouTube under your control &mdash; ClipForge
            deleting your account does not remove videos from YouTube. Records we&rsquo;re required to keep for
            legal, tax, or fraud-prevention purposes (such as billing history with our payment processor) are
            retained separately per that provider&rsquo;s own policy.
          </p>
        </section>
      </article>

      <footer><span>© 2026 ClipForge Cloud</span><span><Link href="/terms">Terms</Link> · <Link href="/privacy">Privacy</Link> · <Link href="/data-deletion">Data deletion</Link></span></footer>
    </main>
  );
}
