import Footer from "@/components/Footer";

export default function AboutPage() {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || 'Store';
  const storeDescription = process.env.NEXT_PUBLIC_STORE_DESCRIPTION || 'A marketplace for buying and selling.';

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">About {storeName}</h1>

        <div className="prose prose-lg">
          <p className="text-lg text-gray-700 mb-4">
            {storeDescription}
          </p>

          {/* AI will customize this content */}
          <p className="text-gray-600 mb-4">
            We're passionate about connecting buyers and sellers in our marketplace.
            Our platform makes it easy to discover, list, and purchase quality products.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            To provide the best marketplace experience for both buyers and sellers.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Us?</h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Secure payments and transactions</li>
            <li>Wide selection of quality products</li>
            <li>Trusted seller community</li>
            <li>Excellent customer support</li>
          </ul>
        </div>
      </div>

      <Footer />
    </main>
  );
}
