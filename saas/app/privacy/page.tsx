import Link from 'next/link';
import { Play } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy | ClipForge Cloud', description: 'How ClipForge Cloud collects, uses, and protects your data, including data accessed through Google and YouTube APIs.' };

const SUPPORT_EMAIL = 'support@klippdstudio.com';

export default function PrivacyPage() {
  return (
    <main className="landing-shell">
      <nav className="marketing-nav">
        <Link className="brand" href="/"><span className="brand-mark"><Play size={16} fill="currentColor" /></span>ClipForge <em>Cloud</em></Link>
        <div className="legal-nav"><Link href="/terms">Terms</Link><Link href="/data-deletion">Data deletion</Link><Link href="/sign-in">Sign in</Link></div>
      </nav>

      <article className="legal-page">
        <p className="overline">Legal</p>
        <h1>Privacy Policy</h1>
        <p className="updated">Last updated August 15, 2026</p>

        <section>
          <p>
            ClipForge Cloud (&ldquo;ClipForge,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) provides a service that monitors
            creator-authorized YouTube and Twitch channels, generates captioned Shorts from new uploads and stream
            replays, and publishes them to a destination YouTube channel that you own and connect. This policy
            explains what we collect, why, and how you can control or delete it.
          </p>
        </section>

        <section>
          <h2>1. Information we collect</h2>
          <h3>Account information</h3>
          <p>Your name and email address, collected during sign-up through our authentication provider (Clerk).</p>
          <h3>Google account and YouTube data</h3>
          <p>
            When you connect a YouTube channel, Google issues us an OAuth access token and refresh token scoped to
            the permissions you approve. Depending on the permissions granted, we may access: your basic Google
            profile (name, email); your YouTube channel ID, title, and handle; a list of your channel&rsquo;s videos
            and their public metadata (title, thumbnail, publish date); and channel-level analytics (views, watch
            time, engagement) for Shorts ClipForge publishes. Refresh tokens are encrypted at rest with AES-256-GCM
            and are never shown in our interface or logs.
          </p>
          <h3>Twitch data</h3>
          <p>If you connect a Twitch channel as a source, we access public VOD metadata via the Twitch API to detect new stream replays.</p>
          <h3>Content you upload or generate</h3>
          <p>Source video/audio we download to produce clips, generated transcripts, and rendered Short video files, held temporarily to run the pipeline.</p>
          <h3>Usage and billing data</h3>
          <p>Plan tier, clip counts, job history, and (if you subscribe) billing identifiers from our payment processor. We do not store full payment card numbers.</p>
        </section>

        <section>
          <h2>2. How we use your information</h2>
          <ul>
            <li>To detect new uploads or stream replays on channels you&rsquo;ve authorized us to monitor.</li>
            <li>To transcribe, select highlight moments, caption, and render vertical Shorts from that source video.</li>
            <li>To publish or privately upload the resulting Shorts to your connected destination YouTube channel, using the permissions you granted.</li>
            <li>To show you job status, analytics, and performance history in your dashboard.</li>
            <li>To operate subscriptions, enforce plan limits, and provide customer support.</li>
            <li>To improve moment-selection quality using aggregate performance signals from your own published Shorts (only when &ldquo;performance learning&rdquo; is enabled in your settings).</li>
          </ul>
          <p>We do not sell your data, and we do not use your YouTube or Google data for advertising.</p>
        </section>

        <section>
          <h2>3. Google API Services &amp; Limited Use disclosure</h2>
          <p>
            ClipForge Cloud&rsquo;s use and transfer of information received from Google APIs adheres to the{' '}
            <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer">
              Google API Services User Data Policy
            </a>, including the Limited Use requirements. Specifically:
          </p>
          <ul>
            <li>We only request the scopes required to detect uploads, read channel/video metadata, read Analytics for videos we publish, and upload Shorts on your behalf.</li>
            <li>Data obtained through Google APIs is used solely to provide and improve the ClipForge automation you&rsquo;ve configured &mdash; it is never used for serving ads, building advertising profiles, or sold, rented, or transferred to third parties for unrelated purposes.</li>
            <li>Human access to Google/YouTube data is limited to what is necessary for security, legal compliance, or with your explicit consent (e.g. debugging a support request you filed).</li>
            <li>You can revoke ClipForge&rsquo;s access at any time from your{' '}
              <a href="https://myaccount.google.com/permissions" target="_blank" rel="noreferrer">Google Account permissions page</a>{' '}
              or by deleting your ClipForge account (see &ldquo;Your rights&rdquo; below), which also revokes the stored token automatically.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. How we share information</h2>
          <p>We share data only with the service providers required to run ClipForge, under contracts that restrict their use of it to providing the service to us:</p>
          <ul>
            <li><strong>Clerk</strong> &ndash; authentication and account management.</li>
            <li><strong>Google/YouTube API</strong> &ndash; to detect uploads and publish Shorts to your channel.</li>
            <li><strong>Twitch API</strong> &ndash; to detect stream replays on connected Twitch sources.</li>
            <li><strong>Deepgram</strong> &ndash; audio transcription of your source video.</li>
            <li><strong>Cerebras</strong> &ndash; language-model inference used to rank highlight moments from transcripts.</li>
            <li><strong>Whop / Stripe</strong> &ndash; subscription billing.</li>
            <li><strong>Hosting/infrastructure providers</strong> &ndash; to run our application, database, and render workers.</li>
          </ul>
          <p>We may also disclose information if required by law, to enforce our Terms, or to protect the rights, property, or safety of ClipForge, our users, or the public.</p>
        </section>

        <section>
          <h2>5. Data retention</h2>
          <p>
            We retain account, channel-connection, and job/analytics records for as long as your account is active,
            so your dashboard history stays intact. Source video files and intermediate render assets are deleted
            automatically once a job completes or fails. Refresh tokens are deleted immediately when you disconnect
            a channel or delete your account.
          </p>
        </section>

        <section>
          <h2>6. Your rights and choices</h2>
          <p>You can, at any time:</p>
          <ul>
            <li>Disconnect a YouTube or Twitch source from your dashboard, which stops monitoring and deletes that connection&rsquo;s stored token.</li>
            <li>Export the data associated with your account by emailing <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>; we will provide a machine-readable copy within 30 days.</li>
            <li>Permanently delete your account and all associated data &mdash; channels, jobs, clips, preferences, and encrypted tokens &mdash; from Profile &amp; Security in your dashboard, or by request at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. See our <Link href="/data-deletion">data deletion instructions</Link> for details on what is removed and how long it takes.</li>
          </ul>
        </section>

        <section>
          <h2>7. Security</h2>
          <p>OAuth refresh tokens are encrypted at rest with AES-256-GCM. Access to production data is limited to engineers who need it to operate the service. All traffic to ClipForge is served over HTTPS.</p>
        </section>

        <section>
          <h2>8. Children&rsquo;s privacy</h2>
          <p>ClipForge Cloud is not directed to children under 13, and we do not knowingly collect personal information from them.</p>
        </section>

        <section>
          <h2>9. Changes to this policy</h2>
          <p>We&rsquo;ll update the &ldquo;Last updated&rdquo; date above whenever this policy changes, and post material changes on this page.</p>
        </section>

        <section>
          <h2>10. Contact</h2>
          <p>Questions about this policy or your data: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p>
        </section>
      </article>

      <footer><span>© 2026 ClipForge Cloud</span><span><Link href="/terms">Terms</Link> · <Link href="/privacy">Privacy</Link> · <Link href="/data-deletion">Data deletion</Link></span></footer>
    </main>
  );
}
