import { useState, useEffect, useRef } from 'react';
import UseReveal from './Reveal';

function ProjectData({ apiUrl }) {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    fetch(`${apiUrl}project?_embed`, {
      headers: {
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojg4ODgvcG9ydGZvbGlvIiwiaWF0IjoxNzAwMjUwMTAyLCJuYmYiOjE3MDAyNTAxMDIsImV4cCI6MTcwMDg1NDkwMiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.n7YwwJRY-3KJ725uHmouA2_fHj8GBx2LOi16yKtuP_8',
      },
    })
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [apiUrl]);

  const TabContent = ({ project }) => {
    const [activeTab, setActiveTab] = useState('summary');
    const [showFullSummary, setShowFullSummary] = useState(false);
    const summaryRef = useRef(null);

    useEffect(() => {
      // Check if the summary content overflows its container
      if (summaryRef.current) {
        if (summaryRef.current.scrollHeight > summaryRef.current.clientHeight) {
          setShowFullSummary(false);
        } else {
          setShowFullSummary(true);
        }
      }
    }, [project.acf.project_summary]);

    const toggleSummary = () => {
      setShowFullSummary(!showFullSummary);
    };

    //allow myself to format textarea using <br>
    const PlainTextToHTML = ({ plainText }) => {
      // Check if plainText is an object with __html property
      if (typeof plainText === 'object' && plainText.__html) {
        return <div dangerouslySetInnerHTML={plainText} id="summary-content" />;
      }

      // Convert plain text to HTML
      const htmlContent = `<p>${plainText}</p>`;

      return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    };

    UseReveal();

    
    return (
      <div>
        <div className='tabs'>

          <div
            className={`tab ${activeTab === 'summary' ? 'active' : ''} `}
            onClick={() => setActiveTab('summary')}
          >

            <button>Summary</button>

          </div>

          <div
            className={`tab ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >

            <button>Skills</button>

          </div>

          <div className='flex w-full justify-end gap-2 items-center'>

            <a><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="white"><path d="M0 0v24h24v-24h-24zm14.534 19.59c-.406.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.311-1.588-.824-2.147.083-.202.357-1.016-.079-2.117 0 0-.671-.215-2.198.82-.639-.18-1.323-.267-2.003-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z"/></svg></a>

          </div>

        </div>

        <div className='tab-content-container'>

          <div className={`tab-content ${activeTab === 'summary' ? 'active' : ''}`}>

          {showFullSummary ? (

                <div className=' backdrop-brightness-90 p-8 shadow-lg shadow-slate-400'>
                  <PlainTextToHTML plainText={project.acf.project_summary} />
                  <button onClick={toggleSummary} className='flex text-sm m-auto border-solid border p-2 mt-4 rounded bg-white text-[#151d1f] font-bold'>Read Less</button>
                </div>
          
            ) : (

                <div className='backdrop-brightness-90 p-4 shadow-lg shadow-slate-400'>
                    <PlainTextToHTML plainText={project.acf.project_summary.substring(0, 250)} />
                  <button onClick={toggleSummary} className='flex text-sm m-auto border-solid border p-2 mt-4 rounded bg-white text-[#151d1f] font-bold'>Read More</button>
                </div>

            )}
          </div>

          <p className={`tab-content ${activeTab === 'skills' ? 'active' : ''} p-8 backdrop-brightness-90 shadow-lg shadow-slate-400`}>
            
            {project.acf.project_skills.map((skill) => (
              <li key={skill.id}>
                {skill.skill_used}
              </li>
            ))} 

          </p>

        </div>

      </div>
    );
  };

  return (
    <div className='projects bg-gradient-to-t from-[#0a0a19] via-[#151d1f] to-[#191b25]  mb-20 p-4 md:mb-0' id='projects'>
    <h1 className='border-solid border border-white max-w-fit p-1 m-auto projectsHeader reveal fade-bottom'>Projects</h1>
    <h2 className=' text-md text font-bold my-16 mx-8 reveal fade-bottom'>Here's some of the work I've done (so far).</h2>
    <div className='reveal fade-bottom'>
      <ul className='project-list '>
        {projects.map((project) => (
          <li key={project.id} className='my-16'>
            <h2 className='text-center font-bold text-xl m-4 font-semibold'>{project.title.rendered}</h2>
            <div className='mb-4 '>
              {project._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                  <img
                    src={project._embedded['wp:featuredmedia'][0].source_url}
                    alt={project.title.rendered}
                    className='mb-4'
                    loading='lazy'
                  />
              )}
              <TabContent key={project.id} project={project} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
}

export default ProjectData;
