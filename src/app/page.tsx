export default function HomePage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#F05E23] to-[#3E2315] text-white py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Find Your Perfect Car
            </h1>
            <p className="text-lg md:text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Buy and sell vehicles with confidence on SUUQFURAN. Browse thousands of listings from trusted dealers and private sellers.
            </p>
            <button className="bg-white text-[#F05E23] px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition md:text-lg">
              Start Browsing
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3E2315] text-center mb-12">
            Why Choose SUUQFURAN?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-[#3E2315] mb-3">
                Verified Listings
              </h3>
              <p className="text-gray-600">
                All vehicles are verified for authenticity. Detailed inspection reports and service history included.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-[#3E2315] mb-3">
                Best Prices
              </h3>
              <p className="text-gray-600">
                Competitive pricing from dealers and private sellers. Compare prices instantly and get the best deals.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-[#3E2315] mb-3">
                Safe Transactions
              </h3>
              <p className="text-gray-600">
                Secure payment options and buyer protection. Complete documentation and legal support provided.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#3E2315] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Buy or Sell?
          </h2>
          <p className="text-orange-100 mb-6">
            Join thousands of satisfied buyers and sellers on SUUQFURAN today.
          </p>
          <button className="bg-[#F05E23] text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition md:text-lg">
            Get Started Now
          </button>
        </div>
      </section>
    </main>
  );
}