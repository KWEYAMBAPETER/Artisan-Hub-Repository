import React from 'react';

const About = () => {
  const cards = [
    {
      title: "The Artisan Difference",
      content: "Unlike mass-produced goods, our creations bear the subtle imperfections that make them perfect. When you purchase from Artisan Hub, you're not just buying a product - you're acquiring a piece of someone's life work. Our makers spend 50-300 hours on average perfecting each item, blending ancestral methods with contemporary design."
    },
    {
      title: "Our Heritage",
      content: "Artisan Hub began as a social enterprise connecting rural craftspeople with global markets through cutting-edge e-commerce tools. What started as 8 test artisans has grown to 1,000+ creators across 23 countries. Our proprietary 'Fair Pay Calculator' ensures makers earn 3-5x local averages, while blockchain authentication guarantees every purchase directly supports the hands that made it."
    },
    {
      title: "Sustainable Craftsmanship",
      content: "We champion slow creation over fast fashion. Our artisans use sustainably harvested materials - from reclaimed teak wood to organic dyes. Every purchase supports eco-conscious practices that leave lighter footprints. Last year alone, we diverted 5 tons of materials from landfills through our upcycling initiatives."
    },
    {
      title: "Global Traditions-Local Impact",
      content: "From Local woodcarvers to global weavers, we've connected with over 47 indigenous communities across 6 continents. Your support directly funds apprenticeship programs - we've trained 100+ young artisans in endangered crafts, keeping rare artistic traditions alive."
    },
    {
      title: "The Human Touch",
      content: "Meet Peter - Our Ugandan ceramicist who sings while throwing clay. Or Rajesh, whose family has crafted bronze deities for generations. These aren't anonymous creators; they're artists who sign their work and share their stories through personalized maker profiles on every product page.."
    },
    {
      title: "Your Curated Experience",
      content: "Our team of cultural anthropologists and design experts hand-select every piece in our collection. We reject 83% of submissions, ensuring only exceptional quality reaches you. Enjoy white-glove concierge service for custom commissions - whether you need a 10-foot handwoven tapestry or bespoke dinnerware for 12."
    }
  ];

  return (
    <section className="py-12">
      <h2
        id="about-us"
        className="text-4xl md:text-5xl lg:text-6xl text-4xl font-bold text-center text-amber-600 leading-tight mb-12"
      >
        About Us
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="card max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <h5 className="self-center text-2xl font-bold whitespace-wrap text-amber-800 dark:text-white">
              {card.title}
            </h5>
            <div className="card-content">
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {card.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;