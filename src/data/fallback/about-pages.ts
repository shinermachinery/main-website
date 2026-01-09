/**
 * Fallback data for about pages
 * Used when Sanity CMS data is unavailable
 *
 * Includes data for:
 * - Why Choose Us page
 * - Mission & Vision page
 * - Director page
 */

// Why Choose Us Page
export interface Reason {
  title: string;
  description: string;
  icon?: string;
  order?: number;
}

export interface WhyChooseUsData {
  title: string;
  subtitle: string;
  heroImage: string;
  reasons: Reason[];
}

export const whyChooseUsData: WhyChooseUsData = {
  title: "Why Choose Us",
  subtitle:
    "Lorem ipsum dolor sit amet consectetur. Luctus arcu congue dictumst ullamcorper purus",
  heroImage:
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=600&fit=crop&q=80",
  reasons: [
    {
      title: "Quality Assurance",
      description:
        "Our products meet the highest quality standards with rigorous testing and certification processes to ensure reliability and performance.",
      order: 1,
    },
    {
      title: "Expert Team",
      description:
        "Our experienced engineers and technicians provide comprehensive support from installation to maintenance, ensuring your operations run smoothly.",
      order: 2,
    },
    {
      title: "Innovation & Technology",
      description:
        "We leverage cutting-edge technology and continuous innovation to deliver state-of-the-art solutions that meet evolving industry demands.",
      order: 3,
    },
    {
      title: "Customer-Centric Approach",
      description:
        "Your success is our priority. We provide personalized solutions and dedicated support to help you achieve your business goals.",
      order: 4,
    },
    {
      title: "Competitive Pricing",
      description:
        "We offer premium quality equipment at competitive prices, ensuring excellent value for your investment without compromising on quality.",
      order: 5,
    },
    {
      title: "Global Reach",
      description:
        "With distributors worldwide and proven track record across diverse markets, we bring global expertise to your local operations.",
      order: 6,
    },
  ],
};

// Mission & Vision Page
export interface MissionVisionData {
  pageTitle: string;
  pageSubtitle: string;
  missionTitle: string;
  missionStatement: string;
  missionImage: string;
  visionTitle: string;
  visionStatement: string;
  visionImage: string;
}

export const missionVisionData: MissionVisionData = {
  pageTitle: "Our Mission & Vision",
  pageSubtitle:
    "Driving excellence in food processing technology and shaping the future of the industry",
  missionTitle: "Our Mission",
  missionStatement:
    "To provide innovative, reliable, and high-quality food processing equipment that empowers our clients to achieve operational excellence. We are committed to delivering solutions that enhance efficiency, ensure food safety, and drive sustainable growth for businesses worldwide.",
  missionImage:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80",
  visionTitle: "Our Vision",
  visionStatement:
    "To be the global leader in food processing technology, recognized for our unwavering commitment to innovation, quality, and customer success. We envision a future where our cutting-edge solutions set new industry standards and create lasting value for our partners, communities, and the environment.",
  visionImage:
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&q=80",
};

// Director Page
export interface DirectorData {
  pageTitle: string;
  pageSubtitle: string;
  name: string;
  title: string;
  image: string;
  bio: Array<{
    _type: string;
    children: Array<{
      _type: string;
      text: string;
    }>;
  }>;
  achievements: string[];
  email?: string;
  phone?: string;
  linkedin?: string;
}

export const directorData: DirectorData = {
  pageTitle: "About Our Director",
  pageSubtitle:
    "Meet the visionary leader driving SHINER's commitment to excellence and innovation",
  name: "John Doe",
  title: "Managing Director & CEO",
  image:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=800&fit=crop&q=80",
  bio: [
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text: "With over 25 years of experience in the food processing industry, John Doe has been instrumental in shaping SHINER into a global leader in manufacturing excellence. His vision and strategic leadership have driven the company's expansion across international markets while maintaining an unwavering commitment to quality and innovation.",
        },
      ],
    },
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text: "Under his guidance, SHINER has achieved numerous milestones, including the development of cutting-edge optical sorting technology and the establishment of strategic partnerships with leading food processing companies worldwide. His dedication to customer success and operational excellence has earned SHINER recognition as a trusted partner in the industry.",
        },
      ],
    },
  ],
  achievements: [
    "Led company growth from regional to global presence",
    "Pioneered innovative optical sorting technology",
    "Established partnerships with Fortune 500 companies",
    "Implemented sustainable manufacturing practices",
    "Recipient of Industry Innovation Award 2023",
  ],
  email: "director@shiner.com",
  phone: "+1 234 567 8900",
  linkedin: "https://linkedin.com/in/johndoe",
};
