"use client";
import Button from "@/components/Button";
import "../../styles/components/form.css";

export default function RegisterPage() {
  return (
    <div className="wrapper">
      <div className="image-container">
        <img src="/form-step-1.svg" alt="Progress bar step 1/6" />
      </div>
      <div className="registration-container">
        <h5>Är du student eller företag? *</h5>

        <div className="user-type-selection">
          <Button
            text="Företag"
            className="primary"
            variant="default"
            color="blue"
            href="/register/company/company-info"
          />

          <Button
            text="Student"
            className="primary"
            variant="default"
            color="blue"
            href="/register/student/personal-info"
          />
        </div>
      </div>
    </div>
  );
}
