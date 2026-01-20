import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer animate-fade-in delay-300">
            <p className="footer-tagline">
                Reconnect. Revitalize. Recharge.
            </p>
            <p className="footer-copyright">
                © {new Date().getFullYear()} Pepgoodies PH
            </p>
        </footer>
    );
};

export default Footer;
