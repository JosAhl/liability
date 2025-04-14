'use client'
import "@/styles/components/navbar.css";
import Button from "@/components/Button";
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="Navbar">
      <a href="/">
        <img src="liability-logo.png" alt="Liability logo" className="liability"/>
      </a>

      <button
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        ☰
        </button>

      <div className={`navbar-collapse ${isOpen ? "open" : ""}`}>
        <ul className="navbar-menu">
          <li><a href="#about-event">Om eventet</a></li>
          <li><a href="#agenda">Agenda</a></li>
          <li><a href="#faq-section">FAQ</a></li>
        </ul>

        <div className="navbar-buttons">

        {isOpen ? (
            <Link href="/" className="mobile-link-style">Logga in</Link>
          ) : (
            <Button text="Logga in" className="secondary" variant="default" />
          )}        
        {isOpen ? (
          <Link href="/" className="mobile-link-style">Anmäl mig</Link>
        ) : (
          <Button text="Anmäl mig" className="primary" variant="default" color="blue" />
        )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
