import { PortableText } from "@portabletext/react";
import { Globe, Settings, TrendingUp, Wrench } from "lucide-react";

interface AboutSectionProps {
  title?: string;
  description?: any[];
}

export function AboutSection({ title, description }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="w-full space-y-16 lg:space-y-24"
      aria-labelledby="about-heading"
    >
      {/* Mission Statement */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Heading Column */}
        <div className="flex-1">
          <h2
            id="about-heading"
            className="text-2xl font-medium text-foreground max-w-sm"
          >
            {title || "A Word About Us and Our Mission"}
          </h2>
        </div>

        {/* Description Column */}
        <div className="flex-1">
          {description && description.length > 0 ? (
            <div className="text-lg font-medium text-muted-foreground">
              <PortableText value={description} />
            </div>
          ) : (
            <p className="text-lg font-medium text-muted-foreground">
              At Shiner Machinery, we design and deliver precision-engineered
              machines that empower manufacturers to build faster, smarter, and
              more efficiently. Backed by decades of expertise, our commitment
              to quality and innovation drives everything we do.
            </p>
          )}
        </div>
      </div>

      {/* Built to Perform, Built to Last Section */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Tagline Column */}
        <div className="flex-1">
          <h3 className="text-2xl font-medium text-primary max-w-sm">
            Built to Perform
            <br />
            Built to Last
          </h3>
        </div>

        {/* Features Grid */}
        <div className="flex-1">
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Feature 1 */}
              <div className="bg-background rounded-2xl p-4 flex flex-col gap-4">
                <div className="w-6 h-6 text-primary">
                  <Wrench className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-medium text-primary">
                    Highest Precision Components
                  </h4>
                  <p className="text-sm font-medium text-muted-foreground">
                    Engineered to meet tight tolerances for accurate, consistent
                    performance every cycle.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-background rounded-2xl p-4 flex flex-col gap-4">
                <div className="w-6 h-6 text-primary">
                  <Settings className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-medium text-primary">
                    24/7 Support & Service
                  </h4>
                  <p className="text-sm font-medium text-muted-foreground">
                    Round-the-clock technical assistance to keep your operations
                    running without interruption.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-background rounded-2xl p-4 flex flex-col gap-4">
                <div className="w-6 h-6 text-primary">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-medium text-primary">
                    Productivity Focused
                  </h4>
                  <p className="text-sm font-medium text-muted-foreground">
                    Solutions designed to maximize output and minimize downtime
                    across your production line.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="bg-background rounded-2xl p-4 flex flex-col gap-4">
                <div className="w-6 h-6 text-primary">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-medium text-primary">
                    Global Reach, Local Support
                  </h4>
                  <p className="text-sm font-medium text-muted-foreground">
                    Serving clients worldwide with dedicated local service teams
                    and rapid response times.
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
