import "@/styles/components/agenda.css"

const Agenda = () => {
return (
    <section className="agenda">
        <h2 className="agenda-heading">
            Agenda
        </h2>
        <div className="agenda-content">
            <div className="agenda-headline">
                <p>
                    13:00 <br />
                    Välkomstmingel
                    <div className="agenda-circle"></div>
                </p>
            </div>
            <div className="agenda-headline">
                <p>
                    13:30 <br />
                    Introduktion & Presentation
                    <div className="agenda-circle"></div>
                </p>
            </div>
            <div className="agenda-headline">
                <p>
                    14:00 <br />
                    Mingel & Mötesstationer
                    <div className="agenda-circle"></div>
                </p>
            </div>
            <div className="agenda-headline">
                <p>
                    16:00 <br />
                    Avslutande sammanfattning
                    <div className="agenda-circle"></div>
                </p>
            </div>
        </div>
    
    </section>
)
}

export default Agenda;

