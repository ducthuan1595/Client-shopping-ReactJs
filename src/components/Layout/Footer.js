import React from "react";
import { Link } from "react-router-dom";

import styled from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={styled.footer}>
      <div>
        <h3>CUSTOMER SERVICES</h3>
        <Link to='#'>Help & Contact Us</Link>
        <Link to='#'>Returns & Refunds</Link>
        <Link to='#'>Online Stores</Link>
        <Link to='#'>Terms & Conditions</Link>
      </div>
      <div>
        <h3>COMPANY</h3>
        <Link to='#'>What We DO</Link>
        <Link to='#'>Available Service</Link>
        <Link to='#'>Latest Posts</Link>
        <Link to='#'>FAQs</Link>
      </div>
      <div>
        <h3>SOCIAL MEDIA</h3>
        <Link to='#'>Twitter</Link>
        <Link to='#'>Instagram</Link>
        <Link to='#'>Facebook</Link>
        <Link to='#'>Pinterest</Link>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
