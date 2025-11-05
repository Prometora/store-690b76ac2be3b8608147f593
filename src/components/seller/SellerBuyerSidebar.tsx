"use client";

import { useEffect, useState } from 'react';
import SellerNavigationList from './SellerNavigationList';

interface SellerBuyerSidebarProps {
  storeId: string;
  marketplaceTemplate?: 'general' | 'product' | 'rental' | 'service';
  onNavigate?: () => void;
}

export default function SellerBuyerSidebar({ storeId, marketplaceTemplate, onNavigate }: SellerBuyerSidebarProps) {
  const [userRoles, setUserRoles] = useState<('buyer' | 'seller')[]>([]);
  const [userName, setUserName] = useState<string | undefined>();
  const [userEmail, setUserEmail] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user session data
    async function fetchUserData() {
      try {
        const response = await fetch('/api/user/me', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUserRoles(data.roles || []);
          setUserName(data.userName);
          setUserEmail(data.email);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <SellerNavigationList
      storeId={storeId}
      userRoles={userRoles}
      marketplaceTemplate={marketplaceTemplate}
      onNavigate={onNavigate}
      userName={userName}
      userEmail={userEmail}
    />
  );
}
