import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer bg-red-600">
      <h1 className="text-center">BAZAAR provided by Ujjwal & Vikas</h1>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
