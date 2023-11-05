import {useState, useEffect} from 'react';

function AboutPage({apiUrl}) {
    const [aboutFields, setAboutFields] = useState([]);

    useEffect(() => {

        fetch(`${apiUrl}pages/38`, {
            headers:{
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojg4ODgvcG9ydGZvbGlvIiwiaWF0IjoxNjk4NzA1NDI1LCJuYmYiOjE2OTg3MDU0MjUsImV4cCI6MTY5OTMxMDIyNSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.l1XebrZSpe3Dhmucipq1NI94AIzjFyTu1LVAXNyXUDU",
            },
        })
            .then((response) => response.json())
            .then((data) => setAboutFields(data))
            .catch((error) => console.error('Error fetching data:', error));

    }, [apiUrl]);

    return(
        <div  className='about' id="about"> 
            {aboutFields.acf && aboutFields.acf.about_keyword_group && aboutFields.acf.about_keyword_group.about_keyword_1 && (
                <p>{aboutFields.acf.about_keyword_group.about_keyword_1}</p>
            )}
            {aboutFields.acf && aboutFields.acf.about_keyword_group && aboutFields.acf.about_keyword_group.about_keyword_2 && (
                <p>{aboutFields.acf.about_keyword_group.about_keyword_2}</p>
            )}
            {aboutFields.acf && aboutFields.acf.about_keyword_group && aboutFields.acf.about_keyword_group.about_keyword_3 && (
                <p>{aboutFields.acf.about_keyword_group.about_keyword_3}</p>
            )}  
        </div>
    )
}

export default AboutPage;