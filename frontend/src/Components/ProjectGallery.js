import React from 'react';
import Loading from './LoadingScreen';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
    <div className='bg-[#0a0a19] h-screen'>
      {project.map((project) => (
        <article key={project.id} className=''>
          <h2 className=' font-bold text-3xl mb-4 font-semibold'>{project.title.rendered}</h2>
          <div className='h-px w-full bg-gradient-to-r from-transparent via-white to-transparent'>
            <div className='h-full bg-gradient-to-r from-neutrals-100/30 via-neutrals-100 to-neutrals-100/30'></div>
          </div>
          <div className='my-4'>
            {project._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
              <img
                src={project._embedded['wp:featuredmedia'][0].source_url}
                alt={project.title.rendered}
                className='mb-4'
                loading='lazy'
              />
            )}
          </div>
        </article>
      ))}
    </div>
  );
};

export default ProjectGallery;
