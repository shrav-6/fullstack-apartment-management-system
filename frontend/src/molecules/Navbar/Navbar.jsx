import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();

  if (pathname === '/' || pathname === '/signup' || pathname === '/signin') {
    return (
      <nav className="nav">
        <Link to="/" className="title">
          SHELTER
        </Link>
      </nav>
    );
  }
  return (
    <nav className="nav">
      <Link to="/home" className="title">
        SHELTER
      </Link>
      <ul>
        <li className={pathname === '/home' ? 'active' : ''}>
          <Link to="/home">Home</Link>
        </li>

        <li className={pathname === '/notices' ? 'active' : ''}>
          <Link to="/notices">Notices</Link>
        </li>

        <li className={pathname === '/signup' ? 'active' : ''}>
          <Link to="/signup">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}
