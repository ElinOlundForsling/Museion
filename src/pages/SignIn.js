import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import firebase from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const signIn = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password);
};

const SignIn = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [user, loading, error] = useAuthState(firebase.auth());

  const handleInputChange = e => {
    e.persist();
    setCredentials(credentials => ({
      ...credentials,
      [e.target.name]: e.target.value,
    }));
  };

  if (user) {
    // TODO: Add auth to state
    return <Redirect to='/dashboard' />;
  }

  const handleSubmit = e => {
    e.preventDefault();
    signIn(credentials.email, credentials.password);
  };

  return (
    <div className='form-container'>
      <div className='form'>
        {loading && <p className='message'>Signing in...</p>}
        {error && <p className='message'>Error signing in</p>}
        <form className='login-form' onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='email'
            name='email'
            onChange={handleInputChange}
            value={credentials.email}
          />
          <input
            type='password'
            placeholder='password'
            name='password'
            onChange={handleInputChange}
            value={credentials.password}
          />
          <button>Sign in</button>
          <p className='message'>
            Not registered? <Link to='/signup'>Create an account</Link>
          </p>
        </form>
        <p></p>
      </div>
    </div>
  );
};

export default SignIn;
