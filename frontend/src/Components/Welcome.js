import {useState, useEffect} from 'react';
import ParticleBg from './ParticleBg';

function WelcomePage({apiUrl}) {
    const [homeFields, setHomeFields] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {

        fetch(`${apiUrl}pages/21`, {
            headers:{
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojg4ODgvcG9ydGZvbGlvIiwiaWF0IjoxNjk5NTY3MzU5LCJuYmYiOjE2OTk1NjczNTksImV4cCI6MTcwMDE3MjE1OSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.o-OPTTyhRY3IMzIq0JJvY6lDd49WmaRAiv0HtRW1DbU",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setHomeFields(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, [apiUrl]);

    useEffect(() => {
        const handleScroll = () => {
          setScrollPosition(window.scrollY);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    

    return(
        <div  className='welcome m-auto h-screen' id='welcome'>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
            <div className={`parallax`} > 
            <ParticleBg/>
                <div className='welcomeContent max-w-lg m-4'>
                    <div className='welcome-content-container py-60'>
                        <p className='py-2'>{homeFields.acf.text_area_1}</p>
                        <h1 className='text-3xl font-bold'>{homeFields.acf.keyword_1}</h1>
                        <p className='pt-2'>{homeFields.acf.text_area_2}</p>
                        <h1 className='text-3xl font-bold'>{homeFields.acf.keyword_2}</h1>
                        <p className='py-4'>{homeFields.acf.text_area_3}</p>
                        <div className='buttons flex flex-col' id='cta-buttons'>
                            <button className='my-2 border-solid border-black border-2 p-2'><a href='#projects'>{homeFields.acf.first_cta}</a></button>
                            <button className='my-2 border-solid border-black border-2 p-2'><a href='#about'>{homeFields.acf.second_cta}</a></button>
                        </div>
                    </div>
                </div> 
            </div>
            )}
            
        </div>
    )
}

export default WelcomePage;