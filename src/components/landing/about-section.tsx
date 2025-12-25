export function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 md:py-32 bg-gray-50"
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
                className="text-[32px] leading-[42px] font-normal text-gray-900 tracking-[-0.5px] max-w-sm"
              >
                A Word About Us and Our Mission
              </h2>
            </div>

            {/* Description Column */}
            <div className="flex-1">
              <p className="text-base leading-relaxed font-normal text-gray-600 tracking-normal">
                Lorem ipsum dolor sit amet consectetur. Turpis bibendum eget
                adipiscing scelerisque proin. Neque tincidunt et pellentesque
                proin. Quam non tortor sed mauris libero bibendum malesuada. Mi
                id et fermentum venenatis eu
              </p>
            </div>
          </div>

          {/* Built to Perform, Built to Last Section */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-start">
            {/* Tagline Column */}
            <div className="flex-1">
              <h3 className="text-[28px] leading-[38px] font-normal text-gray-900 tracking-[-0.5px] max-w-sm">
                Built to Perform
                <br />
                Built to Last
              </h3>
            </div>

            {/* Features Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                {/* Feature 1 */}
                <div className="space-y-3">
                  <div className="w-6 h-6 text-teal-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.867 19.125h.008v.008h-.008v-.008Z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    Highest Precision Components
                  </h4>
                  <p className="text-sm leading-relaxed font-normal text-gray-600">
                    engineered for accurate, consistent performance.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="space-y-3">
                  <div className="w-6 h-6 text-teal-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    24/7 Support & Service
                  </h4>
                  <p className="text-sm leading-relaxed font-normal text-gray-600">
                    engineered for accurate, consistent performance.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="space-y-3">
                  <div className="w-6 h-6 text-teal-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                      />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    Productivity Focused
                  </h4>
                  <p className="text-sm leading-relaxed font-normal text-gray-600">
                    engineered for accurate, consistent performance.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="space-y-3">
                  <div className="w-6 h-6 text-teal-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                      />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    Global Reach, Local Support
                  </h4>
                  <p className="text-sm leading-relaxed font-normal text-gray-600">
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
