"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerStudent } from "@/app/register/actions.js";
import Button from "@/components/Button";
import "@/styles/components/form.css";

export default function RegistrationSuccessPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("studentFormData");

    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create a FormData object to send to the server action
      const submitData = new FormData();

      // Add each field from the collected data to the FormData object
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // Handle arrays (like fields, software, focus_areas)
          value.forEach((item) => {
            if (key === "skills") {
              submitData.append("selectedSkills", item);
            } else if (key === "software" || key === "programs") {
              submitData.append("selectedPrograms", item);
            } else {
              submitData.append(key, item);
            }
          });
        } else if (value !== null && value !== undefined) {
          const fieldName =
            key === "phone"
              ? "telephone"
              : key === "github"
              ? "portfolio-github"
              : key === "program"
              ? "studyProgram"
              : key;

          submitData.append(fieldName, value.toString());
        }
      });

      // Call the server action to register the student
      await registerStudent(submitData);

      // Clear localStorage after successful submission
      localStorage.removeItem("studentFormData");

      router.push("/login"); //---------------------------------------------------------
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="success-container">
      <div className="image-container">
        <img src="/form-step-6.svg" alt="Progress bar step 6/6" />
      </div>
      <div className="success-message">
        <img src="/success.svg" alt="Circled checkmark" />
        <h5>Redo för att hitta spännande praktikplatser!</h5>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="success-actions">
          <Button
            text="<-"
            className="primary"
            variant="default"
            color="blue"
            href="/"
          />
          <Button
            text={isSubmitting ? "Vänta..." : "Fortsätt"}
            className="primary"
            variant="default"
            color="red"
            type="submit"
            disabled={isSubmitting}
            withArrow={true}
            //href="/login"
          />
        </div>
      </form>
    </div>
  );
}
