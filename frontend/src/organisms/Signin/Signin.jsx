/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import * as React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './SignIn.module.scss';

export default function Signin() {
  const navigate = useNavigate();
  const location = useLocation();
  const fromSignUp = location?.state?.fromSignUp;
  const unitAvailable = location?.state?.unitAvailable;
  const buildingName = location?.state?.buildingName;
  const listingId = location?.state?.listingId;

  const [inputs, setInputs] = useState({
    password: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    passwordError: '',
    emailError: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const validateFields = () => {
    const { email, password } = inputs;
    let isValid = true;

    const emailError = email.trim() === '' ? 'Email is required' : '';
    const passwordError = password.trim() === '' ? 'Password is required' : '';

    if (emailError || passwordError) {
      isValid = false;
    }

    setErrors({ emailError, passwordError });
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateFields()) {
      const { password, email } = inputs;
      const data = { email, password };
      axios.post('http://172.17.0.237:8074/auth/login', data).then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          sessionStorage.setItem('userCred', JSON.stringify(response?.data));
          if (fromSignUp) {
            navigate('/application', {
              state: { unitAvailable, buildingName, listingId },
            });
          } else if (response.data.role === 'Tenant') {
            const userId = response.data.id;
            console.log('userid', userId);
            navigate('/tenant', { state: { userId } });
            // navigate('/tenant', state: { userId: response.data.id});
          } else {
            navigate('/');
          }
        }
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.gradientBox}>
        <div className={styles.avatar}>
        </div>
        <h2>SIGN IN</h2>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label htmlFor="email" className={styles.label}>Email Address</label>
          <input
            className={styles.input}
            type="email"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            // autoFocus
            onChange={handleInputChange}
          />
          <span>{errors.emailError}</span>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            className={styles.input}
            type="password"
            id="password"
            label="Password"
            name="password"
            autoComplete="current-password"
            onChange={handleInputChange}
          />
          <span>{errors.passwordError}</span>
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className={styles.checkbox}
            />
            <label htmlFor="remember" className={styles.rememberLabel}>Remember me</label>
          </div>
          <button
            type="submit"
            className={styles.button}
          >
            Sign In
          </button>
          <button
            type="button"
            className={styles.linkToSignUp}
            onClick={() => navigate('/signup')}
          >
            Don't have an account? Sign Up
          </button>
        </form>
        <div className={styles.copyright}>
          Copyright © <strong>Shelter</strong> {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
