import React, { useState } from 'react';
import { CgClose, CgMenu } from 'react-icons/cg';

const Header = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  return (
    <div className='header'>
      <div className='logo-nav'>
        <ul className={click ? 'nav-options active' : 'nav-options'}>
          <li className='option' onClick={closeMobileMenu}>
            <a href='#'>Classes</a>
          </li>
          <li className='option' onClick={closeMobileMenu}>
            <a href='#'>Notifications</a>
          </li>
          <li className='option' onClick={closeMobileMenu}>
            <a href='#'>Teams</a>
          </li>
          <li className='option' onClick={closeMobileMenu}>
            <a href='#'>Homework</a>
          </li>
          <li className='option' onClick={closeMobileMenu}>
            <a href='#'>Documents</a>
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
