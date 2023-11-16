import React, {useEffect, useState} from "react";
import ProjectData from "./Components/Projects";
import WelcomePage from "./Components/Welcome";
import AboutPage from "./Components/About";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";

function App() {
  const wpApiUrl = 'http://localhost:8888/portfolio/wp-json/wp/v2/';
  const [contentRendered, setContentRendered] = useState(false);

  useEffect(() => {

    setTimeout(() => {
      setContentRendered(true);
    }, 1500);
  }, []);

  return (
    <div className="site-wrapper m-auto flex flex-col min-h-screen">
       {contentRendered && (
        <div className="navbar z-50 fixed bottom-0 w-full md:top-0">
          <Nav />
        </div>
      )}
      <div className="content">
        <WelcomePage apiUrl={wpApiUrl}/>
        {contentRendered && (
        <AboutPage apiUrl={wpApiUrl}/>
        )}
        {contentRendered && (
        <ProjectData apiUrl={wpApiUrl}/>
        )}
        {contentRendered && (
        <Footer/>
        )}
      </div>
    </div>
  );
}

export default App;
