"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Button from "@/components/Button";
import CheckboxButtons from "@/components/CheckboxButtons";
import FormInput from "@/components/FormInput";

export default function StudentSkillsPreferencesPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    skills: [],
    extraSkills: "",
  });

  const [skillOptions, setSkillOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load previous form data
  useEffect(() => {
    const savedData = localStorage.getItem("studentFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData((prev) => ({
        ...prev,
        skills: parsedData.skills || [],
        extraSkills: parsedData.extraSkills || "",
      }));
      console.log("Previous data loaded");
    }

    // Fetch skill options from database
    async function fetchSkills() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from("skills").select("name");

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          setSkillOptions(data.map((item) => item.name));
        } else {
          // Fallback to default options if no data
          setSkillOptions([
            "Ui/Ux Design",
            "HTML",
            "CSS",
            "Illustrationer",
            "Motion",
            "3D",
            "Typografi",
            "Filmredigering",
          ]);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
        // Fallback to default options if fetch fails
        setSkillOptions([
          "Ui/Ux",
          "HTML",
          "CSS",
          "Illustrationer",
          "Motion",
          "3D",
          "Typo",
          "Film",
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
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

    const extraItems = formData.extraSkills
      .split(/[,\n]/)
      .map((item) => item.trim())
      .filter((item) => item !== "");

    // Combine skills + extra skills here
    const combinedSkills = [...formData.skills, ...extraItems];

    // Merge with previous data and save
    const previousData = JSON.parse(
      localStorage.getItem("studentFormData") || "{}"
    );
    const updatedData = {
      ...previousData,
      skills: combinedSkills,
      extraSkills: formData.extraSkills,
    };

    localStorage.setItem("studentFormData", JSON.stringify(updatedData));
    router.push("/register/success");
  };

  return (
    <div className="wrapper">
      <div className="image-container">
        <img src="/form-step-4.svg" alt="Progress bar step 4/6" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h5>Kompetenser (Välj minst 2)</h5>
            {loading ? (
              <p>Laddar kompetenser...</p>
            ) : (
              <CheckboxButtons
                options={skillOptions}
                name="skills"
                selectedValues={formData.skills || []}
                onChange={handleCheckboxChange}
                className="mt-2"
              />
            )}
          </div>

          <div className="form-group">
            <FormInput
              type="textarea"
              label="Lägg till annan kompetens"
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
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
