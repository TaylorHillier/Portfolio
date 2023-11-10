import Hamburger from 'hamburger-react';
import { useState } from 'react';
function Nav() {

    const [isOpen, setOpen] = useState(false);

    const handleItemClick = () => {
        setOpen(false);
    }

    return (
    <div className='flex flex-col-reverse md:flex-row text-black'>
        <div className='md:hidden grid grid-cols-3 justify-items-center items-center m-2 rounded-full border-black border-2'>
            <div className='col-start-2 col-end-3'>
                <p>Taylor Hillier</p>
            </div>
            <div className='m-2 col-start-3 col-end-4'>
                <Hamburger toggled={isOpen} toggle={setOpen}/>
            </div>
        </div>
        <nav className={isOpen ? 'flex justify-end m-2' : 'hidden md:block md:w-full md:border-solid md:border-2 md:border-black md:rounded md:p-4 md:my-8'}>
            <ul className='md:flex md:justify-evenly'>
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