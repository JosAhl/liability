"use client";
import Button from "@/components/Button";
import "@/styles/components/form.css";

export default function RegistrationSuccessPage() {
  return (
    <div className="success-container">
      <div className="image-container">
        <img src="/form-step-6.svg" alt="Progress bar step 6/6" />
      </div>
      <div className="success-message">
        <img src="/success.svg" alt="Circled checkmark" />
        <h5>Redo för att hitta spännande praktikplatser!</h5>
      </div>

      <div className="success-actions">
        <Button
          text="<-"
          className="primary"
          variant="default"
          color="blue"
          href="/"
        />
        <Button
          text="Fortsätt"
          className="primary"
          variant="default"
          color="red"
          withArrow={true}
          href="/login"
        />
      </div>
    </div>
  );
}
