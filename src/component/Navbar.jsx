// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css'; // import CSS untuk styling navbar
import '../css/Header.css'; // import CSS untuk styling header
//import Bergu from '../images/bergu.png';

const AppNavbar = () => {
  const [responsive, setResponsive] = useState(false);

  const handleToggle = () => {
    setResponsive(!responsive);
  };

  return (
    <div className="header">
      <nav className="navbar">
        
        <div className={`navbar ${responsive ? 'responsive' : ''}`}>
          <Link to="/" className="active">Home</Link>
          <Link to="/updown" className="active">updown</Link>
          <Link href="javascript:void(0);" className="icon" onClick={handleToggle}>
            &#9776;
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default AppNavbar;
