import React from 'react';
import Loading from './LoadingScreen';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import EmbeddedApp from './EmbeddedApp';

const ProjectGallery = ({ apiUrl }) => {
  const { projectSlug } = useParams();
  const [project, setProjectFields] = useState([]);
  const [isLoaded, setLoadStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${apiUrl}project?slug=${projectSlug}&acf_format=standard&_embed`, {
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
    return <Loading />;
  }

  return (
    <section className='projectGalleryPiece'>
      {project.map((project) => (
        <article key={project.id}>
          <div className='max-w-5xl lg:py-20 lg:m-auto p-4 tablet:p-8 h-screen'>
            <Link to={`/#${projectSlug}`} className='ml-4 text-white link-with-arrow'>
              Back to Home
            </Link>
            <div id='summary-content z-50'>
              <h2 className='font-bold text-3xl m-4'>{project.title.rendered}</h2>
              <div className='h-px w-full bg-gradient-to-r from-transparent via-white to-transparent'>
                <div className='h-full bg-gradient-to-r from-neutrals-100/30 via-neutrals-100 to-neutrals-100/30'></div>
              </div>
              <p className='m-4'>{project.acf.project_gallery_summary}</p>
              {project._embedded?.['acf:attachment']?.map((attachment) => (
                attachment.media_type === "image" ? (
                  <img
                    src={attachment.source_url}
                    alt={attachment.alt_text || 'Gallery Image'}
                    className=' z-30 '
                    loading='eager'
                  />
                ) : (
                  <video
                    src={attachment.source_url}
                    alt={attachment.title.rendered || 'Gallery Video'}
                    className='w-4/5 md:w-3/5 m-auto max-h-screen'
                    loading='eager'
                    autoPlay
                    controls
                    muted
                  />
                )
              ))}
              {projectSlug === "science-scramble" && <EmbeddedApp />}
            </div>
            <div>
              {project._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                <img
                  src={project._embedded['wp:featuredmedia'][0].source_url}
                  alt={project.title.rendered}
                  className='object-cover object-center h-full w-full inset-0 absolute -z-50 gallery-brightness'
                  loading='eager'
                />
              )}
              <div className="absolute top-0 left-0 w-full h-full bg-[#0a0a19] opacity-50 -z-40"></div>
              
              
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default ProjectGallery;
