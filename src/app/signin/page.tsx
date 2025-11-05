import { SignInPageClient } from './SignInPageClient';

/**
 * Sign In Page (Server Component)
 * Fetches store info server-side to avoid loading spinner
 */
export default async function SignIn() {
  const storeSlug = process.env.NEXT_PUBLIC_STORE_SLUG || process.env.STORE_SLUG || '';
  const apiUrl = process.env.NEXT_PUBLIC_PROMETORA_URL || 'https://www.prometora.com';

  if (!storeSlug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error: Store slug not configured</p>
      </div>
    );
  }

  // Fetch store info server-side
  let storeInfo = null;
  try {
    const response = await fetch(`${apiUrl}/api/stores/${storeSlug}/info`, {
      cache: 'no-store', // Always get fresh data
    });

    if (response.ok) {
      storeInfo = await response.json();
    }
  } catch (error) {
    console.error('Failed to fetch store info:', error);
  }

  return (
    <SignInPageClient
      storeSlug={storeSlug}
      apiUrl={apiUrl}
      initialStoreInfo={storeInfo}
    />
  );
}
