import React, { useEffect, useState } from 'react';
import TextTransition, { presets } from 'react-text-transition';
import UseReveal from './Reveal';

function AboutPage({ apiUrl }) {
  const [aboutFields, setAboutFields] = useState([]);
  const keywords = [
    aboutFields.acf && aboutFields.acf.about_keyword_group && aboutFields.acf.about_keyword_group.about_keyword_1,
    aboutFields.acf && aboutFields.acf.about_keyword_group && aboutFields.acf.about_keyword_group.about_keyword_2,
    aboutFields.acf && aboutFields.acf.about_keyword_group && aboutFields.acf.about_keyword_group.about_keyword_3,
  ];
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);
  const [isLoaded, setLoadStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(`${apiUrl}pages/38?acf_format=standard`, {
          headers: {
            Authorization:
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojg4ODgvcG9ydGZvbGlvIiwiaWF0IjoxNzAwMjUwMTAyLCJuYmYiOjE3MDAyNTAxMDIsImV4cCI6MTcwMDg1NDkwMiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.n7YwwJRY-3KJ725uHmouA2_fHj8GBx2LOi16yKtuP_8',
          }})
          if(response.ok){
            const data = await response.json();
            setAboutFields(data);
            setLoadStatus(true);
          } else {
            setLoadStatus(false);
          }

    };
    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentKeywordIndex((prevIndex) => (prevIndex + 1) % keywords.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [keywords]);

  const PlainTextToHTML = ({ plainText }) => {
    if (typeof plainText === 'object' && plainText.__html) {
      return <div dangerouslySetInnerHTML={plainText} id="about-content" />;
    }

    const htmlContent = `<p>${plainText}</p>`;

    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  };

  UseReveal();

  return (
      <>
      { isLoaded && 
      <section className='relative z-10 bg-gradient-to-b from-[#151d1f] via-[#0a0a19] to-[#70828F] text-white'>
      <img src={aboutFields.acf && aboutFields.acf.portrait} loading="lazy" alt="Photo of myself - Taylor Hillier" />
      <div className='about p-4 h-[80vh]' id="about" role="region" aria-label="About Section">
        <h1 className='border-solid border border-gray-400 max-w-fit p-2 my-8 font-thin shine'>
          ABOUT
        </h1>
        <div id='aboutKeywordAnimation' className='h-8' aria-live="polite">
          <TextTransition className='text-4xl' springConfig={presets.molasses}>
            <h2>{keywords[currentKeywordIndex]}</h2>
          </TextTransition>
        </div>
        <div className='aboutParagraph my-8 reveal fade-bottom'>
          <PlainTextToHTML plainText={aboutFields.acf && aboutFields.acf.about_me_paragraph} />
        </div>
        <div className='aboutMeSkills py-4'>
          <p className='font-bold'>Some skills I have developed:</p>
          <ul className='skills rounded shadow-lg shadow-gray-400 p-2 mt-4  grid grid-cols-3 justify-items-center reveal fade-bottom'>
            {aboutFields.acf &&
              aboutFields.acf.skill_repeater &&
              aboutFields.acf.skill_repeater.map((skill, index) => (
                <li key={index} className='p-2'>
                  {skill.skill_group.skill_image && (
                    <img
                      src={skill.skill_group.skill_image}
                      alt={skill.skill_group.skill_label || `Skill ${index + 1}`}
                    />
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
      </section>
      }
      </>
  );
}

export default AboutPage;
