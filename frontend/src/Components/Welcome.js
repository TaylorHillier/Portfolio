import {useState, useEffect} from 'react';

function WelcomePage({apiUrl}) {
    const [homeFields, setHomeFields] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        fetch(`${apiUrl}pages/21`, {
            headers:{
                Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojg4ODgvcG9ydGZvbGlvIiwiaWF0IjoxNjk4NzA1NDI1LCJuYmYiOjE2OTg3MDU0MjUsImV4cCI6MTY5OTMxMDIyNSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.l1XebrZSpe3Dhmucipq1NI94AIzjFyTu1LVAXNyXUDU",
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

    console.log(homeFields);
    return(
        <div  className='welcome' id='welcome'>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
            <div className='p-4 h-screen flex'> 
                <div className='my-60'>
                    <p>{homeFields.acf.text_area_1}</p>
                    <h1 className='text-lg font-bold'>{homeFields.acf.keyword_1}</h1>
                    <p>{homeFields.acf.text_area_2}</p>
                    <h1 className='text-lg font-bold'>{homeFields.acf.keyword_2}</h1>
                    <p>{homeFields.acf.text_area_3}</p>
                    <button className='mr-4 border-solid border-black border-2 p-2'>{homeFields.acf.first_cta}</button>
                    <button className='border-solid border-black border-2 p-2'>{homeFields.acf.second_cta}</button>
                </div> 
            </div>
            )}
        </div>
    )
}

export default WelcomePage;