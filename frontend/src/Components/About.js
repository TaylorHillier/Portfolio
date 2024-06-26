import React, { useEffect, useState } from 'react';
import UseReveal from './Reveal';
import { TypeAnimation } from 'react-type-animation';
import { useLoading } from './LoadingContext'; // Ensure the path is correct

function AboutPage({ apiUrl }) {
  const [aboutFields, setAboutFields] = useState([]);
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);
  const { isLoading, setLoading } = useLoading(); // Use global loading state

  const keywords = [
    aboutFields.acf && aboutFields.acf.about_keyword_group && aboutFields.acf.about_keyword_group.about_keyword_1,
    aboutFields.acf && aboutFields.acf.about_keyword_group && aboutFields.acf.about_keyword_group.about_keyword_2,
    aboutFields.acf && aboutFields.acf.about_keyword_group && aboutFields.acf.about_keyword_group.about_keyword_3,
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      const response = await fetch(`${apiUrl}pages/38?acf_format=standard`);
      if (response.ok) {
        const data = await response.json();
        setAboutFields(data);
        setLoading(false); // Stop loading
      } else {
        setLoading(false); // Stop loading even on failure
      }
    };
    fetchData();
  }, [apiUrl, setLoading]);

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
        {isLoading ? (
          <p>Loading...</p>
        ) : (
        <section className=" relative z-10 bg-gradient-to-b from-[#151d1f] via-[#0a0a19] to-[#70828f] tablet:from-[#0a0a19] tablet:via-[#151d1f] tablet:to-[#70828F] text-white w-full" id="about">
          <div className='max-w-[75rem] m-auto py-8'>
            <div className=" tablet:items-center max-h-full m-auto md:p-8  flex flex-col gap-12  tablet:px-8 md:max-w-[75rem] ">
              <div className="about p-4 tablet:p-0 reveal fade-bottom tablet:px-4 tablet:col-span-3 md:col-span-2 md:col-start-2 tablet:col-start-1 tablet:row-start-1 md:row-start-1" id="about-content">
                <h1 className="border-solid border border-gray-400 max-w-fit p-2 shine bg-[#70828f]">ABOUT</h1>
                <div id="aboutKeywordAnimation" className="h-8 lg:text-3xl lg:my-12" aria-live="polite">
                  <TypeAnimation
                    sequence={[
                      keywords[0],
                      4000,
                      keywords[1],
                      4000,
                      keywords[2],
                      4000,
                    ]}
                    wrapper="span"
                    speed={30}
                    style={{ fontSize: '2em', display: 'inline-block' }}
                    repeat={Infinity}
                  />
                </div>
                <div className="aboutParagraph my-8 reveal fade-bottom md:text-lg md:mr-8 ">
                  <PlainTextToHTML plainText={aboutFields.acf && aboutFields.acf.about_me_paragraph} />
                </div>
              </div>
              <div className="aboutMeSkills py-4 md:py-0 tablet:row-start-2 md:row-start-2 tablet:col-span-3 p-4 w-full">
                <p className="font-bold reveal fade-bottom md:text-2xl">Some skills I have developed:</p>
                <ul className="skills rounded shadow-lg shadow-gray-400 p-2 mt-4 grid grid-cols-4 lg:justify-items-start justify-items-center reveal fade-bottom">
                  {aboutFields.acf &&
                    aboutFields.acf.skill_repeater &&
                    aboutFields.acf.skill_repeater.map((skill, index) => (
                      <li key={index} className="p-2 lg:flex lg:justify-center lg:items-center lg:gap-1">
                        {skill.skill_group.skill_image && (
                          <img
                            src={skill.skill_group.skill_image}
                            alt={skill.skill_group.skill_label || `Skill ${index + 1}`}
                            loading='lazy'
                            className='m-auto'
                          />
                        )}
                        <p className='hidden md:block text-center'>{skill.skill_group.skill_label || `Skill ${index + 1}`}</p>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent">
              <div className="h-full bg-gradient-to-r from-neutrals-100/30 via-neutrals-100 to-neutrals-100/30"></div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default AboutPage;
