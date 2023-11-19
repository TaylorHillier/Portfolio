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
        }, 8000);

        return () => clearInterval(intervalId);
    }, [keywords]);

    return(
        <div className='bg-gradient-to-r from-[#151f1e] via-[#151d1f] to-[#191b25] h-screen text-whit min-h-screen'>
            <img src={aboutFields.acf && aboutFields.acf.portrait}/>
            <div  className='about p-4' id="about"> 
                <h1 className='border-solid border border-white max-w-fit p-1 rounded my-4 aboutHeader'>About</h1>
                <h2 >
                    <TextTransition springConfig={presets.wobbly}>{keywords[currentKeywordIndex]}</TextTransition>
                </h2>
                <p className='mb-12'>{aboutFields.acf && aboutFields.acf.about_me_paragraph}</p>
                <div className='aboutMeSkills py-4'>
                    <h3>Some skills I have developed:</h3>
                    <ul className='skills flex'>
                        {aboutFields.acf &&
                            aboutFields.acf.skill_repeater &&
                            aboutFields.acf.skill_repeater.map((skill, index) => (
                            <li key={index}>
                                {skill.skill_group.skill_image && (
                                <img
                                    src={skill.skill_group.skill_image}
                                    alt={`Skill ${index + 1}`}
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