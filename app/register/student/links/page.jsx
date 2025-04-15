"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";

export default function StudentSoftwarePreferencesPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    portfolio_github: "",
    linkedin: "",
    //cv_url: "",
    //other_url: "",
  });

  // Load previous form data
  useEffect(() => {
    const savedData = localStorage.getItem("studentFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData((prev) => ({
        ...prev,
        ...parsedData,
      }));
      console.log("Previous data loaded");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Merge with previous data and save
    const previousData = JSON.parse(
      localStorage.getItem("studentFormData") || "{}"
    );
    const updatedData = {
      ...previousData,
      portfolio_github: formData.portfolio_github,
      linkedin: formData.linkedin,
      //cv_url: formData.cv_url,
      //other_url: formData.other_url,
    };
    localStorage.setItem("studentFormData", JSON.stringify(updatedData));

    // Navigate to next step
    router.push(
      "/register/success"
    ); /* ----------------------------------------- lägg till nästa steg */
  };

  return (
    <div className="wrapper">
      <div className="image-container">
        <img src="/form-step-6.svg" alt="Progress bar step 6/6" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <FormInput
              type="url"
              label="Portfolio/Github (Frivilligt)"
              name="portfolio_github"
              id="portfolio_github"
              placeholder="wwww.alexportfolio.se"
              withLink={true}
              value={formData.portfolio_github}
              onChange={handleChange}
            />

            <FormInput
              type="url"
              label="LinkedIn (Frivilligt)"
              name="linkedin"
              id="linkedin"
              placeholder="https://www.linkedin.com/in/alex-johansson"
              withLink={true}
              value={formData.linkedin}
              onChange={handleChange}
            />
          </div>

          <div className="form-navigation">
            <Button
              text="<-"
              className="primary"
              variant="default"
              color="blue"
              href="/register/student/image-upload"
            />
            <Button
              text="Fortsätt"
              className="primary"
              variant="default"
              color="red"
              withArrow={true}
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
