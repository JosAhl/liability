import "@/styles/components/timer.css";
import React, { useState, useEffect } from "react";

const Timer = () => {
    const [eventDate, setEventDate] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(null);

    useEffect(() => {
        const date = new Date("2025-04-23T13:00:00").getTime();
        setEventDate(date);
        setTimeRemaining(date - new Date().getTime());
    }, []);

    useEffect(() => {
        if (eventDate) {
            const countdownInterval = setInterval(() => {
                const currentTime = new Date().getTime();
                const remainingTime = eventDate - currentTime;

                if (remainingTime <= 0) {
                    setTimeRemaining(0);
                    clearInterval(countdownInterval);
                    alert("Välkomna!");
                } else {
                    setTimeRemaining(remainingTime);
                }
            }, 1000);

            return () => clearInterval(countdownInterval);
        }
    }, [eventDate]);

    // Prevent rendering until timeRemaining is set
    if (timeRemaining === null) return null;

    // Calculate time units
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
