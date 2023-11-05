import {useState, useEffect} from 'react';

function ProjectData({apiUrl}) {
    const [projects, setProjects] = useState([]);

    useEffect(() => {

        fetch(`${apiUrl}project?_embed`, {
            headers:{
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojg4ODgvcG9ydGZvbGlvIiwiaWF0IjoxNjk4NzA1NDI1LCJuYmYiOjE2OTg3MDU0MjUsImV4cCI6MTY5OTMxMDIyNSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.l1XebrZSpe3Dhmucipq1NI94AIzjFyTu1LVAXNyXUDU",
            },
        })
            .then((response) => response.json())
            .then((data) => setProjects(data))
            .catch((error) => console.error('Error fetching data:', error));

    }, [apiUrl]);

    return(
        <div className='projects' id='projects'>
            <ul className='project-list m-4'>
                {projects.map((project) => (
                    <li key={project.id} className='py-8'>
                        <h2>{project.title.rendered}</h2>
                        <img src={project._embedded['wp:featuredmedia'][0].source_url}/>
                        <p className=''>{project.acf.project_summary}</p>
                        <p className=''>{project.acf.project_skills}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProjectData;