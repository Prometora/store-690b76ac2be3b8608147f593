"use client";

import SellerNavigationList from './SellerNavigationList';

interface SellerBuyerSidebarProps {
  storeId: string;
  storeName: string;
  userRoles: ('buyer' | 'seller')[];
  marketplaceTemplate?: 'general' | 'product' | 'rental' | 'service';
  onNavigate?: () => void;
  userName?: string;
  userEmail?: string;
}

export default function SellerBuyerSidebar({ storeId, userRoles, marketplaceTemplate, onNavigate, userName, userEmail }: SellerBuyerSidebarProps) {
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
