import {useState, useEffect} from 'react';
import ParticleBg from './ParticleBg';

function WelcomePage({apiUrl}) {
    const [homeFields, setHomeFields] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {

        fetch(`${apiUrl}pages/21`, {
            headers:{
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojg4ODgvcG9ydGZvbGlvIiwiaWF0IjoxNzAwMjUwMTAyLCJuYmYiOjE3MDAyNTAxMDIsImV4cCI6MTcwMDg1NDkwMiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.n7YwwJRY-3KJ725uHmouA2_fHj8GBx2LOi16yKtuP_8",
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
                <div className='welcomeContent max-w-lg m-4 mt-0 md:mx-auto'>
                    <div className='welcome-content-container py-60'>
                        <p className='py-2'>{homeFields.acf.text_area_1}</p>
                        <h1 className='text-3xl font-bold'>{homeFields.acf.keyword_1}</h1>
                        <p className='pt-2'>{homeFields.acf.text_area_2}</p>
                        <h1 className='text-3xl font-bold'>{homeFields.acf.keyword_2}</h1>
                        <p className='py-4'>{homeFields.acf.text_area_3}</p>
                        <div className='buttons flex flex-col' id='cta-buttons'>
                            <button className='my-2 border-solid border-black border-2 p-2 bg-black'><a href='#projects'>{homeFields.acf.first_cta}</a></button>
                            <button className='my-2 border-solid border-black border-2 p-2'><a href='#about'>{homeFields.acf.second_cta}</a></button>
                        </div>
                        <div className='flex gap-2 mt-4'>
                            <a><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36 " viewBox="0 0 24 24" fill="white"><path d="M0 0v24h24v-24h-24zm8 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.397-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                            <a><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="white"><path d="M0 0v24h24v-24h-24zm14.534 19.59c-.406.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.311-1.588-.824-2.147.083-.202.357-1.016-.079-2.117 0 0-.671-.215-2.198.82-.639-.18-1.323-.267-2.003-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z"/></svg></a>
                        </div>
                    </div>
                    <div className='absolute left-1/2 bottom-20 animate-bounce animate-duration-5000'>
                        <button>
                            <a href='/#about'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill='white' viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>
                            </a>
                        </button>
                    </div>
                </div> 
            </div>
            )}
            
        </div>
    )
}

export default WelcomePage;