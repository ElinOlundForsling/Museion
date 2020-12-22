import React from 'react';
import { useStateValue } from '../../state/state';
import { RiDashboardLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { VscAccount } from 'react-icons/vsc';
import {
  BiSend,
  BiChat,
  BiCalendarPlus,
  BiAtom,
  BiBold,
  BiCubeAlt,
  BiLogOut,
} from 'react-icons/bi';
import { BsChevronBarLeft, BsChevronBarRight } from 'react-icons/bs';
import firebase from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Sidebar = () => {
  const [user] = useAuthState(firebase.auth());
  const [
    {
      profile: { firstName, imgUrl, profileLoading },
      layout: { opened },
    },
    dispatch,
  ] = useStateValue();
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(dispatch({ type: 'sign_out' }));
  };

  return (
    <div
      onMouseOver={() => dispatch({ type: 'open' })}
      onMouseLeave={() => dispatch({ type: 'closed' })}>
      <ul className='side-menu'>
        <li>
          <table>
            <tbody>
              <tr>
                <td rowSpan='2'>
                  {opened ? (
                    <BsChevronBarLeft className='side-menu-icon' />
                  ) : (
                    <BsChevronBarRight className='side-menu-icon' />
                  )}
                </td>
                <td style={{ width: '200px' }}>
                  <img
                    src={imgUrl ? imgUrl : '/img/astronaut.png'}
                    alt='your profile image'
                    className='img-sidebar'
                  />
                </td>
              </tr>
              <tr>
                <td>
                  {profileLoading && 'loading...'}
                  {firstName && firstName}
                </td>
              </tr>
            </tbody>
          </table>
        </li>
        <li>
          <Link to='/dashboard'>
            <RiDashboardLine className='sidebar-icon' />
            &nbsp; Dashboard
          </Link>
        </li>
        <li>
          <Link to='/classroom'>
            <BiAtom className='sidebar-icon' />
            &nbsp; <span>Classroom</span>
          </Link>
        </li>
        <li>
          <Link to='/messages'>
            <BiChat className='sidebar-icon' />
            &nbsp; Messages
          </Link>
        </li>
        <li>
          <Link to='/submitwork'>
            <BiSend className='sidebar-icon' />
            &nbsp; Submit Work
          </Link>
        </li>
        <li>
          <Link to='/grades'>
            <BiBold className='sidebar-icon' />
            &nbsp; Grades
          </Link>
        </li>
        <li>
          <Link to='/calender'>
            <BiCalendarPlus className='sidebar-icon' />
            &nbsp; Calender
          </Link>
        </li>
        <li>
          <Link to={user ? `/profile/${user.uid}` : '/profile'}>
            <VscAccount className='sidebar-icon' />
            &nbsp; Profile
          </Link>
        </li>
        <li>
          <Link to='/teacherspanel'>
            <BiCubeAlt className='sidebar-icon' />
            &nbsp; Teacher's panel
          </Link>
        </li>
        <li>
          <a onClick={() => signOut()}>
            <BiLogOut className='sidebar-icon' />
            &nbsp; Sign Out
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
