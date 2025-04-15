"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";

export default function StudentPersonalInfoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    company_name: "",
    company_description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Merge with previous data and save
    const previousData = JSON.parse(
      localStorage.getItem("companyFormData") || "{}"
    );
    const updatedData = { ...previousData, ...formData };
    localStorage.setItem("companyFormData", JSON.stringify(updatedData));

    // Navigate to next step
    router.push("/register/success");
  };

  return (
    <div className="wrapper">
      <div className="image-container">
        <img src="/form-step-2.svg" alt="Progress bar step 2/6" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h5>Företagsnamn</h5>
          <FormInput
            type="text"
            label="Förnamn"
            name="company_name"
            id="company_name"
            placeholder="Johansson Design AB"
            value={formData.company_name}
            onChange={handleChange}
            required
          />

          <FormInput
            type="textarea"
            label="Kort beskrivning av företaget"
            name="company_description"
            id="company_description"
            placeholder="Beskrivning..."
            value={formData.company_description}
            onChange={handleChange}
          />

          <div className="form-navigation">
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
              type="submit"
              //href="/register/success"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
