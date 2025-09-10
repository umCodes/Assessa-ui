import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const [showNav, setShowNav] = useState(false);
  const {user, logOutUser} = useContext(AuthContext);
  
  const toggleNav = () => {
    setShowNav(!showNav);
  };
  
  const mobileNavLinkStyle = 'md:border-0 md:m-0 md:p-0 md:w-auto border border-zinc-200 m-0 p-2 w-full block md:inline';
  
  return (
    <nav className='flex items-center ml-auto'>
      {/* Desktop navigation */}
      <div className={`
        hidden md:flex items-center p-2 mx-4 gap-8
      `}>      
        <Link to={'/lab'}>Lab</Link>    
        <Link to={'/history'}>History</Link>    
        <Link to={'/feedback'}>Feedback</Link>
        {user && <button onClick={logOutUser} className={mobileNavLinkStyle + ' text-red-500 text-md font-bold'}>
            Log Out <FontAwesomeIcon icon={faRightFromBracket}/>
        </button>}
      </div>
      
      {/* Mobile navigation */}
      <div className={`
        md:hidden
        flex flex-col
        absolute top-[100%] right-0
        w-[45vw] min-w-[200px]
        bg-white
        transition-all duration-300
        origin-top-right
        z-10
        ${showNav ? "scale-100 opacity-100" : "scale-0 opacity-0"}
      `}>      
        <Link className={mobileNavLinkStyle} onClick={toggleNav} to={'/lab'}>Lab</Link>    
        <Link className={mobileNavLinkStyle} onClick={toggleNav} to={'/history'}>History</Link>    
        <Link className={mobileNavLinkStyle} onClick={toggleNav} to={'/feedback'}>Feedback</Link>
        {user && <button onClick={logOutUser} className={mobileNavLinkStyle + ' text-red-500 text-md font-bold'}>
            Log Out <FontAwesomeIcon icon={faRightFromBracket}/>
        </button>}
      </div>
      

      
      {/* Get Started button for non-logged users */}
      {!user && (
          <Link
            className='bg-[#f24c7c] text-white p-1.5 rounded-md text-md font-semibold whitespace-nowrap'
            to={'/register'}
          >
            Get Started
          </Link>
      )}
     
      {/* Mobile menu toggle */}
      <button 
        onClick={toggleNav} 
        className='md:hidden mx-2 text-lg transition-all duration-200'
      >
        {showNav ? '×' : '☰'}
      </button>
    </nav>
  )
}

export default NavBar