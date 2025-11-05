import { OrderSuccessPage } from '@prometora/marketplace-ui';
import { notFound } from 'next/navigation';

/**
 * Order Success Page
 * Wrapper page that uses the OrderSuccessPage component from @prometora/marketplace-ui
 */
export default async function OrderSuccess({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  const storeSlug = process.env.NEXT_PUBLIC_STORE_SLUG || process.env.STORE_SLUG || '';
  const apiUrl = process.env.NEXT_PUBLIC_PROMETORA_URL || 'https://www.prometora.com'; // Use empty string for relative URLs

  if (!session_id) {
    return notFound();
  }

  if (!storeSlug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error: Store slug not configured</p>
      </div>
    );
  }

  return <OrderSuccessPage storeSlug={storeSlug} sessionId={session_id} apiUrl={apiUrl} />;
}
