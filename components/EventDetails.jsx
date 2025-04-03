import "@/styles/components/event-details.css";
import Timer from "@/components/Timer";
import People from "@/components/People";

const EventDetails = () => {
    return (
        <article className="event-details">
            <Timer />
            <p>
                Onsdag den 23 april <br />
                Visual Arena  <br />
                13.00 - 15.00
            </p>
            <section className="visitors">
                <div className="people">
                    <People />
                </div>
                <p>
                    +50 studerande och <br />
                    företag på plats
                </p>
            </section>

        </article>
    )
}
export default EventDetails;