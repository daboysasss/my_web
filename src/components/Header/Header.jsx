import React from 'react';
import './Header.css';
import StarBorder from '../StarBorder/StarBorder';

const Header = () => {
  return (
      <StarBorder
  as="header"
  className="custom-class"
  color="cyan"
  speed="5s">
      <nav className="menu">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/portfolio">Portfolio</a>
        <a href="/contact">Contact</a>
      </nav>
      </StarBorder>
  );
};

export default Header;