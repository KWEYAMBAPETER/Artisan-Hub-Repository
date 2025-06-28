
import { useEffect } from 'react';
import Navbar from '../assets/Components/Navbar';
import Hero from '../assets/Components/Hero';
import About from '../assets/Components/About';
import WhyChooseUs from '../assets/Components/WhyChooseUs';
import Contact from '../assets/Components/Contact';
import Journey from '../assets/Components/Journey';

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