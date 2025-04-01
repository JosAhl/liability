import "@/styles/components/navbar.css";
import Button from "@/components/Button";

export default function Navbar() {
    return (
      <nav className="Navbar">
        <a href="">
        <img src="/logo.svg" alt="Yrgo logo" />
        </a>
        <div className="navbar-menu">
            <a href="">Om eventet</a>
            <a href="">Agenda</a>
            <a href="">FAQ</a>
        </div>
        <div className="navbar-buttons">
            <Button text="Logga in" className="primary" variant="default" color="red" />
            <Button text="Anmäl mig" className="primary" variant="default" color="blue" />
        </div>
      </nav>
    );
  }