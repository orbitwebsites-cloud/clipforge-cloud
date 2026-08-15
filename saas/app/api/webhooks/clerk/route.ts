import { createHmac, timingSafeEqual } from 'node:crypto';
import { decryptSecret } from '@/lib/crypto';
import { deleteTenant, tenantRefreshTokens } from '@/lib/repository';
import { revokeGoogleToken } from '@/lib/youtube';

// Clerk signs webhooks in the Svix format: https://clerk.com/docs/webhooks/sync-data
function verifiedPayload(rawBody: string, headers: Headers): any | null {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  const id = headers.get('svix-id');
  const timestamp = headers.get('svix-timestamp');
  const signatures = headers.get('svix-signature');
  if (!secret || !id || !timestamp || !signatures) return null;
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 5 * 60) return null;
  const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64');
  const expected = createHmac('sha256', key).update(`${id}.${timestamp}.${rawBody}`).digest();
  const valid = signatures.split(' ').some((entry) => {
    const [, value] = entry.split(',');
    if (!value) return false;
    const actual = Buffer.from(value, 'base64');
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  });
  if (!valid) return null;
  try { return JSON.parse(rawBody); } catch { return null; }
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const event = verifiedPayload(rawBody, request.headers);
  if (!event) return new Response('Invalid signature', { status: 403 });

  if (event.type === 'user.deleted') {
    const userId = event.data?.id as string | undefined;
    if (userId) {
      const tenantId = `tenant_${userId}`;
      const encryptedTokens = await tenantRefreshTokens(tenantId);
      await Promise.all(encryptedTokens.map(async (encrypted) => {
        try { await revokeGoogleToken(decryptSecret(encrypted)); } catch { /* token already invalid or Google unreachable; deletion still proceeds */ }
      }));
      await deleteTenant(tenantId);
    }
  }

  return Response.json({ ok: true });
}
