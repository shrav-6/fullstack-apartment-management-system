/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.scss';

const usernameRegex = /^[a-zA-Z]\w{7,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

function Signup() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    userName: '',
    password: '',
    password1: '',
    email: '',
    role: '',
    apartmentNumber: '',
    buildingName: '',
    phoneNumber: '',
    address: '',
    name1: '',
    showFields: false,
  });

  const [errors, setErrors] = useState({
    usernameError: '',
    passwordError: '',
    PasswordReentry: '',
  });

  const [buildingNames, setBuildingNames] = useState([]);
  const [selectedBuildingName, setSelectedBuildingName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/Buildings/signup/byName')
      .then((response) => {
        if (response.data.success) {
          setBuildingNames(response.data.result);
        } else {
          console.error('Error fetching building names:', response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching building names:', error);
      });
  }, []);

  const filteredBuildingNames = buildingNames.filter(building => building.buildingName === selectedBuildingName);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors({ usernameError: '', passwordError: '', passwordConfirmationError: '' });
    setInputs({
      ...inputs,
      [name]: value,
      showFields: (name === 'role' && value === 'Tenant') || name === 'apartmentNumber' || name === 'buildingName',
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { userName, password, confirmPassword } = inputs;
    const usernameError = usernameRegex.test(userName)
      ? ''
      : 'Username should be at least 8 characters and start with an alphabet';
    const passwordError = passwordRegex.test(password)
      ? ''
      : 'Password should be at least 8 characters with at least 1 lowercase and 1 uppercase letter';
    const passwordConfirmationError = password === confirmPassword
      ? ''
      : 'Passwords do not match';
    setErrors({ usernameError, passwordError, passwordConfirmationError });

    if (usernameError === '' && passwordError === '' && passwordConfirmationError === '') {
      if (inputs.role === 'Manager') {
        const {
          role, userName, password, email, name1, phoneNumber, address,
        } = inputs;
        const data = {
          userName, email, password, name: name1, role, phoneNumber, address,
        };
        axios.post('http://localhost:3001/auth/signup', data).then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            navigate('/signin');
          }
        });
      } else {
        const {
          role, userName, password, email, name1, phoneNumber, address, apartmentNumber, buildingName,
        } = inputs;
        const data = {
          userName, email, password, name: name1, role, phoneNumber, address, apartmentNumber, buildingName,
        };
        axios.post('http://localhost:3001/auth/signup', data).then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            navigate('/signin');
          }
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.gradientBox}>
        <h2 className={styles.title}>Sign Up</h2>
        <form noValidate onSubmit={handleSubmit}>
          <div className={styles.formControl}>
            <label htmlFor="userName">Username</label>
            <input
              className={styles.input}
              autoComplete="Username"
              name="userName"
              id="userName"
              required
              placeholder="Username"
              onChange={handleInputChange}
            />
            <div className={styles.errorMessage}>{errors.usernameError}</div>
          </div>

          <div className={styles.formControl}>
            <label htmlFor="email">Email</label>
            <input
              className={styles.input}
              autoComplete="Email"
              name="email"
              id="email"
              required
              placeholder="Email"
              onChange={handleInputChange}
            />
            <div className={styles.errorMessage}>{errors.emailError}</div>
          </div>

          <div className={styles.formControl}>
            <label htmlFor="password">Password</label>
            <input
              className={styles.input}
              autoComplete="Password"
              name="password"
              id="password"
              required
              placeholder="Password"
              onChange={handleInputChange}
            />
            <div className={styles.errorMessage}>{errors.passwordError}</div>
          </div>

          <div className={styles.formControl}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className={styles.input}
              autoComplete="confirmPassword"
              name="confirmPassword"
              id="confirmPassword"
              required
              placeholder="Confirm Password"
              onChange={handleInputChange}
            />
            <div className={styles.errorMessage}>{errors.confirmPasswordError}</div>
          </div>

          <div className={styles.formControl}>
            <label htmlFor="role">Select Role</label>
            <select
              id="role"
              name="role"
              className={styles.select}
              onChange={handleInputChange}
            >
              <option value="">None</option>
              <option value="Manager">Manager</option>
              <option value="Tenant">Tenant</option>
              <option value="Guest">Guest</option>
            </select>
            <div className={styles.errorMessage}>{errors.roleError}</div>
          </div>
          {(inputs.role === 'Tenant') && (
            <>
              <div className={styles.formControl}>
                <label htmlFor="apartmentNumber">Apartment Number</label>
                <input
                  required
                  name="apartmentNumber"
                  id="apartmentNumber"
                  onChange={handleInputChange}
                  autoComplete="apartmentNumber"
                />
              </div>
              <div className={styles.formControl}>
                <label htmlFor="buildingName">Select Building Name</label>
                <select
                  id="buildingName"
                  name="buildingName"
                  onChange={(e) => {
                    handleInputChange(e);
                    setSelectedBuildingName(e.target.value);
                  }}
                >
                  {buildingNames.map(building => (
                    <option key={building.buildingName} value={building.buildingName}>
                      {building.buildingName}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <button type="submit" className={styles.submitButton}>Sign Up</button>
          <a href="/signin" className={styles.link}>Already have an account? Sign in</a>
        </form>
      </div>
    </div>
  );
}

export default Signup;
