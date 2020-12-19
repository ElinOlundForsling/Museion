import React from 'react';
import { useStateValue } from '../../state/state';
import { RiDashboardLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { VscAccount } from 'react-icons/vsc';
import {
  BiSend,
  BiCalendarPlus,
  BiAtom,
  BiBold,
  BiCubeAlt,
} from 'react-icons/bi';

const Sidebar = () => {
  const [{}, dispatch] = useStateValue();
  return (
    <div
      onMouseOver={() => dispatch({ type: 'open' })}
      onMouseLeave={() => dispatch({ type: 'closed' })}>
      <ul className='side-menu'>
        <li>
          <Link to='/'>
            <RiDashboardLine className='sidebar-icon' />
            &nbsp; Dashboard
          </Link>
        </li>
        <li>
          <Link to='/'>
            <BiAtom className='sidebar-icon' />
            &nbsp; <span>Classroom</span>
          </Link>
        </li>
        <li>
          <Link to='/'>
            <BiSend className='sidebar-icon' />
            &nbsp; Submit Work
          </Link>
        </li>
        <li>
          <Link to='/'>
            <BiBold className='sidebar-icon' />
            &nbsp; Grades
          </Link>
        </li>
        <li>
          <Link to='/'>
            <BiCalendarPlus className='sidebar-icon' />
            &nbsp; Calendar
          </Link>
        </li>
        <li>
          <Link to='/'>
            <VscAccount className='sidebar-icon' />
            &nbsp; Profile
          </Link>
        </li>
        <li>
          <Link to='/'>
            <BiCubeAlt className='sidebar-icon' />
            &nbsp; Teacher's panel
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
