
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import Contact from '../components/Contact';
import Journey from '../components/Journey';

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