import { useEffect, useState } from 'react';

const UseReveal = () => {
  const [reveals, setReveals] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      setReveals((prevReveals) =>
        prevReveals.map((element) => {
          const elementTop = element.getBoundingClientRect().top;
          const elementVisible = -300;

          if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
          } else {
            element.classList.remove('reveal');
          }

          return element;
        })
      );
    };

    const initializeReveals = () => {
      const newReveals = document.querySelectorAll('.reveal');
      setReveals(Array.from(newReveals));
    };

    initializeReveals();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return reveals;
};

export default UseReveal;

//code found on https://alvarotrigo.com/blog/css-animations-scroll/
