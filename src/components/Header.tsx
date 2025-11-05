"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/user/me', {
          credentials: 'include',
        });
        setIsLoggedIn(response.ok);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  // Get store slug from environment (set during build)
  const storeSlug = process.env.NEXT_PUBLIC_STORE_SLUG || process.env.STORE_SLUG || '';
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || 'Store';

  // Check if we're on a custom domain or prometora.com subdomain (not www.prometora.com)
  // Both custom domains and *.prometora.com subdomains should use local paths
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const isMainPrometoraApp = hostname === 'www.prometora.com' || hostname === 'prometora.com' || hostname === 'localhost';
  const isCustomDomain = !isMainPrometoraApp;

  // Build navigation links based on domain
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Listings", href: isCustomDomain ? "/listings" : `/s/${storeSlug}/listings` },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              {storeName}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <div className="flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            {/* Auth Button */}
            {!loading && (
              isLoggedIn ? (
                <Link
                  href={isCustomDomain ? "/dashboard" : `/s/${storeSlug}/dashboard`}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href={isCustomDomain ? "/signin" : `/s/${storeSlug}/signin`}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
                >
                  Sign In
                </Link>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* Auth Button - Mobile */}
              {!loading && (
                isLoggedIn ? (
                  <Link
                    href={isCustomDomain ? "/dashboard" : `/s/${storeSlug}/dashboard`}
                    className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium border-t border-gray-200 mt-2 pt-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href={isCustomDomain ? "/signin" : `/s/${storeSlug}/signin`}
                    className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium border-t border-gray-200 mt-2 pt-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
