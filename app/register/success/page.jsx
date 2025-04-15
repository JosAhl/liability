"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/register/actions.js";
import Button from "@/components/Button";
import "@/styles/components/form.css";

export default function RegistrationSuccessPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /*
  useEffect(() => {
    const savedData = localStorage.getItem("studentFormData");

    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);
  */

  useEffect(() => {
    const studentData = localStorage.getItem("studentFormData");
    const companyData = localStorage.getItem("companyFormData");

    if (studentData) {
      setFormData(JSON.parse(studentData));
    } else if (companyData) {
      setFormData(JSON.parse(companyData));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = new FormData();

      const dataMapping = {
        email: "email",
        password: "password",
        first_name: "first_name",
        last_name: "last_name",
        avatar_url: "avatar_url",
        phone: "telephone_number",
        description: "description",
        github: "portfolio_github",
        linkedin: "linkedin",
        cv_url: "cv_url",
        other_url: "other_url",
        program: "studyProgram",
        selectedPrograms: "selectedPrograms",
        skills: "selectedSkills",
        company_name: "company_name",
        company_description: "company_description",
        company_url: "company_url",
        company_other_links: "company_other_links",
        selectedFocusAreas: "selectedFocusAreas",
      };

      // Process the form data
      Object.entries(formData).forEach(([key, value]) => {
        const serverKey = dataMapping[key] || key;

        if (Array.isArray(value)) {
          if (
            key === "selectedPrograms" ||
            key === "skills" ||
            key === "selectedFocusAreas"
          ) {
            submitData.append(serverKey, JSON.stringify(value));
            console.log(`Adding ${serverKey}:`, JSON.stringify(value));
          } else {
            value.forEach((item) => {
              submitData.append(serverKey, item);
            });
          }
        } else if (value !== null && value !== undefined) {
          submitData.append(serverKey, value.toString());
        }
      });

      // Check "student" or "företag"
      if (!submitData.get("userType")) {
        submitData.append("userType", "student");
      }

      await registerUser(submitData);

      // Clear localStorage after successful submission
      localStorage.removeItem("studentFormData");
      localStorage.removeItem("companyFormData");

      router.push("/login");
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
          />
        </div>
      </form>
    </div>
  );
}
