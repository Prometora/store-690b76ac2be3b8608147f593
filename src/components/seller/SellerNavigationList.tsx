"use client";

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { LayoutDashboard, Package, Plus, LogOut, Store, MessageCircle, Calendar, ClipboardList } from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: ('buyer' | 'seller')[];
}

interface SellerNavigationListProps {
  storeId: string;
  userRoles: ('buyer' | 'seller')[];
  marketplaceTemplate?: 'general' | 'product' | 'rental' | 'service';
  onNavigate?: () => void;
  userName?: string;
  userEmail?: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function SellerNavigationList({ storeId, userRoles, marketplaceTemplate, onNavigate, userName, userEmail }: SellerNavigationListProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isUpgrading, setIsUpgrading] = useState(false);

  // Check if we're on a custom domain
  const isCustomDomain = typeof window !== 'undefined' &&
    !window.location.hostname.includes('prometora.com') &&
    !window.location.hostname.includes('localhost');

  const isSeller = userRoles.includes('seller');
  const isBuyer = userRoles.includes('buyer');

  // Build navigation array based on user roles
  const allNavigation: NavigationItem[] = [
    {
      name: 'Dashboard',
      href: isCustomDomain ? `/dashboard` : `/s/${storeId}/dashboard`,
      icon: LayoutDashboard,
      // Dashboard is visible to everyone
    },
    {
      name: 'Messages',
      href: isCustomDomain ? `/dashboard/messages` : `/s/${storeId}/dashboard/messages`,
      icon: MessageCircle,
      // Messages is visible to everyone (both buyers and sellers)
    },
    // Seller-only items
    {
      name: 'My Listings',
      href: isCustomDomain ? `/dashboard/my-listings` : `/s/${storeId}/dashboard/my-listings`,
      icon: Package,
      roles: ['seller'],
    },
    {
      name: 'Create Listing',
      href: isCustomDomain ? `/dashboard/create-listing` : `/s/${storeId}/dashboard/create-listing`,
      icon: Plus,
      roles: ['seller'],
    },
  ];

  // Add booking-related items for rental and service marketplaces
  if (marketplaceTemplate === 'rental' || marketplaceTemplate === 'service') {
    // Manage Bookings - for sellers to manage requests for their listings
    allNavigation.push({
      name: 'Manage Bookings',
      href: isCustomDomain ? `/dashboard/manage-bookings` : `/s/${storeId}/dashboard/manage-bookings`,
      icon: ClipboardList,
      roles: ['seller'],
    });

    // My Bookings - for everyone to see bookings they've made
    allNavigation.push({
      name: 'My Bookings',
      href: isCustomDomain ? `/dashboard/bookings` : `/s/${storeId}/dashboard/bookings`,
      icon: Calendar,
      roles: ['buyer', 'seller'], // Allow both buyers and sellers to see bookings they've made
    });
  }

  // Filter navigation based on user's roles
  const navigation = allNavigation.filter(item => {
    // If no roles specified, item is visible to everyone
    if (!item.roles || item.roles.length === 0) return true;
    // Check if user has at least one of the required roles
    return item.roles.some(role => userRoles.includes(role));
  });

  const handleUpgradeToSeller = async () => {
    try {
      setIsUpgrading(true);

      const response = await fetch('/api/auth/upgrade-to-seller', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upgrade account');
      }

      // Refresh the page to update the UI with new roles
      router.refresh();
    } catch (error) {
      console.error('Error upgrading to seller:', error);
      alert('Failed to upgrade account. Please try again.');
    } finally {
      setIsUpgrading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      // Call the signout API
      await fetch(`/api/sellers/signout`, {
        method: 'POST',
      });

      // Redirect to signin page
      const signInUrl = isCustomDomain ? `/signin` : `/s/${storeId}/signin`;
      window.location.href = signInUrl;
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={classNames(
                      isActive
                        ? 'bg-white/5 text-white'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white',
                      'group flex gap-x-3 rounded-md p-2 text-sm font-semibold transition-colors'
                    )}
                  >
                    <item.icon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>

        {/* Upgrade to Seller button for buyers who aren't sellers yet */}
        {isBuyer && !isSeller && (
          <li className="-mx-2">
            <button
              onClick={handleUpgradeToSeller}
              disabled={isUpgrading}
              className="flex w-full items-center gap-x-3 rounded-md p-3 text-sm font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Store className="h-6 w-6 shrink-0" />
              {isUpgrading ? 'Upgrading...' : 'Become a Seller'}
            </button>
          </li>
        )}

        {/* User info and Sign out button */}
        <li className="-mx-6 mt-auto">
          {(userName || userEmail) && (
            <div className="px-6 py-3 border-t border-white/10">
              {userName && (
                <p className="text-sm font-semibold text-white truncate">
                  {userName}
                </p>
              )}
              {userEmail && (
                <p className="text-xs text-white/60 truncate mt-1">
                  {userEmail}
                </p>
              )}
            </div>
          )}
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-x-4 px-6 py-3 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
          >
            <LogOut
              className="h-6 w-6 shrink-0"
              aria-hidden="true"
            />
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
}
