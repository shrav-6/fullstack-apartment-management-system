import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaAlignRight } from 'react-icons/fa';
import logo from '../../organisms/public view/images/logo.svg';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const accessToken = sessionStorage.getItem('accessToken');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const imageStyles = {
    width: '90px',
    height: 'auto',
  };

  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <img src={logo} alt="Shelter App" style={imageStyles} />
          <button type="button" className="nav-btn" onClick={handleToggle}>
            <FaAlignRight className="nav-icon" />
          </button>
        </div>
        <ul className={isOpen ? 'nav-links show-nav' : 'nav-links'}>
          {accessToken ? (
            <>

              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/notices">Notices</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">About</Link>
              </li>
              <li>
                <Link to="/rooms">New Listings</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
