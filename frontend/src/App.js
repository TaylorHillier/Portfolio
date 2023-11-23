import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ProjectData from './Components/Projects';
import WelcomePage from './Components/Welcome';
import AboutPage from './Components/About';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import ProjectGallery from './Components/ProjectGallery';

const App = () => {
  const wpApiUrl = 'http://localhost:8888/portfolio/wp-json/wp/v2/';

  return (
    <Router>
      <div className="site-wrapper m-auto flex flex-col" id='top-of-content'>
        <div className="navbar z-50 fixed bottom-0 w-full md:top-0 md:bottom-full">
          <Nav />
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={
              <Fragment>
                  <WelcomePage apiUrl={wpApiUrl} />
                  <AboutPage apiUrl={wpApiUrl} />
                  <ProjectData apiUrl={wpApiUrl} />
                  <Footer />
              </Fragment>
              }>
              </Route>
              <Route path="/project/:projectSlug" element={<ProjectGallery apiUrl={wpApiUrl} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
