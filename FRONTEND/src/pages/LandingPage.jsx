
import { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import Contact from '../components/Contact.jsx';
import Journey from '../components/Journey.jsx';

function LandingPage() {
  useEffect(() => {
    // Initialize Flowbite for mobile menu
    if (typeof window !== 'undefined') {
      const init = async () => {
        const { Collapse, initTE } = await import("tw-elements");
        initTE({ Collapse });
      };
      init();
    }
  }, []);

  return (
    <div className="font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhyChooseUs />
        <Contact />
        <Journey />
      </main>
      <footer>
        {/* Footer content can be added here */}
      </footer>
    </div>
  );
}

export default LandingPage;