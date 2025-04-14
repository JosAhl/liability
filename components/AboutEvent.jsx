import "@/styles/components/about-event.css";

const AboutEvent = () => {
    return (
        <section className="about-event" id="about-event">
            <div className="about-event-image">
                <img src="/yrgo-logo-2.png" alt="Yrgo logo" />
            </div>
            <div className="about-event-description">
                <h2>Om eventet</h2>
                <p>Välkommen på ett mingelevent där företag och studerande möts för att knyta värdefulla kontakter. Hitta framtida medarbetare, samarbeta under LIA eller bara inspireras av Webbutvecklare och Digital Designers från Yrgo som visar upp sina projekt. 
                <br />
                <br />    
                Företag uppmuntras att ta med identifierande material för synlighet. Det kommer att finnas stationer för möten mellan företag och studerande – eller så kan ni mingla fritt och prata i en avslappnad miljö.</p>
            </div>
        </section>
    );
}
export default AboutEvent;