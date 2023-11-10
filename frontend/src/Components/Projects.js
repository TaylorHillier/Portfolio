import {useState, useEffect} from 'react';

function ProjectData({apiUrl}) {
    const [projects, setProjects] = useState([]);

    useEffect(() => {

        fetch(`${apiUrl}project?_embed`, {
            headers:{
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojg4ODgvcG9ydGZvbGlvIiwiaWF0IjoxNjk5NTY3MzU5LCJuYmYiOjE2OTk1NjczNTksImV4cCI6MTcwMDE3MjE1OSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.o-OPTTyhRY3IMzIq0JJvY6lDd49WmaRAiv0HtRW1DbU",
            },
        })
            .then((response) => response.json())
            .then((data) => setProjects(data))
            .catch((error) => console.error('Error fetching data:', error));

    }, [apiUrl]);

    return(
        <div className='projects py-8 bg-white text-black' id='projects'>
            <h1 className='border-solid border-2 border-black max-w-fit p-1 rounded m-4'>Projects</h1>
            <ul className='project-list'>
                {projects.map((project) => (
                    <li key={project.id} className=''>
                        <h2>{project.title.rendered}</h2>
                        <img src={project._embedded['wp:featuredmedia'][0].source_url}/>
                        <p className=''>{project.acf.project_skills}</p>
                        <p className='m-8'>{project.acf.project_summary}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProjectData;