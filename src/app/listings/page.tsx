import { ListingsPage } from '@prometora/marketplace-ui';

/**
 * Listings Page
 * Wrapper page that uses the ListingsPage component from @prometora/marketplace-ui
 */
export default function Listings() {
  const storeSlug = process.env.NEXT_PUBLIC_STORE_SLUG || process.env.STORE_SLUG || '';
  // Always use www.prometora.com API (CORS enabled)
  // Use NEXT_PUBLIC_PROMETORA_URL for local development
  const apiUrl = process.env.NEXT_PUBLIC_PROMETORA_URL || 'https://www.prometora.com';

  if (!storeSlug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error: Store slug not configured</p>
      </div>
    );
  }

  return <ListingsPage storeSlug={storeSlug} apiUrl={apiUrl} />;
}
