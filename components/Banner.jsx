import "@/styles/components/banner.css";

const logos = [
    "/forsman.png",
    "/habermax.png",
    "/hih.png",
    "/hiq.png",
    "/humblebee.png",
    "/mkmedia.png",
    "/polestar.png",
    "/pony.png",
    "/stendahls.png",
    "/variant.png"
];

const Banner = () => {
    return (
        <section className="banner">
            <div className="banner-track">
                {[...logos, ...logos, ...logos].map((logo, index) => (
                    <img key={index} src={logo} /* TODO: lägg till alt-text */ />
                ))}
            </div>
        </section>
    );
};

export default Banner;
