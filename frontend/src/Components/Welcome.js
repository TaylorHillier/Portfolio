import { useState, useLayoutEffect, useEffect } from 'react';
import Loading from './LoadingScreen';
import Logo from './Logo';

function WelcomePage({ apiUrl }) {
  const [homeFields, setHomeFields] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoaded, setLoadStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${apiUrl}pages/21`);
      if (response.ok) {
        const data = await response.json();
        setHomeFields(data);
        setLoadStatus(true);
      } else {
        setLoadStatus(false);
      }
    };
    fetchData();
  }, [apiUrl]);

  useLayoutEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {!isLoaded ? (
        <Loading />
      ) : (
        <section className="welcome lg:m-auto h-screen flex justify-center items-center sticky inset-0 z-10 bg-[#0a0a19]" id="welcome">
          <div className='max-w-[75rem]'>
            <div className="absolute top-[5vh] right-0 left-0 z-10 max-w-[80vw] max-h-20 m-auto md:hidden">
              <Logo />
            </div>
            <div className="welcomeContent  mt-0 m-auto md:mx-auto ">
              <div className="welcome-content-container tablet:p-4 text-center m-auto">
                {homeFields.acf?.home_page_repeater?.map((item, index) => (
                  <div key={index} className="md:grid md:grid-cols-9 md:grid-rows-1  md:justify-items-center lg:text-l">

                    <div className="welcomeText md:col-span-4   md:self-center m-4">
                     <p className='lg:text-lg'>{item.text_area_1}</p>
                    </div>

                    <div className="hidden w-px bg-gradient-to-b from-transparent via-white to-transparent md:block  ">
                      <div className="w-full bg-gradient-to-b from-neutrals-100/30 via-neutrals-100 to-neutrals-100/30"></div>
                    </div>

                    <div className="buttons flex flex-col my-8 w-full gap-4 md:my-12 md:col-span-4 md:gap-4 .revealing-object-middle" id="cta-buttons">
                      <div className='content-ctas group flex  justify-center'>
                        <a href="#projects" className='revealing-object border-solid px-4 py-2 font-bold text-[#0a0a19] bg-white group-hover:bg-transparent group-hover:text-white   tablet:w-4/5 text-center' aria-label='link to projects'>
                          {item.first_cta}
                        </a>

                        <a href="#about" className='revealing-object  border-solid text-white  px-4 py-2 group-hover:bg-white group-hover:text-[#0a0a19] group-hover:font-bold tablet:w-4/5  text-center border border-white' aria-label='link to about me section'>{item.second_cta}</a>
                      </div>
                      <div className="flex gap-2 justify-center  ">
                        <a href="https://www.linkedin.com/in/taylorchillier/"  aria-label="link to linkedin">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="36"
                            height="36 "
                            viewBox="0 0 24 24"
                            fill="white"
                            className="hover:scale-105"
                          >
                            <path d="M0 0v24h24v-24h-24zm8 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.397-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                        <a href="https://github.com/TaylorHillier"  aria-label="link to github">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="36"
                            height="36"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="hover:scale-105"
                          >
                            <path d="M0 0v24h24v-24h-24zm14.534 19.59c-.406.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.311-1.588-.824-2.147.083-.202.357-1.016-.079-2.117 0 0-.671-.215-2.198.82-.639-.18-1.323-.267-2.003-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-bounce animate-duration-5000 absolute bottom-28 left-0 right-0">
              <button className="flex m-auto">
                <a href="/#about" className="group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="white"
                    viewBox="0 0 24 24"
                    className="group-hover:scale-110"
                  >
                    <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
                  </svg>
                </a>
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default WelcomePage;
