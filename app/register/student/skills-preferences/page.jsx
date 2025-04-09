"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import CheckboxButtons from "@/components/CheckboxButtons";
import FormInput from "@/components/FormInput";

export default function StudentSoftwarePreferencesPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    skills: [],
    extraSkills: "",
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

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;

    if (checked) {
      setFormData((prev) => ({
        ...prev,
        [name]: [...prev[name], value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: prev[name].filter((item) => item !== value),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Merge with previous data and save
    const previousData = JSON.parse(
      localStorage.getItem("studentFormData") || "{}"
    );
    const updatedData = { ...previousData, ...formData };
    localStorage.setItem("studentFormData", JSON.stringify(updatedData));

    // Navigate to next step
    router.push(
      "/register/student/image-upload"
    ); /* ----------------------------------------- lägg till nästa steg */
  };

  // Design software options
  const skills = [
    "Ui/Ux Design",
    "HTML",
    "CSS",
    "Illustrationer",
    "Motion",
    "3D",
    "Typografi",
    "Filmredigering",
  ];

  return (
    <div className="wrapper">
      <div className="image-container">
        <img src="/form-step-4.svg" alt="Progress bar step 4/6" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h5>Kompetenser (Välj minst 2)</h5>
            <CheckboxButtons
              options={skills}
              name="skills"
              selectedValues={formData.skills}
              onChange={handleCheckboxChange}
              className="mt-2"
            />
          </div>

          <div className="form-group">
            <FormInput
              type="textarea"
              label="Lägg till annat program"
              name="extraSkills"
              id="extraSkills"
              placeholder="Annat"
              value={formData.extraSkills}
              onChange={handleChange}
            />
          </div>

          <div className="form-navigation">
            <Button
              text="<-"
              className="primary"
              variant="default"
              color="blue"
              href="/register/student/software-preferences"
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
