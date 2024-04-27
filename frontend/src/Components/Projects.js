import React, { useState, useEffect, useRef } from 'react';
import UseReveal from './Reveal';
import { Link } from 'react-router-dom';

function ProjectData({ apiUrl }) {
  const [projects, setProjects] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);
  const [announcement, setAnnouncement]  = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${apiUrl}project?_embed`);
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
        setLoadStatus(true);
      } else {
        setLoadStatus(false);
      }
    };
    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      const response = await fetch(`${apiUrl}pages/161`);
      if (response.ok) {
        const data = await response.json();
        setAnnouncement(data);
      } 
    };
    fetchAnnouncement();
  }, [apiUrl]);

  const TabContent = ({ project }) => {
    const [activeTab, setActiveTab] = useState('summary');
    const [showFullSummary, setShowFullSummary] = useState(false);

    const toggleSummary = () => {
      setShowFullSummary(!showFullSummary);
    };

    const PlainTextToHTML = ({ plainText }) => {
      if (typeof plainText === 'object' && plainText.__html) {
        return <div dangerouslySetInnerHTML={plainText} id="summary-content" />;
      }

      const htmlContent = `<p>${plainText}</p>`;

      return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    };

    UseReveal();

    return (
      <div className="tab-container my-4">
        <div className="tabs">
          <div
            className={`tab ${activeTab === 'summary' ? 'active' : ''} hover:scale-105 hover:text-white`}
            onClick={() => setActiveTab('summary')}
          >
            <button>Summary</button>
          </div>

          <div
            className={`tab ${activeTab === 'skills' ? 'active' : ''} hover:scale-105 hover:text-white`}
            onClick={() => setActiveTab('skills')}
          >
            <button>Skills</button>
          </div>
        </div>

        <div className="tab-content-container ">
          <div className={`tab-content ${activeTab === 'summary' ? 'active' : ''}`}>
         
              <div className="backdrop-brightness-90 p-4 shadow-lg md:shadow-slate-400">
                <PlainTextToHTML plainText={project.acf.project_summary} />
               
              </div>
           
          </div>

          <p className={`tab-content ${activeTab === 'skills' ? 'active' : ''} p-8 backdrop-brightness-90 shadow-lg shadow-slate-400`}>
            {project.acf.project_skills.map((skill) => (
              <li key={skill.skill_used}>{skill.skill_used}</li>
            ))}
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      {isLoaded && (
        <section className="relative projects z-10 bg-gradient-to-t pt-[10vw] from-[#0a0a19] via-[#151d1f] to-[#70828F] p-4 md:p-[5vw] md:pt-[10vw] md:mb-0" id="projects">
          <div className='projects-content m-auto max-w-[75rem]'>
            <div className=' m-auto max-w-[70vw]'>
              <h1 className="border-solid border max-w-fit p-2 m-auto font-thin shine ">PROJECTS</h1>
              {announcement && (
              <h2 className="text-xl reveal fade-bottom mx-auto text-center lg:text-left m-32">
                {announcement.acf && announcement.acf.announcement}
                {announcement.acf && announcement.acf.project_link && (
                  <Link to={`/project/${announcement.acf.href_for_link}`} className='text-[#0a0a19] hover:text-white hover:scale-110'>
                    {announcement.acf.project_link}
                  </Link>
                )}
                {announcement.acf && announcement.acf.announcement_2}
              </h2>)}
            </div>
            <div className="projectArticles md:grid xl:grid-cols-2 md:gap-[5rem] mt-[10vh]">
              {projects.map((project) => (
                <article key={project.id} className="my-16 reveal fade-bottom  md:items-top md:my-0" id={project.slug}>
                  <h2 className="font-bold text-3xl mb-4 md:min-h-[8vh]">{project.title.rendered}</h2>
                  <div className="flex items-center gap-4 my-4">
                    {project.acf.github_link !== "" && (
                      <a
                        href={project.acf.github_link}
                        className="flex gap-1 hover:scale-105 hover:text-white hover:underline hover:font-semibold"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <p>Github Repo</p>
                      </a>
                    )}
                    {project.acf.site_link.link_text !== "" && (
                      <a
                      className="flex gap-1 hover:scale-105 hover:text-white hover:underline hover:font-semibold"
                      href={project.acf.site_link.link_href} aria-label={project.acf.site_link.aria_label} target="_blank" rel='noreferrer'>
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" fill="white" clip-rule="evenodd"><path d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z"/></svg>
                        <p>{project.acf.site_link.link_text}</p>
                      </a>
                    )}
                    {project.slug !== 'portfolio' && (
                      <Link
                        to={`/project/${project.slug}`}
                        className="flex gap-1 hover:scale-105 hover:text-white hover:underline hover:font-semibold"
                      >
                        <svg
                          width="24"
                          height="24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="white"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                        >
                          <path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z" />
                        </svg>
                        <p>Project Gallery</p>
                      </Link>
                    )}
                  </div>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent">
                    <div className="h-full bg-gradient-to-r from-neutrals-100/30 via-neutrals-100 to-neutrals-100/30"></div>
                  </div>
                  <TabContent key={project.id} project={project} />
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ProjectData;
