"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";

export default function StudentPersonalInfoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
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
    router.push("/register/company/company");
  };

  return (
    <div className="wrapper">
      <div className="image-container">
        <img src="/form-step-2.svg" alt="Progress bar step 2/6" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h5>Förnamn</h5>
          <FormInput
            type="text"
            label="Förnamn"
            name="first_name"
            id="first_name"
            placeholder="Alex"
            value={formData.first_name}
            onChange={handleChange}
            required
          />

          <h5>Efternamn</h5>
          <FormInput
            type="text"
            label="Efternamn (frivilligt)"
            name="last_name"
            id="last_name"
            placeholder="Johansson"
            value={formData.last_name}
            onChange={handleChange}
          />

          <h5>Skapa konto *</h5>

          <FormInput
            type="email"
            label="Email"
            name="email"
            id="email"
            placeholder="alex.johansson@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <FormInput
            type="password"
            label="Lösenord"
            name="password"
            id="password"
            placeholder="************"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <p className="password-text">Måste innehålla minst 12 tecken</p>

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
              //href="/register/company/company"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
