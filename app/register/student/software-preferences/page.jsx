"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Button from "@/components/Button";
import CheckboxButtons from "@/components/CheckboxButtons";
import FormInput from "@/components/FormInput";

export default function StudentSoftwarePreferencesPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    selectedPrograms: [],
    extraSoftware: "",
  });

  const [softwareOptions, setSoftwareOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load previous form data
  useEffect(() => {
    const savedData = localStorage.getItem("studentFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData((prev) => ({
        ...prev,
        selectedPrograms:
          parsedData.selectedPrograms || parsedData.software || [],
        extraSoftware: parsedData.extraSoftware || "",
      }));
      console.log("Previous data loaded");
    }
    /*
  }, []);
*/
    // Fetch software options from database
    async function fetchSoftware() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from("software").select("name");

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          setSoftwareOptions(data.map((item) => item.name));
        } else {
          // Fallback to default options if no data
          setSoftwareOptions(["Fig", "Illus", "Cinema", "Word"]);
        }
      } catch (error) {
        console.error("Error fetching software:", error);
        // Fallback to default options if fetch fails
        setSoftwareOptions(["Fig", "Illus", "Cinema", "Word"]);
      } finally {
        setLoading(false);
      }
    }

    fetchSoftware();
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

    const extraItems = formData.extraSoftware
      .split(/[,\n]/)
      .map((item) => item.trim())
      .filter((item) => item !== "");

    // Combine programs + extra software here
    const combinedPrograms = [...formData.selectedPrograms, ...extraItems];

    // Merge with previous data and save
    const previousData = JSON.parse(
      localStorage.getItem("studentFormData") || "{}"
    );
    const updatedData = {
      ...previousData,
      selectedPrograms: combinedPrograms,
      extraSoftware: formData.extraSoftware,
    };

    localStorage.setItem("studentFormData", JSON.stringify(updatedData));
    router.push("/register/success");
  };

  /*
    // Merge with previous data and save
    const previousData = JSON.parse(
      localStorage.getItem("studentFormData") || "{}"
    );
    const updatedData = { ...previousData, ...formData };
    localStorage.setItem("studentFormData", JSON.stringify(updatedData));

    // Navigate to next step
    router.push("/register/success");
  };

  */
  return (
    <div className="wrapper">
      <div className="image-container">
        <img src="/form-step-3.svg" alt="Progress bar step 3/6" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h5>Program (Välj minst 1)</h5>
            <CheckboxButtons
              options={softwareOptions}
              name="selectedPrograms"
              selectedValues={formData.selectedPrograms || []}
              onChange={handleCheckboxChange}
              className="mt-2"
            />
          </div>

          <div className="form-group">
            <FormInput
              type="textarea"
              label="Lägg till annat program"
              name="extraSoftware"
              id="extraSoftware"
              placeholder="Annat"
              value={formData.extraSoftware}
              onChange={handleChange}
            />
          </div>

          <div className="form-navigation">
            <Button
              text="<-"
              className="primary"
              variant="default"
              color="blue"
              href="/register/student/personal-info"
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
