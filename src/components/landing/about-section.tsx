export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white" aria-labelledby="about-heading">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-24 items-start max-w-7xl mx-auto">
          {/* Heading Column */}
          <div className="flex-1">
            <h2 id="about-heading" className="text-[30px] leading-[40px] font-medium text-zinc-900 tracking-[-0.75px] max-w-sm">
              A Word About Us and Our Mission
            </h2>
          </div>

          {/* Description Column */}
          <div className="flex-1">
            <p className="text-xl leading-7 font-medium text-zinc-500 tracking-[-0.5px]">
              Lorem ipsum dolor sit amet consectetur. Turpis bibendum eget adipiscing scelerisque proin. Neque tincidunt et pellentesque proin. Quam non tortor sed mauris libero bibendum malesuada. Mi id et fermentum venenatis eu
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
