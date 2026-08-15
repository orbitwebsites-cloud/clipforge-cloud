import Link from 'next/link';
import { Play } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of Service | ClipForge Cloud', description: 'The terms that govern your use of ClipForge Cloud.' };

const SUPPORT_EMAIL = 'support@klippdstudio.com';

export default function TermsPage() {
  return (
    <main className="landing-shell">
      <nav className="marketing-nav">
        <Link className="brand" href="/"><span className="brand-mark"><Play size={16} fill="currentColor" /></span>ClipForge <em>Cloud</em></Link>
        <div className="legal-nav"><Link href="/privacy">Privacy</Link><Link href="/data-deletion">Data deletion</Link><Link href="/sign-in">Sign in</Link></div>
      </nav>

      <article className="legal-page">
        <p className="overline">Legal</p>
        <h1>Terms of Service</h1>
        <p className="updated">Last updated August 15, 2026</p>

        <section>
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of ClipForge Cloud (the
            &ldquo;Service&rdquo;), operated by ClipForge. By creating an account or connecting a channel, you agree
            to these Terms. If you do not agree, do not use the Service.
          </p>
        </section>

        <section>
          <h2>1. The Service</h2>
          <p>
            ClipForge Cloud monitors YouTube and Twitch source channels that you authorize, automatically generates
            captioned vertical Shorts from new uploads or stream replays, and publishes or privately uploads them to
            a YouTube channel you connect and control. The Service is provided on a best-effort basis: we do not
            guarantee immunity from YouTube upload caps, API quota limits, copyright checks, or platform outages,
            even where a plan advertises a processing time target.
          </p>
        </section>

        <section>
          <h2>2. Eligibility and your account</h2>
          <p>You must be at least 18, or the age of majority in your jurisdiction, to use the Service. You are responsible for the accuracy of your account information and for maintaining the security of your sign-in credentials and connected accounts.</p>
        </section>

        <section>
          <h2>3. Content rights and responsibilities</h2>
          <ul>
            <li>You must own or have the rights necessary to authorize ClipForge to access, clip, caption, and republish content from every source channel you connect.</li>
            <li>You must only connect a destination YouTube channel that you own and are authorized to publish to.</li>
            <li>You are solely responsible for the content ClipForge publishes on your behalf, including compliance with YouTube&rsquo;s Community Guidelines, Terms of Service, and applicable copyright law.</li>
            <li>ClipForge does not review clip content before automatic publishing unless you select &ldquo;review-first&rdquo; publishing mode.</li>
            <li>We may suspend processing for a source if we receive a credible rights or infringement complaint about it.</li>
          </ul>
        </section>

        <section>
          <h2>4. Google and YouTube API use</h2>
          <p>
            Your use of the Service&rsquo;s YouTube features is also subject to the{' '}
            <a href="https://www.youtube.com/t/terms" target="_blank" rel="noreferrer">YouTube Terms of Service</a> and{' '}
            <a href="https://developers.google.com/youtube/terms/api-services-terms-of-service" target="_blank" rel="noreferrer">
              YouTube API Services Terms of Service
            </a>. By connecting a Google account, you grant ClipForge the specific, revocable permissions shown on
            Google&rsquo;s consent screen; you can revoke them at any time from your{' '}
            <a href="https://myaccount.google.com/permissions" target="_blank" rel="noreferrer">Google Account permissions page</a> or by deleting your ClipForge account. See our <Link href="/privacy">Privacy Policy</Link> for how that data is used.
          </p>
        </section>

        <section>
          <h2>5. Subscriptions and billing</h2>
          <p>
            Paid plans are billed in advance on a recurring basis through our billing provider. Usage limits (published
            Shorts, monitored sources) reset monthly as described on our pricing page. You can cancel at any time
            through the billing portal linked in your dashboard; cancellation takes effect at the end of the current
            billing period, and we do not provide partial-period refunds except where required by law.
          </p>
        </section>

        <section>
          <h2>6. Acceptable use</h2>
          <p>You agree not to: use the Service to publish content that infringes third-party rights, is unlawful, or violates YouTube&rsquo;s policies; attempt to circumvent plan limits, quotas, or authentication; reverse-engineer or resell the Service; or use the Service to access accounts or channels you are not authorized to manage.</p>
        </section>

        <section>
          <h2>7. Suspension and termination</h2>
          <p>We may suspend or terminate access to the Service for violation of these Terms, non-payment, or conduct that creates legal or platform risk for ClipForge. You may stop using the Service and delete your account at any time from your dashboard, which also revokes connected Google/Twitch access and deletes your stored data as described in our <Link href="/data-deletion">data deletion policy</Link>.</p>
        </section>

        <section>
          <h2>8. Disclaimers and limitation of liability</h2>
          <p>
            The Service is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied. To the
            maximum extent permitted by law, ClipForge is not liable for indirect, incidental, or consequential
            damages, or for lost revenue, views, or subscribers arising from use of the Service, including changes to
            YouTube or Twitch policies, API availability, or platform enforcement actions outside our control.
          </p>
        </section>

        <section>
          <h2>9. Changes to these Terms</h2>
          <p>We may update these Terms from time to time. Continued use of the Service after a change takes effect constitutes acceptance of the revised Terms.</p>
        </section>

        <section>
          <h2>10. Contact</h2>
          <p>Questions about these Terms: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p>
        </section>
      </article>

      <footer><span>© 2026 ClipForge Cloud</span><span><Link href="/terms">Terms</Link> · <Link href="/privacy">Privacy</Link> · <Link href="/data-deletion">Data deletion</Link></span></footer>
    </main>
  );
}
