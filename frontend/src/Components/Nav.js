import { useState, useEffect } from 'react';
import LogoLarge from './LogoLargeScreen';
import { useLocation } from 'react-router-dom';
function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 80);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const location = useLocation();

  const isGalleryPage = location.pathname.startsWith('/project/');

  return (
    <nav
      className={`text-white min-h-20 lg:flex lg:flex-row-reverse lg:justify-around lg:max-w-[80vw] lg:m-auto lg:justify-items-center lg:p-2 lg:rounded-full lg:items-center ${
        isScrolled ? 'bg-[#70828F] lg:bg-[#0a0a19] lg:border-[#0a0a19] lg:border-2 transition duration-300 ease-in-out opacity-95' : 'bg-transparent'
      }`}
    >
      <ul className='md:flex md:justify-evenly text-white grid grid-cols-3 justify-items-center'>
        <NavItem to="/#about" icon="about" label="About" />
        <NavItem to="/#projects" icon="projects" label="Projects" />
        <NavItem to="/#contact" icon="contact" label="Contact" />
      </ul>
      <a href='#top-of-content' className='hidden lg:block'>
        <LogoLarge />
      </a>
    </nav>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <li className='p-4 text-sm font-thin w-full hover:scale-110 lg:hover:scale-100 hover:bg-[#0a0a19] lg:hover:bg-transparent'>
      <a href={to} className='flex-col flex items-center justify-items-center scroll-to lg:hover:font-bold lg:hover:scale-110'  aria-label={label}>
        {renderIcon(icon)}
        {label}
      </a>
    </li>
  );
}

function renderIcon(icon) {
  switch (icon) {
    case 'about':
      return (
        <svg width="24" className='lg:hidden' height="24" xmlns="http://www.w3.org/2000/svg" fill="white" fill-rule="evenodd" clip-rule="evenodd" aria-hidden='true'><path d="M12 0c-5.083 0-8.465 4.949-3.733 13.678 1.596 2.945-1.725 3.641-5.09 4.418-3.073.709-3.187 2.235-3.177 4.904l.004 1h23.99l.004-.969c.012-2.688-.093-4.223-3.177-4.935-3.438-.794-6.639-1.49-5.09-4.418 4.719-8.912 1.251-13.678-3.731-13.678m0 1c1.89 0 3.39.764 4.225 2.15 1.354 2.251.866 5.824-1.377 10.06-.577 1.092-.673 2.078-.283 2.932.937 2.049 4.758 2.632 6.032 2.928 2.303.534 2.412 1.313 2.401 3.93h-21.998c-.01-2.615.09-3.396 2.401-3.93 1.157-.266 5.138-.919 6.049-2.94.387-.858.284-1.843-.304-2.929-2.231-4.115-2.744-7.764-1.405-10.012.84-1.412 2.353-2.189 4.259-2.189"/></svg>
      );
    case 'projects':
      return (
        <svg width='24' className='lg:hidden' height='24' clip-rule="evenodd" fill="white" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden='true'><path d="m11.3 13.7c0-.53-.47-1-1-1h-7.3c-.53 0-1 .47-1 1v5.3c0 .53.47 1 1 1h7.3c.53 0 1-.47 1-1zm10.7 0c0-.53-.47-1-1-1h-7.3c-.53 0-1 .47-1 1v5.3c0 .53.47 1 1 1h7.3c.53 0 1-.47 1-1zm0-8.7c0-.53-.47-1-1-1h-7.3c-.53 0-1 .47-1 1v5.3c0 .53.47 1 1 1h7.3c.53 0 1-.47 1-1zm-10.7 0c0-.53-.47-1-1-1h-7.3c-.53 0-1 .47-1 1v5.3c0 .53.47 1 1 1h7.3c.53 0 1-.47 1-1z" fill-rule="nonzero"/></svg>
      );
    case 'contact':
      return (
        <svg width="24" height="24" className='lg:hidden' xmlns="http://www.w3.org/2000/svg" fill="white" fill-rule="evenodd" clip-rule="evenodd" aria-hidden='true'><path d="M24 21h-24v-18h24v18zm-23-16.477v15.477h22v-15.477l-10.999 10-11.001-10zm21.089-.523h-20.176l10.088 9.171 10.088-9.171z"/></svg>
      );
    default:
      return null;
  }
}

export default Nav;
