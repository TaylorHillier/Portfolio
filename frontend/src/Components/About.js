import {useState, useEffect} from 'react';
import { TypeAnimation } from 'react-type-animation';

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

    return(
        <div className='bg-[#151f1e] text-white min-h-screen'>
            <img src={aboutFields.acf && aboutFields.acf.portrait}/>
            <div  className='about py-4' id="about"> 
                <h1 className='border-solid border-2 border-black max-w-fit p-1 rounded my-4'>About</h1>
                <TypeAnimation 
                sequence={[
                    keywords[0],
                    5000,
                    keywords[1],
                    5000,
                    keywords[2],
                    5000,
                ]}
                    speed={50}
                    repeat={Infinity}
                    style={{fontSize:'2em'}}
                
                />
                <p>{aboutFields.acf && aboutFields.acf.about_me_paragraph}</p>
                <div className='aboutMeSkills'>
                    <h3>Some skills I have developed:</h3>
                    <ul className='skills'>
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