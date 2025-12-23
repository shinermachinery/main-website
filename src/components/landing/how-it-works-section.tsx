export function HowItWorksSection() {
  const steps = [
    {
      number: 'Step 1',
      title: 'Consultation',
      description: 'Align requirements & goals',
    },
    {
      number: 'Step 2',
      title: 'Custom Configuration',
      description: 'Tailored machine design',
    },
    {
      number: 'Step 3',
      title: 'Installation & Training',
      description: 'Ready-to-operate, supported',
    },
  ]

  return (
    <section className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16 gap-6">
            <h2 className="text-[32px] leading-[42px] font-normal text-gray-900 tracking-[-0.5px]">
              How It Works
            </h2>
            <button className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white text-sm font-medium rounded-full hover:bg-teal-700 transition-colors self-start md:self-auto">
              Schedule a Demo
            </button>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {steps.map((step) => (
              <div key={step.number} className="space-y-4">
                <div className="text-sm font-normal text-teal-600">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-sm font-normal text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
