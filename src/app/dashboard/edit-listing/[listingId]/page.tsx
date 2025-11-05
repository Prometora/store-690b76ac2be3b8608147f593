import { EditListingPage } from '@prometora/marketplace-ui';

/**
 * Edit Listing Page
 * Wrapper page that uses the EditListingPage component from @prometora/marketplace-ui
 */
export default async function EditListing({ params }: { params: Promise<{ listingId: string }> }) {
  const { listingId } = await params;
  const storeSlug = process.env.NEXT_PUBLIC_STORE_SLUG || process.env.STORE_SLUG || '';
  const apiUrl = process.env.NEXT_PUBLIC_PROMETORA_URL || 'https://www.prometora.com'; // Use empty string for relative URLs

  if (!storeSlug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error: Store slug not configured</p>
      </div>
    );
  }

  return <EditListingPage listingId={listingId} storeSlug={storeSlug} apiUrl={apiUrl} />;
}
