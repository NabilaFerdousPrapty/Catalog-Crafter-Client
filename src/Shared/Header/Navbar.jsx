import  { useState } from 'react';
import { CiLogin } from 'react-icons/ci';
import logo from '../../assets/catalogLogo.png'
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/UseAuth';
import { Link as Linking, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
 const {
  user,LogOut,
 }=useAuth();
  return (
    <nav className="relative ">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <a href="#">
            <img className="w-auto h-14 " src={logo} alt="" />
          </a>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-600  rounded dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`text-center  absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out  md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center ${
            isOpen ? 'translate-x-0 opacity-100 bg-slate-600 rounded-md text-gray-50 ' : 'opacity-0 -translate-x-full'
          }`}
        >
          <div className="flex flex-col md:flex-row md:mx-6">
            <Link
              className="my-2  transition-colors duration-300 transform  hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0 border-b-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400"
              to={'/'}
            >
              Home
            </Link>
            <Linking
            spy={true} 
            smooth={true} 
            offset={50} 
            duration={500} 
              className="my-2  transition-colors duration-300 transform  hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0 border-b-2 border-transparent hover:border-blue-500 dark:h over:border-blue-400"
              to={'shop'}
            >
              Shop
            </Linking>
           
          </div>

          <div className="flex justify-center md:block">
            {
              user ? 
              <details className="dropdown">
              <summary className="btn mx-0 px-1 py-1 rounded">
              
                <img  className='w-auto h-10 rounded-full' 
                src={user.photoURL} alt="" />
              
              </summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><a>
                  <button onClick={LogOut} >Logout</button>

                  </a></li>
                <li><a> Profile</a></li>
              </ul>
            </details>
              :
              <Link
              to={'/login'}
              className="px-4 py-2 mt-4 text-sm font-medium  bg-blue-500 rounded-md md:mt-0 md:ml-4 md:px-3 md:py-2 md:text-sm md:font-semibold md:bg-transparent md:border md:border-blue-500 md:hover:bg-blue-500 md:hover:text-white text-black"
            >
              <CiLogin className="inline-block w-6 h-6" />
              <span className="ml-2">Login</span>
            </Link>
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
