import React from 'react';
import { useStateValue } from '../../state/state';
import { RiDashboardLine } from 'react-icons/ri';
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
          <a href='/'>
            <RiDashboardLine className='sidebar-icon' />
            &nbsp; Dashboard
          </a>
        </li>
        <li>
          <a href='/'>
            <BiAtom className='sidebar-icon' />
            &nbsp; Classroom
          </a>
        </li>
        <li>
          <a href='/'>
            <BiSend className='sidebar-icon' />
            &nbsp; Submit Work
          </a>
        </li>
        <li>
          <a href='/'>
            <BiBold className='sidebar-icon' />
            &nbsp; Grades
          </a>
        </li>
        <li>
          <a href='/'>
            <BiCalendarPlus className='sidebar-icon' />
            &nbsp; Calendar
          </a>
        </li>
        <li>
          <a href='/'>
            <VscAccount className='sidebar-icon' />
            &nbsp; Profile
          </a>
        </li>
        <li>
          <a href='/'>
            <BiCubeAlt className='sidebar-icon' />
            &nbsp; Teacher's panel
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
