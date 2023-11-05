import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  // Function to handle logout
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    navigate('/signin');
  };


  useEffect(() => {
    setTimeout(() => {
      handleLogout();
    }, 1000); 
  }, []);

  
  return null;
}

export default Logout;

