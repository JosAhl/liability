import "@/styles/components/agenda.css"

const Agenda = () => {
return (
    <section className="agenda" id="agenda" >
        <h2 className="agenda-heading">
            Agenda
        </h2>
        <div className="agenda-content">
            <div className="agenda-headline">
                <div>
                    13:00 <br />
                    Välkomstmingel
                    <div className="agenda-circle"></div>
                    <div className="vertical-line"></div>
                </div>
            </div>
            <div className="agenda-headline">
                <div>
                    13:30 <br />
                    Introduktion & Presentation
                    <div className="agenda-circle"></div>
                </div>
            </div>
            <div className="agenda-headline">
                <div>
                    14:00 <br />
                    Mingel & Mötesstationer
                    <div className="agenda-circle"></div>
                </div>
            </div>
            <div className="agenda-headline">
                <div>
                    15:00 <br />
                    Avslutande sammanfattning
                    <div className="agenda-circle"></div>
                </div>
            </div>
            <div className="vertical-line"></div>
        </div>
    
    </section>
)
}

export default Agenda;

