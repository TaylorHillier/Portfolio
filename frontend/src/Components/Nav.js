import Hamburger from 'hamburger-react';
import { useState } from 'react';
function Nav() {

    const [isOpen, setOpen] = useState(false);
    const [color, setColor] = useState(false);

    const handleItemClick = () => {
        setOpen(false);
    };

    const changeNavColor = () => {
        window.scrollY >=80 ? setColor(true) : setColor(false);
    };
    window.addEventListener("scroll", changeNavColor);

    return (
    <div className='flex flex-col-reverse md:flex-row'>
        <div className={`md:hidden grid grid-cols-3 justify-items-end ${color ? ' bg-[#70828F] transition duration-300 ease-in-out' : 'bg-transparent'} border-1 text-white`}>
            <div className='col-start-2 col-end-3'>
              
            </div>
            <div className='m-4 col-start-3 col-end-4'>
                <Hamburger toggled={isOpen} toggle={setOpen}/>
            </div>
        </div>
        <nav className={isOpen ? 'flex justify-end m-2' : `hidden md:block md:m-auto md:w-full md:border-solid md:border-1 md:border-white md:rounded md:p-4 ${color ? 'bg-[#70828F] transition duration-300 ease-in-out' : 'bg-transparent'}`}>
            <ul className='md:flex md:justify-evenly text-white'>
                <li className='border-b-2 border-solid border-black' onClick={handleItemClick}>
                    <a href="/#welcome" className='hover:underline scroll-to'>Home</a>
                </li>
                <li className='border-b-2 border-solid border-black' onClick={handleItemClick}>
                    <a href="/#about" className='hover:underline scroll-to'>About</a>
                </li>
                <li className='border-b-2 border-solid border-black' onClick={handleItemClick}> 
                    <a href="/#projects" className='hover:underline scroll-to'>Projects</a>
                </li>
            </ul>
        </nav>
    </div>
    );
}

export default Nav;