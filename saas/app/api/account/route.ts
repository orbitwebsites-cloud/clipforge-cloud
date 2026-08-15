import { auth, clerkClient } from '@clerk/nextjs/server';
import { decryptSecret } from '@/lib/crypto';
import { deleteTenant, tenantRefreshTokens } from '@/lib/repository';
import { tenantIdFromSession } from '@/lib/session';
import { revokeGoogleToken } from '@/lib/youtube';

export async function DELETE() {
  try {
    const { userId } = await auth();
    if (!userId) return Response.json({ error: 'Not authenticated' }, { status: 401 });
    const tenantId = await tenantIdFromSession();

    const encryptedTokens = await tenantRefreshTokens(tenantId);
    await Promise.all(encryptedTokens.map(async (encrypted) => {
      try { await revokeGoogleToken(decryptSecret(encrypted)); } catch { /* token already invalid or Google unreachable; deletion still proceeds */ }
    }));

    await (await clerkClient()).users.deleteUser(userId);
    await deleteTenant(tenantId);

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Account could not be deleted' }, { status: 400 });
  }
}
