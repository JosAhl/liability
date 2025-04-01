import React from 'react';
import "@/styles/components/button.css";
const Button = ({ text, className, variant, color, onClick }) => {
    return (
        <button className = {`button ${className} ${variant} ${color}`} onClick={onClick}>
            {text}
        </button>
    )
}

export default Button
