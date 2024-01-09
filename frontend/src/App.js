import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Helmet} from 'react-helmet';

import ProjectData from './Components/Projects';
import WelcomePage from './Components/Welcome';
import AboutPage from './Components/About';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import ProjectGallery from './Components/ProjectGallery';
import SkipToContent from './Components/SkipToContent';

const App = () => {
  const wpApiUrl = 'https://taylorhillier.com/wordpress/wp-json/wp/v2/';

  return (
    <Router basename='/'>
      <Fragment>
      <Helmet>
        <title>Taylor Hillier's Portfolio</title>
        <meta name="description" content="Taylor Hillier's Front-End Developer portfolio" />
        <meta name="keywords" content="Frontend, developer, React, JavaScript, Wordpress, Headless CMS" />
        <meta name="author" content="Taylor Hillier" />
        <meta property="og:type" content="website"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <meta name="theme-color" content="#0a0a19"></meta>
      </Helmet>
      <SkipToContent/>
          <div className="site-wrapper m-auto flex flex-col" id='top-of-content'>
            <div className="navbar z-50 fixed bottom-0 w-full md:top-4 md:bottom-full">
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
      </Fragment>
    </Router>
  );
};

export default App;
