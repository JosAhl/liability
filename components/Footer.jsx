import "@/styles/components/footer.css"

const Footer = () => {
    return (
        <>  
            <div className="footer-container">
                <div className="footer-content">
                    <img src="/footer-logo.svg" alt="" />
                    <p>Denna plattform kopplar samman studerande och företag för en smidig LIA-process. Vi följer WCAG 2.1 AA och GDPR för en säker och tillgänglig upplevelse.</p>
                    <div className="social-media-logos">
                        <a href="https://www.facebook.com/yrgogoteborg/"><img src="/icon/fb.png" alt="" /></a>
                        <a href="https://www.linkedin.com/school/yrgo"><img src="/icon/linkedin.png" alt="" /></a>
                    </div>

                </div>
                <div className="footer-menu">
                    <a href="#about-event">Om eventet</a>
                    <a href="#agenda">Agenda</a>
                    <a href="">Kontakta oss</a>
                    <a href="#faq-section">FAQ</a>
                </div>
            </div>
            <div className="subfooter">
                <p>© 2025 – Skapad för Yrgo Branschevent</p>
                <img src="/logga-goteborgs-stad.png" alt="" />        

            </div>
        </>
    )
}

export default Footer