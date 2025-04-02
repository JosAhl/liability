import "@/styles/components/timer.css";
import React, { useState, useEffect } from "react";

const Timer = () => {
    const [eventDate, setEventDate] = useState(new Date("2025-04-23T13:00:00").getTime());
    const [timeRemaining, setTimeRemaining] = useState(eventDate - new Date().getTime());

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            const currentTime = new Date().getTime();
            const remainingTime = eventDate - currentTime;
    
            if (remainingTime <= 0) {
                setTimeRemaining(0);
                clearInterval(countdownInterval);
                alert("Countdown complete!");
            } else {
                setTimeRemaining(remainingTime);
            }
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [eventDate]);  // Only rerun when eventDate changes

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    return (
        <section className="timer">
            <div className="timer-content">
                <div className="timer-box days">{days.toString().padStart(2, "0")}</div>
                <p>Dagar</p>
            </div>
            <p>:</p>
            <div className="timer-content">
                <div className="timer-box hours">{hours.toString().padStart(2, "0")}</div>
                <p>Tim</p>
            </div>
            <p>:</p>
            <div className="timer-content">
                <div className="timer-box minutes">{minutes.toString().padStart(2, "0")}</div>
                <p>Min</p>
            </div>
            <p>:</p>
            <div className="timer-content">
                <div className="timer-box seconds">{seconds.toString().padStart(2, "0")}</div>
                <p>Sek</p>
            </div>
        </section>
    );
};

export default Timer;
