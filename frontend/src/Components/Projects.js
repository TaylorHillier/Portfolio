import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import UseReveal from './Reveal';
import {Link} from 'react-router-dom';

function ProjectData({ apiUrl }) {
  const [projects, setProjects] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(`${apiUrl}project?_embed`, {
          headers: {
            Authorization:
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojg4ODgvcG9ydGZvbGlvIiwiaWF0IjoxNzAwMjUwMTAyLCJuYmYiOjE3MDAyNTAxMDIsImV4cCI6MTcwMDg1NDkwMiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.n7YwwJRY-3KJ725uHmouA2_fHj8GBx2LOi16yKtuP_8',
          }})
          if(response.ok){
            const data = await response.json();
            setProjects(data);
            setLoadStatus(true);
          } else {
            setLoadStatus(false);
          }

    };
    fetchData();
  }, [apiUrl]);


  const TabContent = ({ project }) => {
    const [activeTab, setActiveTab] = useState('summary');
    const [showFullSummary, setShowFullSummary] = useState(false);
    const summaryRef = useRef(null);

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
      <div className='tab-container my-4'>
        <div className='tabs'>
          <div
            className={`tab ${activeTab === 'summary' ? 'active' : ''}  hover:scale-105 hover:text-white`}
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

        <div className='tab-content-container md:w-[40vw]'>
          <div className={`tab-content  ${activeTab === 'summary' ? 'active' : ''}`}>
            {showFullSummary ? (
              <div className='backdrop-brightness-90 p-4 shadow-lg shadow-slate-400'>
                <PlainTextToHTML plainText={project.acf.project_summary} />
                <button
                  onClick={toggleSummary}
                  className='flex text-sm m-auto border-solid border p-2 mt-4 bg-white text-[#151d1f] font-bold hover:scale-105'
                >
                  Read Less
                </button>
              </div>
            ) : (
              <div className='backdrop-brightness-90 p-4 shadow-lg shadow-slate-400 md:flex md:flex-col md:justify-between md:min-h-[30vh]'>
                <PlainTextToHTML plainText={project.acf.project_summary.substring(0, 250) + '....'} />
                <button
                  onClick={toggleSummary}
                  className='flex text-sm mx-auto border-solid border p-2 mt-4 bg-white text-[#151d1f] font-bold hover:scale-105'
                >
                  Read More
                </button>
              </div>
            )}
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
    { isLoaded && 
      <section className='relative projects z-10 bg-gradient-to-t from-[#0a0a19] via-[#151d1f] to-[#70828F] p-2 md:p-[5vw] md:pt-[15vw] md:mb-0 m' id='projects'>
        <h1 className='border-solid border max-w-fit p-2 m-auto font-thin shine'>PROJECTS</h1>
        <div className='projectArticles md:grid md:grid-cols-2 md:gap-[5vw] mt-[10vh]'>
        {projects.map((project) => (
            <article key={project.id} className='my-16 reveal fade-bottom  md:m-auto md:items-top md:my-0' id={project.slug}>
                <h2 className=' font-bold text-3xl mb-4 md:min-h-[8vh]'>{project.title.rendered}</h2>
                <div className='flex items-center gap-4 my-4 '>
                  {project.acf.github_link != "" &&
                    <a href={project.acf.github_link} className='flex gap-1 hover:scale-105 hover:text-white hover:underline hover:font-semibold'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill='white' viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    <p>Github Repo</p>
                  </a>
                    }
                  {project.slug != 'portfolio' &&
                    <Link to={`/project/${project.slug}`} className='flex gap-1 hover:scale-105 hover:text-white hover:underline hover:font-semibold'>
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill='white' fill-rule="evenodd" clip-rule="evenodd"><path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z"/></svg>
                        <p>Project Gallery</p>
                    </Link>
                  } 
              </div>
              <div className='h-px w-full bg-gradient-to-r from-transparent via-white to-transparent'>
                <div className='h-full bg-gradient-to-r from-neutrals-100/30 via-neutrals-100 to-neutrals-100/30'></div>
              </div>
              <TabContent key={project.id} project={project} />
            </article>
        ))}
        </div>
      </section>
    }
    </>
  );
}

export default ProjectData;
