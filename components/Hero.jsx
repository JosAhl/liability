'use client'

import "@/styles/components/hero.css";
import Button from "@/components/Button";
import EventDetails from "@/components/EventDetails";

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Mingeleventet som för samman branschen och framtidens kreatörer</h1>
                <p>Träffa Webbutvecklare, Digital Designers och företag. Nätverka, hitta samarbeten och skapa framtidens möjligheter!</p>
                <Button text="Anmäl dig" className="primary" variant="default" color="blue" onClick={() => {alert('You clicked on the button!');}} />
            </div>
            <div className="event-details-container">
                <EventDetails />
            </div>
        </section>
    );
}
export default Hero;