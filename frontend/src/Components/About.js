import {useState, useEffect} from 'react';
import { TypeAnimation } from 'react-type-animation';

function AboutPage({apiUrl}) {
    const [aboutFields, setAboutFields] = useState([]);
 
    useEffect(() => {

        fetch(`${apiUrl}pages/38`, {
            headers:{
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojg4ODgvcG9ydGZvbGlvIiwiaWF0IjoxNjk5NTY3MzU5LCJuYmYiOjE2OTk1NjczNTksImV4cCI6MTcwMDE3MjE1OSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.o-OPTTyhRY3IMzIq0JJvY6lDd49WmaRAiv0HtRW1DbU",
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
        <div className='bg-white text-black'>
        <div  className='about' id="about"> 
            <h1 className='border-solid border-2 border-black max-w-fit p-1 rounded'>About</h1>
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
        </div>
        </div>
    )
}

export default AboutPage;