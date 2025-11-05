import { cookies } from 'next/headers';
import SellerBuyerSidebar from '@/components/seller/SellerBuyerSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface UserSession {
  userId: string;
  storeId: string;
  email: string;
  roles: ('buyer' | 'seller')[];
}

/**
 * Dashboard Layout
 * Wraps all dashboard pages with the seller/buyer sidebar navigation
 */
export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const storeSlug = process.env.NEXT_PUBLIC_STORE_SLUG || process.env.STORE_SLUG || '';
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || 'Store';

  // Get user session from cookie
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  let userRoles: ('buyer' | 'seller')[] = [];
  let userEmail: string | undefined;
  let userName: string | undefined;

  if (token) {
    try {
      const jwt = require('jsonwebtoken');
      const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
      const session = jwt.verify(token, JWT_SECRET) as UserSession;

      userRoles = session.roles || [];
      userEmail = session.email;
      // Derive username from email
      userName = session.email?.split('@')[0];
    } catch (error) {
      console.error('Error verifying session:', error);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
          <SellerBuyerSidebar
            storeId={storeSlug}
            storeName={storeName}
            userRoles={userRoles}
            marketplaceTemplate="general"
            userName={userName}
            userEmail={userEmail}
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
