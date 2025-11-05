import type { Metadata } from "next";
import "./globals.css";
import ConditionalHeader from "@/components/ConditionalHeader";

// Dynamic metadata based on environment variables
const storeName = process.env.NEXT_PUBLIC_STORE_NAME || process.env.STORE_NAME || "Store";
const storeDescription = process.env.NEXT_PUBLIC_STORE_DESCRIPTION || process.env.STORE_DESCRIPTION || "Welcome to our marketplace";

export const metadata: Metadata = {
  title: storeName,
  description: storeDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Visual Edit Client Script - enables element selection in editor */}
        <script src="/visual-edit-client.js" defer></script>
      </head>
      <body>
        <ConditionalHeader />
        {children}
      </body>
    </html>
  );
}
