export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#3E2315] to-[#5a3520] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to SUUQFURAN
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl">
            Your trusted marketplace for buying and selling quality vehicles. 
            We connect buyers and sellers with transparency, security, and exceptional service.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#3E2315] mb-6">
                Our Mission
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                At SUUQFURAN, we believe buying or selling a car should be simple, 
                safe, and stress-free. We've built a platform that empowers both buyers 
                and sellers to make informed decisions with confidence. Whether you're 
                looking for your next vehicle or ready to sell, we're here to make it happen.
              </p>
            </div>
            <div className="bg-[#F05E23] rounded-lg p-8 text-white">
              <p className="text-2xl font-semibold mb-4">
                🚗 Thousands of Vehicles
              </p>
              <p className="text-gray-100">
                Browse verified listings from trusted sellers across the region.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3E2315] mb-12 text-center">
            Why Choose SUUQFURAN?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="border-2 border-[#F05E23] rounded-lg p-8 hover:shadow-lg transition">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl font-bold text-[#3E2315] mb-3">
                Verified Listings
              </h3>
              <p className="text-gray-700">
                Every vehicle is vetted for authenticity. We verify seller credentials 
                and vehicle details to ensure you're making a safe transaction.
              </p>
            </div>

            {/* Card 2 */}
            <div className="border-2 border-[#F05E23] rounded-lg p-8 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-[#3E2315] mb-3">
                Secure Platform
              </h3>
              <p className="text-gray-700">
                Your data and transactions are protected with industry-leading 
                security. Trade with peace of mind on our encrypted platform.
              </p>
            </div>

            {/* Card 3 */}
            <div className="border-2 border-[#F05E23] rounded-lg p-8 hover:shadow-lg transition">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-[#3E2315] mb-3">
                Expert Support
              </h3>
              <p className="text-gray-700">
                Our dedicated team is available to help buyers and sellers navigate 
                every step of the buying or selling process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3E2315] mb-8">
            Our Story
          </h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed max-w-3xl">
            <p>
              SUUQFURAN was founded with a simple vision: to revolutionize how people 
              buy and sell cars. We recognized the challenges in the traditional automotive 
              marketplace—lack of transparency, security concerns, and complicated processes.
            </p>
            <p>
              Today, we're proud to serve thousands of satisfied customers who trust our 
              platform for their automotive needs. From first-time buyers to experienced 
              dealers, SUUQFURAN is the marketplace built for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#F05E23] to-[#e64a0f] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Next Car?
          </h2>
          <p className="text-lg mb-8 text-gray-100">
            Browse our listings or start selling today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#3E2315] hover:bg-[#2a1810] text-white px-8 py-3 rounded-lg font-semibold transition">
              Browse Vehicles
            </button>
            <button className="bg-white hover:bg-gray-100 text-[#F05E23] px-8 py-3 rounded-lg font-semibold transition">
              Sell Your Car
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}