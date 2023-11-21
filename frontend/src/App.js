import React, { useEffect, useState } from 'react';
import ProjectData from './Components/Projects';
import WelcomePage from './Components/Welcome';
import AboutPage from './Components/About';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Loading from './Components/LoadingScreen';

function App() {
  const wpApiUrl = 'http://localhost:8888/portfolio/wp-json/wp/v2/';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const welcomeResponse = await fetch(`${wpApiUrl}pages/21`);
        const aboutResponse = await fetch(`${wpApiUrl}pages/38?acf_format=standard`);
        const projectResponse = await fetch(`${wpApiUrl}project?_embed`);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Handle the error and still set loading to false
      }
    };

    fetchData();
  }, [wpApiUrl]);

  return (
    <div className="site-wrapper m-auto flex flex-col ">
      <div className="navbar z-50 fixed bottom-0 w-full md:top-0 md:bottom-full">
        <Nav />
      </div>
      <div className="content">
        {loading ? (
          <Loading />
        ) : (
          <>
            <WelcomePage apiUrl={wpApiUrl} />
            <AboutPage apiUrl={wpApiUrl} />
            <ProjectData apiUrl={wpApiUrl} />
            <Footer />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
