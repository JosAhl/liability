import "@/styles/components/faq.css";
import Fact from "@/components/Fact";

const FAQ = () => {
return (
    <section className="faq-section" id="faq-section">
        <img src="/FAQ.svg" alt="" className="faq" />
        <div className="faq-items">
            <Fact summary="Hur hittar jag till eventet?" text="Eventet hålls på Lindholmen Science Park, Lindholmspiren 3, Göteborg. Närmsta hållplats är Lindholmen – smidigast dit med buss eller färja!" />
            <Fact summary="Är mina personuppgifter säkra? " text="Ja, vi följer GDPR-regler. Dina uppgifter lagras endast om det är nödvändigt och delas inte utan ditt samtycke. Du kan när som helst begära att få dina uppgifter raderade." />
            <Fact summary="Finns det möjlighet att marknadsföra vårt företag under eventet?" text="Ja! Vi rekommenderar att ni tar med visitkort & ett gott humör men ni får  gärna ta med roll-ups eller annat exponeringsmaterial. Det finns plats!" />
            <Fact summary="Kommer det finnas kaffe? " text="Självklart! Vad vore ett mingel utan kaffe? ☕ Kom och fyll på energin!" />
        </div>
        <img src="/logo-white.svg" alt="" className="faq-logo" />


    </section>
)
}

export default FAQ;