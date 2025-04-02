import "@/styles/components/event-details.css";
import Timer from "@/components/Timer";

const EventDetails = () => {
    return (
        <article className="event-details">
            <Timer />
            <p>
                Onsdag den 23 april Visual Arena 13.00 - 15.00
            </p>
            <section className="visitors">
                <div className="people">

                </div>
                <p>
                    +50 studerande och företag på plats
                </p>
            </section>

        </article>
    )
}
export default EventDetails;