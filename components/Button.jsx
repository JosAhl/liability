import React from 'react';
import "@/styles/components/button.css";

/* To add a button into your component, use the following code-example: */
{/* <Button text="Anmäl mig" className="primary" variant="default" color="red" withArrow={true} onClick={() => {alert('You clicked on the button!'); */}

const Button = ({ text, className, variant, color, withArrow = false, onClick}) => {
    return (
        <button className = {`button ${className} ${variant} ${color}`} onClick={onClick}>
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
