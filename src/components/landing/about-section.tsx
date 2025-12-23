export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-background" aria-labelledby="about-heading">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Heading Column */}
          <div>
            <h2 id="about-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              A Word About Us and Our Mission
            </h2>
          </div>

          {/* Description Column */}
          <div className="space-y-6">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Turpis bibendum eget
              adipiscing scelerisque proin. Neque tincidunt et pellentesque
              proin. Quam non tortor sed mauris libero bibendum malesuada.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Mi id et fermentum venenatis eu. We are committed to delivering
              precision instruments that set industry standards for quality and
              reliability.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
