import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <nav className="nav">
      <Link to="/" className="title">
        SHELTER
      </Link>
      <ul>
        <li className={pathname === '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
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
