import React from 'react';
import Loading from './LoadingScreen';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProjectGallery = ({ apiUrl }) => {
  // Render the detailed view of the selected project
  const { projectSlug } = useParams();
  const [project, setProjectFields] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);

  console.log(`${apiUrl}project?slug=${projectSlug}&_embed`);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${apiUrl}project?slug=${projectSlug}&_embed`, {
        headers: {
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojg4ODgvcG9ydGZvbGlvIiwiaWF0IjoxNzAwMjUwMTAyLCJuYmYiOjE3MDAyNTAxMDIsImV4cCI6MTcwMDg1NDkwMiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.n7YwwJRY-3KJ725uHmouA2_fHj8GBx2LOi16yKtuP_8',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProjectFields(data);
        setLoadStatus(true);
      } else {
        setLoadStatus(false);
      }
    };

    fetchData();
  }, [apiUrl, projectSlug]);

  if (!isLoaded) {
    return <Loading />; // or any other loading indicator
  }

  return (
    <section className='projectGalleryPiece'>
      {project.map((project) => (
        <article key={project.id} className='lg:py-40 max-w-7xl lg:m-auto p-8 mt-24'>
          <Link to={`/#${projectSlug}`} className='ml-4 text-white link-with-arrow'>
            Back to Home
          </Link>
          <div id='summary-content'>
            <h2 className=' font-bold text-3xl m-4'>{project.title.rendered}</h2>
            <div className='h-px w-full bg-gradient-to-r from-transparent via-white to-transparent'>
                <div className='h-full bg-gradient-to-r from-neutrals-100/30 via-neutrals-100 to-neutrals-100/30'></div>
            </div>
            <p className='m-4'>{project.acf.project_gallery_summary}</p>
          </div>
          <div className=''>
            {project._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
              <img
                src={project._embedded['wp:featuredmedia'][0].source_url}
                alt={project.title.rendered}
                className='object-cover object-center h-full w-full inset-0 absolute -z-50 gallery-brightness'
                loading='eager'
              />
            )}
             <div className="absolute top-0 left-0 w-full h-full bg-[#0a0a19] opacity-50 -z-50"></div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default ProjectGallery;
