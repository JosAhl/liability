"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";

export default function StudentSoftwarePreferencesPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    avatar_url: "",
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

  const handlePreview = (e) => {
    image.src = URL.createObjectURL(e.target.files[0]);
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
    router.push("/register/company/areas");
  };

  return (
    <div className="wrapper">
      <div className="image-container">
        <img src="/form-step-5.svg" alt="Progress bar step 5/6" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="image-preview">
            <img id="image" alt="Your picture" width="100" height="100" />
          </div>
          <FormInput
            type="file"
            label="Ladda upp profilbild (Frivilligt)"
            name="avatar_url"
            id="avatar_url"
            placeholder="Ladda upp fil (png, jpeg)"
            withImage={true}
            value={formData.avatar_url}
            onChange={handlePreview}
          />

          <div className="form-navigation">
            <Button
              text="<-"
              className="primary"
              variant="default"
              color="blue"
              href="/register/company/links"
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
