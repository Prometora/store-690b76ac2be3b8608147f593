import { SignUpPage } from '@prometora/marketplace-ui';

/**
 * Sign Up Page
 * Wrapper page that uses the SignUpPage component from @prometora/marketplace-ui
 */
export default function SignUp() {
  const storeSlug = process.env.NEXT_PUBLIC_STORE_SLUG || process.env.STORE_SLUG || '';
  const apiUrl = process.env.NEXT_PUBLIC_PROMETORA_URL || 'https://www.prometora.com'; // Use empty string for relative URLs

  if (!storeSlug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error: Store slug not configured</p>
      </div>
    );
  }

  return <SignUpPage storeSlug={storeSlug} apiUrl={apiUrl} />;
}
