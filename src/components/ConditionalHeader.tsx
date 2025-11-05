"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

/**
 * Conditionally renders the header based on the current route
 * Hides header on dashboard pages (they have their own sidebar navigation)
 */
export default function ConditionalHeader() {
  const pathname = usePathname();

  // Hide header on dashboard pages and their sub-pages
  const isDashboardPage = pathname?.startsWith('/dashboard');

  if (isDashboardPage) {
    return null;
  }

  return <Header />;
}
