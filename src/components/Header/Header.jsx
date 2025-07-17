import React from 'react';
import './Header.css';
import StarBorder from '../StarBorder/StarBorder';

const Header = () => {
  return (
    <header>
      <StarBorder
  as="div"
  className="custom-class"
  color="magenta"
  speed="5s">
      <nav className="menu">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/portfolio">Portfolio</a>
        <a href="/contact">Contact</a>
      </nav>
      </StarBorder>
      </header>
  );
};

export default Header;