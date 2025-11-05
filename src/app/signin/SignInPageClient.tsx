'use client';

import { SignInPage } from '@prometora/marketplace-ui';

interface SignInPageClientProps {
  storeSlug: string;
  apiUrl: string;
  initialStoreInfo: {
    success: boolean;
    name: string;
    slug: string;
    theme: {
      colors: {
        primary: string;
      };
    };
  } | null;
}

/**
 * Sign In Page Client Component
 * Wraps the SignInPage from @prometora/marketplace-ui
 * Accepts pre-fetched store info to avoid loading spinner
 */
export function SignInPageClient({ storeSlug, apiUrl, initialStoreInfo }: SignInPageClientProps) {
  return (
    <SignInPage
      storeSlug={storeSlug}
      apiUrl={apiUrl}
      initialStoreInfo={initialStoreInfo}
    />
  );
}
