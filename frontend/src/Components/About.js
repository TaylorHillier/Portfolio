import {useState, useEffect} from 'react';
import TextTransition, {presets} from 'react-text-transition';

function AboutPage({apiUrl}) {
    const [aboutFields, setAboutFields] = useState([]);
 
    useEffect(() => {

        fetch(`${apiUrl}pages/38?acf_format=standard`, {
            headers:{
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojg4ODgvcG9ydGZvbGlvIiwiaWF0IjoxNzAwMjUwMTAyLCJuYmYiOjE3MDAyNTAxMDIsImV4cCI6MTcwMDg1NDkwMiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.n7YwwJRY-3KJ725uHmouA2_fHj8GBx2LOi16yKtuP_8",
            },
        })
            .then((response) => response.json())
            .then((data) => setAboutFields(data))
            .catch((error) => console.error('Error fetching data:', error));

    }, [apiUrl]);

    const keywords = [
        aboutFields.acf && aboutFields.acf.about_keyword_group && aboutFields.acf.about_keyword_group.about_keyword_1,
        aboutFields.acf && aboutFields.acf.about_keyword_group && aboutFields.acf.about_keyword_group.about_keyword_2,
        aboutFields.acf && aboutFields.acf.about_keyword_group && aboutFields.acf.about_keyword_group.about_keyword_3,
    ];

    const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);

    useEffect(() => {

        const intervalId = setInterval(() => {
            setCurrentKeywordIndex((prevIndex) => (prevIndex + 1) % keywords.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [keywords]);

    const PlainTextToHTML = ({ plainText }) => {
        // Check if plainText is an object with __html property
        if (typeof plainText === 'object' && plainText.__html) {
          return <div dangerouslySetInnerHTML={plainText} id="about-content" />;
        }
  
        // Convert plain text to HTML
        const htmlContent = `<p>${plainText}</p>`;
  
        return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
      };


    return(
        <div className='bg-gradient-to-b from-[#0a0a19] via-[#151d1f] to-[#191b25] text-white'>
            <img src={aboutFields.acf && aboutFields.acf.portrait} loading="lazy" alt="Photo of myself - Taylor Hillier"/>
            <div  className='about p-4  h-[80vh]' id="about"> 
                <h1 className='border-solid border border-white max-w-fit p-1 my-8 aboutHeader '>About</h1>
                <div id='aboutKeywordAnimation ' className='h-8'>
                    <TextTransition className='text-4xl' springConfig={presets.molasses}><h2>{keywords[currentKeywordIndex]}</h2></TextTransition>
                </div>
                <div className='aboutParagraph my-8'>
                  <PlainTextToHTML plainText={aboutFields.acf && aboutFields.acf.about_me_paragraph}/>
                </div>
                <div className='aboutMeSkills py-4'>
                    <p className='font-bold'>Some skills I have developed:</p>
                    <ul className='skills flex rounded shadow-lg shadow-gray-400 p-2 mt-4 mt-2 grid grid-cols-3 justify-items-center'>
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
        </div>
    )
}

export default AboutPage;