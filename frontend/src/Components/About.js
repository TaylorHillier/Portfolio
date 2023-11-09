import {useState, useEffect} from 'react';

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