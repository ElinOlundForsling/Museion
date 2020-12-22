import React, { useEffect } from 'react';
import Widget from '../layout/Widget';
import { getClassmates } from '../../state/actions/classActions';
import { useStateValue } from '../../state/state';

const Classmates = () => {
  const [
    {
      profile: { classN },
      class: { classmates },
    },
    dispatch,
  ] = useStateValue();

  useEffect(() => {
    if (classN) {
      getClassmates(dispatch, classN);
    }
  }, [classN]);

  return (
    <Widget heading='Classmates' className='classmates-component'>
      {classmates && (
        <ul>
          {classmates.map(user => {
            return (
              <li key={user.id}>
                <img
                  src={user.imgUrl}
                  alt={user.firstName}
                  className='img-tiny'
                />
                {user.firstName} {user.lastName}
              </li>
            );
          })}
        </ul>
      )}
    </Widget>
  );
};

export default Classmates;
