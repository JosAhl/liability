'use client'
import "@/styles/components/navbar.css";
import Button from "@/components/Button";

const Navbar = () => {
    return (
      <nav className="Navbar">
        <a href="">
            <img src="/logo.svg" alt="Yrgo logo" />
        </a>
        <div className="navbar-menu">
            <a href="#about-event">Om eventet</a>
            <a href="#agenda">Agenda</a>
            <a href="#faq-section">FAQ</a>
        </div>
        <div className="navbar-buttons">
            <Button text="Logga in" className="secondary" variant="default"/>
            <Button text="Anmäl mig" className="primary" variant="default" color="blue"/>
        </div>
      </nav>
    );
  }

export default Navbar;