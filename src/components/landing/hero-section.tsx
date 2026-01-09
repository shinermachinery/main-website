import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-secondary dark:bg-zinc-950 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Decorative Background Pattern */}
      <div
        className="absolute inset-0 opacity-10 dark:opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(42, 94, 152, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(24, 183, 90, 0.2) 0%, transparent 50%)`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 leading-tight">
            <span className="text-foreground dark:text-white">
              Precision Engineering Machinery,
            </span>
            <br />
            <span className="text-foreground dark:text-white">Delivered With</span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2a5e98] to-[#18b75a]">
              Confidence
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground dark:text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
            Shiner brings you laboratory-grade precision instruments engineered
            for accuracy, built to perform, and designed to last.
          </p>

          {/* CTA Button */}
          <button
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full h-12 font-medium text-sm leading-5 text-white transition-all hover:scale-105"
            style={{
              background:
                "linear-gradient(88.66deg, #2a5e98 27.51%, #18b75a 115.04%)",
              boxShadow: "inset 0px 4px 28.9px 0px rgba(244, 244, 245, 0.2)",
            }}
          >
            <span>Explore Products</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
