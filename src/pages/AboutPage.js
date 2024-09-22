import React, { useState, useEffect, useRef } from 'react';
import Banner from '../components/UserComponents/Banner';
import AboutUs from '../components/UserComponents/About/AboutUs';
import Footer from '../components/UserComponents/Footer/footer';
import Loading from '../components/UserComponents/Loading'; // Import the Loading spinner component

const AboutPage = () => {
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const isFirstRender = useRef(true); // Track if this is the first render (mount)

  useEffect(() => {
    if (isFirstRender.current) {
      // If it's the first render, show the loading spinner
      const timer = setTimeout(() => {
        setLoading(false); // Hide loading after content is "loaded"
        isFirstRender.current = false; // Mark that the component has loaded once
      }, 2000); // Adjust the timeout for your loading time

      // Cleanup the timer on component unmount
      return () => clearTimeout(timer);
    } else {
      // If the component has already rendered before, don't show the loading spinner
      setLoading(false);
    }
  }, []);

  // If loading is true, show the spinner
  if (loading) {
    return <Loading />;
  }

  // Once loading is false, show the actual page content
  return (
    <div>
      <Banner />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default AboutPage;
