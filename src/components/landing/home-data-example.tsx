/**
 * Example: Home Data Server Component
 * Shows how to use the home actions in a server component
 */

import { getAllHomeData } from "@/actions";

export async function HomePageDataExample() {
  // Fetch all home page data in a single request
  const { home, featuredProducts, teamMembers, testimonials } =
    await getAllHomeData();

  if (!home) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Home page content not available</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* About Section */}
      {home.wordAboutUsTitle && (
        <section className="space-y-4">
          <h2 className="text-3xl font-bold">{home.wordAboutUsTitle}</h2>
          {/* Render portable text content here */}
          {home.wordAboutUsDescription && (
            <div className="prose">
              {/* You would use a Portable Text renderer here */}
              <p className="text-muted-foreground">
                Content would be rendered here...
              </p>
            </div>
          )}
        </section>
      )}

      {/* Facts Section */}
      {home.facts && home.facts.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {home.fewMoreFactsTitle || "Few More Facts"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {home.facts.map((fact) => (
              <div key={fact._key} className="text-center">
                <div className="text-4xl font-bold text-blue-600">
                  {fact.number}
                </div>
                <div className="text-muted-foreground mt-2">{fact.text}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Steps Section */}
      {home.steps && home.steps.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{home.stepTitle || "Steps"}</h2>
          <div className="space-y-4">
            {home.steps.map((step) => (
              <div key={step._key} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">{step.number}</span>
                </div>
                <p className="text-muted-foreground">{step.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                className="border border-border rounded-lg p-4"
              >
                <h3 className="font-semibold">{product.title}</h3>
                {product.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {product.description}
                  </p>
                )}
                {product.price && (
                  <p className="text-lg font-bold mt-2">${product.price}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Team Members */}
      {teamMembers.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member._id} className="text-center">
                <h3 className="font-semibold">{member.name}</h3>
                {member.role && (
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                )}
                {member.bio && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {member.bio}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial._id}
                className="border border-border rounded-lg p-4"
              >
                <p className="text-muted-foreground italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="mt-4">
                  <p className="font-semibold">{testimonial.customerName}</p>
                  {testimonial.role && (
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  )}
                  {testimonial.rating && (
                    <div className="flex gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < testimonial.rating
                              ? "text-yellow-400"
                              : "text-muted"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
