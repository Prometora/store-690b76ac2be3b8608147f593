export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#3E2315] to-[#F05E23] text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get in Touch with SUUQFURAN
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl">
            Have questions about buying or selling your car? Our dedicated team is here to help you navigate the marketplace with confidence.
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Email */}
            <div className="bg-gray-50 p-8 rounded-lg border-l-4 border-[#F05E23]">
              <h3 className="text-xl font-bold text-[#3E2315] mb-3">Email Us</h3>
              <p className="text-gray-600 mb-2">For inquiries and support:</p>
              <a
                href="mailto:support@suuqfuran.com"
                className="text-[#F05E23] font-semibold hover:underline text-lg"
              >
                support@suuqfuran.com
              </a>
              <p className="text-sm text-gray-500 mt-4">
                Response time: Within 2 hours
              </p>
            </div>

            {/* Phone */}
            <div className="bg-gray-50 p-8 rounded-lg border-l-4 border-[#F05E23]">
              <h3 className="text-xl font-bold text-[#3E2315] mb-3">Call Us</h3>
              <p className="text-gray-600 mb-2">Speak with our car specialists:</p>
              <a
                href="tel:+1234567890"
                className="text-[#F05E23] font-semibold hover:underline text-lg"
              >
                +1 (234) 567-890
              </a>
              <p className="text-sm text-gray-500 mt-4">
                Available: Mon-Sat, 9AM-6PM
              </p>
            </div>

            {/* Address */}
            <div className="bg-gray-50 p-8 rounded-lg border-l-4 border-[#F05E23]">
              <h3 className="text-xl font-bold text-[#3E2315] mb-3">Visit Us</h3>
              <p className="text-gray-600 mb-2">Our marketplace headquarters:</p>
              <p className="text-[#3E2315] font-semibold">
                123 Auto Plaza Drive<br />
                Suite 200<br />
                Detroit, MI 48201
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Test drive available by appointment
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#F05E23] to-[#3E2315] text-white p-8 md:p-12 rounded-lg text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Buy or Sell?
            </h2>
            <p className="text-gray-100 mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers on SUUQFURAN. Whether you're looking for your next vehicle or want to sell yours, we're here to make it seamless.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#F05E23] font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition">
                Browse Cars
              </button>
              <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-[#F05E23] transition">
                Sell Your Car
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#3E2315] mb-12 text-center">
            Common Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                q: "How do I list my car for sale?",
                a: "Simply create an account, upload photos and details, and your listing goes live within hours.",
              },
              {
                q: "Is SUUQFURAN secure for transactions?",
                a: "Yes, we use encrypted payments and verified seller badges to ensure safe buying and selling.",
              },
              {
                q: "Can I negotiate prices on the platform?",
                a: "Absolutely! Our messaging system allows direct communication between buyers and sellers.",
              },
              {
                q: "What's the best time to buy a car?",
                a: "Contact us for market insights and find the perfect vehicle at the right price for your budget.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg">
                <h3 className="font-bold text-[#3E2315] mb-2">{item.q}</h3>
                <p className="text-gray-600 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}