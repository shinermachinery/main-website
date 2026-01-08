import { Settings, TrendingUp, Wrench, Globe } from "lucide-react";
import { PortableText } from "@portabletext/react";

interface AboutSectionProps {
  title?: string;
  description?: any[];
}

export function AboutSection({ title, description }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="py-24 md:py-32"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Mission Statement */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-start">
            {/* Heading Column */}
            <div className="flex-1">
              <h2
                id="about-heading"
                className="text-[32px] leading-[42px] font-normal text-foreground tracking-[-0.5px] max-w-sm"
              >
                {title || "A Word About Us and Our Mission"}
              </h2>
            </div>

            {/* Description Column */}
            <div className="flex-1">
              {description && description.length > 0 ? (
                <div className="text-base leading-relaxed font-normal text-muted-foreground tracking-normal">
                  <PortableText value={description} />
                </div>
              ) : (
                <p className="text-base leading-relaxed font-normal text-muted-foreground tracking-normal">
                  Precision-engineered components and solutions built to perform and built to last.
                </p>
              )}
            </div>
          </div>

          {/* Built to Perform, Built to Last Section */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-start">
            {/* Tagline Column */}
            <div className="flex-1">
              <h3 className="text-[28px] leading-[38px] font-normal text-primary tracking-[-0.5px] max-w-sm">
                Built to Perform
                <br />
                Built to Last
              </h3>
            </div>

            {/* Features Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                {/* Feature 1 */}
                <div className="space-y-3 bg-background">
                  <div className="w-6 h-6 text-brand-green">
                  <Wrench className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-semibold text-primary">
                    Highest Precision Components
                  </h4>
                  <p className="text-sm leading-relaxed font-normal text-muted-foreground">
                    engineered for accurate, consistent performance.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="space-y-3 bg-background">
                  <div className="w-6 h-6 text-brand-green">
                   <Settings className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-semibold text-primary">
                    24/7 Support & Service
                  </h4>
                  <p className="text-sm leading-relaxed font-normal text-muted-foreground">
                    engineered for accurate, consistent performance.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="space-y-3 bg-background">
                  <div className="w-6 h-6 text-brand-green">
                  <TrendingUp className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-semibold text-primary">
                    Productivity Focused
                  </h4>
                  <p className="text-sm leading-relaxed font-normal text-muted-foreground">
                    engineered for accurate, consistent performance.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="space-y-3 bg-background">
                  <div className="w-6 h-6 text-brand-green">
                  <Globe className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-semibold text-primary">
                    Global Reach, Local Support
                  </h4>
                  <p className="text-sm leading-relaxed font-normal text-muted-foreground">
                    engineered for accurate, consistent performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
