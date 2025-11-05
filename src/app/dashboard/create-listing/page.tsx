import { CreateListingPage } from '@prometora/marketplace-ui';

/**
 * Create Listing Page
 * Wrapper page that uses the CreateListingPage component from @prometora/marketplace-ui
 */
export default function CreateListing() {
  const storeSlug = process.env.NEXT_PUBLIC_STORE_SLUG || process.env.STORE_SLUG || '';
  const apiUrl = process.env.NEXT_PUBLIC_PROMETORA_URL || 'https://www.prometora.com'; // Use empty string for relative URLs

  if (!storeSlug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error: Store slug not configured</p>
      </div>
    );
  }

  return <CreateListingPage storeSlug={storeSlug} apiUrl={apiUrl} />;
}
