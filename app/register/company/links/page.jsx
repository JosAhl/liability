"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";

export default function StudentSoftwarePreferencesPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    company_url: "",
    company_other_links: "",
  });

  // Load previous form data
  useEffect(() => {
    const savedData = localStorage.getItem("companyFormData");
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
      localStorage.getItem("companyFormData") || "{}"
    );
    const updatedData = {
      ...previousData,
      company_url: formData.company_url,
      company_other_links: formData.company_other_links,
    };
    localStorage.setItem("companyFormData", JSON.stringify(updatedData));

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
              label="Hemsida (Frivilligt)"
              name="company_url"
              id="company_url"
              placeholder="wwww.alexdesign.com"
              withLink={true}
              value={formData.company_url}
              onChange={handleChange}
            />

            <FormInput
              type="url"
              label="Övriga länkar (Frivilligt)"
              name="company_other_links"
              id="company_other_links"
              placeholder="https://www.linkedin.com/in/företagsnamn"
              withLink={true}
              value={formData.company_other_links}
              onChange={handleChange}
            />
          </div>

          <div className="form-navigation">
            <Button
              text="<-"
              className="primary"
              variant="default"
              color="blue"
              href="/register/company/company"
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
