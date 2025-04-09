"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import CheckboxButtons from "@/components/CheckboxButtons";
import FormInput from "@/components/FormInput";

export default function StudentPersonalInfoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    telephone_number: "",
    password: "",
    field: [],
  });

  const field = ["Digital Design", "Webbutveckling"];

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

    // Save data to localStorage or session storage
    localStorage.setItem("studentFormData", JSON.stringify(formData));

    // Navigate to next step
    router.push("/register/student/software-preferences");
  };

  return (
    <div className="wrapper">
      <div className="image-container">
        <img src="/form-step-2.svg" alt="Progress bar step 2/6" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h5>Namn</h5>
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

          <FormInput
            type="text"
            label="Efternamn (frivilligt)"
            name="last_name"
            id="last_name"
            placeholder="Johansson"
            value={formData.last_name}
            onChange={handleChange}
          />

          <FormInput
            type="tel"
            label="Telefonnummer (frivilligt)"
            name="telephone_number"
            id="telephone_number"
            placeholder="070-123 45 67"
            value={formData.telephone_number}
            onChange={handleChange}
          />

          <h5>Skapa konto</h5>

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

          <h5>Vad pluggar du? *</h5>

          <div className="form-group">
            <CheckboxButtons
              options={field}
              name="field"
              selectedValues={formData.field || []}
              onChange={handleCheckboxChange}
              className="mt-2"
            />
          </div>

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
              href="/register/student/software-preferences"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
