import React from 'react';
import "@/styles/components/button.css";
import { useRouter } from 'next/navigation';

/* To add a button into your component, use the following code-example: */
{/* <Button text="Anmäl mig" className="primary" variant="default" color="red" withArrow={true} onClick={() => {alert('You clicked on the button!'); */}

const Button = ({ text, className, variant, color, withArrow = false, onClick, href }) => {

    const router = useRouter();
    
    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
        }
        
        if (href) {
            router.push(href);
        }
    }

    return (
        <button className = {`button ${className} ${variant} ${color}`} onClick={handleClick}>
            {withArrow ? (
                <span className="arrow">
                    {text}
                    <img src="/arrow-icon.svg" alt="Arrow icon" />
                </span>
            ) : (
                text
            )}
        </button>
    )
}

export default Button
