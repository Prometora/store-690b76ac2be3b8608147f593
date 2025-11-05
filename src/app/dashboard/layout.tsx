import SellerBuyerSidebar from '@/components/seller/SellerBuyerSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Dashboard Layout
 * Wraps all dashboard pages with the seller/buyer sidebar navigation
 */
export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const storeSlug = process.env.NEXT_PUBLIC_STORE_SLUG || process.env.STORE_SLUG || '';

  // Get user session from cookie
  // Note: In deployed stores, authentication is handled by cookies set by the main Prometora app
  // The sidebar will fetch user roles from the API

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
          <SellerBuyerSidebar
            storeId={storeSlug}
            marketplaceTemplate="general"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
