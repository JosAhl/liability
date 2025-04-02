import "@/styles/components/fact.css";

const Fact = ({summary, text}) => {
  return (
    <details>
        <summary>
            {summary}
            <img src="/facts-icons_arrow-left.svg" alt="" />
        </summary>
        <p>
            {text}
        </p>
    </details>
  );
}   
export default Fact;