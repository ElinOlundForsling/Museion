import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from '../config/firebase';
import { signUp } from '../state/authActions';

const SignUp = () => {
  const [value, loading, error] = useCollection(
    firebase.firestore().collection('classes'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    class: '',
  });

  const handleInputChange = e => {
    e.persist();
    setCredentials(credentials => ({
      ...credentials,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(credentials);
    signUp(credentials);
  };

  return (
    <div className='form-container'>
      <div className='form'>
        <form className='register-form' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='first name'
            name='firstName'
            onChange={handleInputChange}
            value={credentials.firstName}
            required
          />
          <input
            type='text'
            placeholder='last name'
            name='lastName'
            onChange={handleInputChange}
            value={credentials.lastName}
            required
          />
          <input
            type='password'
            placeholder='password'
            name='password'
            onChange={handleInputChange}
            value={credentials.password}
            autoComplete='current-password'
            required
          />
          <input
            type='email'
            placeholder='email address'
            autoComplete='username'
            name='email'
            onChange={handleInputChange}
            value={credentials.email}
            required
          />
          {error && (
            <strong>
              Error getting the classes, try again later:{' '}
              {JSON.stringify(error)}
            </strong>
          )}
          {loading && <span>Classes Loading...</span>}
          {value && (
            <div>
              <select
                className='form-select'
                name='class'
                onChange={handleInputChange}>
                <option value='0' name='none'>
                  Select class:
                </option>
                {value.docs.map(doc => (
                  <option key={doc.id} value={doc.id}>
                    {doc.id}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button>Sign Up</button>
          <p className='message'>
            Already registered? <Link to='/'>Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
