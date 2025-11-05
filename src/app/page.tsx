import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - AI will customize this */}
      <Hero
        title="Welcome to SUUQFURAN"
        subtitle="marketplace for buying and selling cars. use these colors : #F05E23 and #3E2315"
        buttonText="Get Started"
        buttonLink="/listings"
      />

      {/* Additional sections will be added by AI here */}

      <Footer />
    </main>
  );
}
