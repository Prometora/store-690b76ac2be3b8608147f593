import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
}

export default function Hero({
  title,
  subtitle,
  buttonText = "Get Started",
  buttonLink = "#",
  backgroundImage,
}: HeroProps) {
  return (
    <section
      className="relative py-20 px-4 text-center"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundColor: backgroundImage ? undefined : "#f9fafb",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/40" />
      )}

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${backgroundImage ? "text-white" : "text-gray-900"}`}>
          {title}
        </h1>

        {subtitle && (
          <p className={`text-xl md:text-2xl mb-8 ${backgroundImage ? "text-white" : "text-gray-600"}`}>
            {subtitle}
          </p>
        )}

        {buttonText && buttonLink && (
          <Link
            href={buttonLink}
            className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}
