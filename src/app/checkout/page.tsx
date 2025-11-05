import { CheckoutPage } from '@prometora/marketplace-ui';

/**
 * Checkout Page
 * Wrapper page that uses the CheckoutPage component from @prometora/marketplace-ui
 */
export default function Checkout() {
  const storeSlug = process.env.NEXT_PUBLIC_STORE_SLUG || process.env.STORE_SLUG || '';
  const apiUrl = process.env.NEXT_PUBLIC_PROMETORA_URL || 'https://www.prometora.com'; // Use empty string for relative URLs

  if (!storeSlug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error: Store slug not configured</p>
      </div>
    );
  }

  return <CheckoutPage storeSlug={storeSlug} apiUrl={apiUrl} />;
}
