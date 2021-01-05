import React, { useState } from 'react';
import { CgClose, CgMenu } from 'react-icons/cg';
import { Link } from 'react-router-dom';

const Header = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  return (
    <div className='header'>
      <div className='logo-nav'>
        <ul className={click ? 'nav-options active' : 'nav-options'}>
          <li className='option' onClick={closeMobileMenu}>
            <Link to='/teacherspanel'>Classes</Link>
          </li>
          <li className='option' onClick={closeMobileMenu}>
            <Link to='/teacherspanel'>Notifications</Link>
          </li>
          <li className='option' onClick={closeMobileMenu}>
            <Link to='/teacherspanel'>Teams</Link>
          </li>
          <li className='option' onClick={closeMobileMenu}>
            <Link to='/teacherspanel'>Homework</Link>
          </li>
          <li className='option' onClick={closeMobileMenu}>
            <Link to='/teacherspanel'>Documents</Link>
          </li>
        </ul>
      </div>
      <div className='mobile-menu' onClick={handleClick}>
        {click ? (
          <CgClose className='menu-icon' />
        ) : (
          <CgMenu className='menu-icon' />
        )}
      </div>
    </div>
  );
};

export default Header;
