/**
 * Fallback data for services page
 * Used when Sanity CMS data is unavailable
 */

export interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
}

export const dummyServices: Service[] = [
  {
    id: 1,
    title: "Training",
    description:
      "We organize online training to train customers on a particular technology or sector and develop your team's competence. Even our engineers visit the site for the installation of the machines or equipment's and teach the working and principle of the product.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80",
    slug: "training",
  },
  {
    id: 2,
    title: "Spare Parts and Materials",
    description:
      "Shiner helps keep your equipment in perfect condition with certified genuine components and spares. Spares are tested, verified, and come with applicable warranty. We maintain a stock of all critical spare parts to guarantee a quick response time. Maintenance contracts are provided as per the customer's requirements.",
    image:
      "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=600&h=400&fit=crop&q=80",
    slug: "spare-parts",
  },
  {
    id: 3,
    title: "After-Sale Service",
    description:
      "Our expert service engineers for different regions across India and abroad attend to calls promptly and efficiently. For in-time spares availability, we have distributors across the country & overseas. Our engineers are ready to visit the customer's facility to perform pre-emptive maintenance on the equipment. This minimizes unforeseen operational down time and ensures operator safety.",
    image:
      "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600&h=400&fit=crop&q=80",
    slug: "after-sale-service",
  },
  {
    id: 4,
    title: "Equipment Modernization",
    description:
      "We can help you extend life of your equipment, meet new regulatory standards, improve performance and enhance functionalities. All the new updates and new technology in the product would done as per customer need.",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop&q=80",
    slug: "equipment-modernization",
  },
  {
    id: 5,
    title: "Consultancy Services",
    description:
      "Trust Shiner expertise to help you maximize performance of your machine, implement good industrial practices and generate additional value for your operations and to increase your revenue.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80",
    slug: "consultancy-services",
  },
];
