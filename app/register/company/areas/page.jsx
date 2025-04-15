"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Button from "@/components/Button";
import CheckboxButtons from "@/components/CheckboxButtons";
import FormInput from "@/components/FormInput";

export default function StudentFocusAreasPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    selectedFocusAreas: [],
    extraFocusArea: "",
  });

  const [focusAreaOptions, setFocusAreaOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load previous form data
  useEffect(() => {
    const savedData = localStorage.getItem("companyFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData((prev) => ({
        ...prev,
        selectedFocusAreas:
          parsedData.selectedFocusAreas || parsedData.focus_areas || [],
        extraFocusArea: parsedData.extraFocusArea || "",
      }));
      console.log("Previous data loaded");
    }

    // Fetch software options from database
    async function fetchFocusAreas() {
      try {
        const supabase = createClient();
        console.log("Supabase client initialized:", supabase);
        const { data, error } = await supabase
          .from("focus_areas")
          .select("name");

        if (error) {
          console.error("Supabase query error:", error.message);
          throw error;
        }

        if (data && data.length > 0) {
          setFocusAreaOptions(data.map((item) => item.name));
        } else {
          // Fallback to default options if no data
          setFocusAreaOptions(["Fig", "Illus", "Cinema", "Word"]);
        }
      } catch (error) {
        console.error("Error fetching focus area:", error);
        // Fallback to default options if fetch fails
        setFocusAreaOptions(["Fig", "Illus", "Cinema", "Word"]);
      } finally {
        setLoading(false);
      }
    }

    fetchFocusAreas();
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

    const extraItems = formData.extraFocusArea
      .split(/[,\n]/)
      .map((item) => item.trim())
      .filter((item) => item !== "");

    // Combine programs + extra software here
    const combinedFocusAreas = [...formData.selectedFocusAreas, ...extraItems];

    // Merge with previous data and save
    const previousData = JSON.parse(
      localStorage.getItem("companyFormData") || "{}"
    );
    const updatedData = {
      ...previousData,
      selectedFocusAreas: combinedFocusAreas,
      extraFocusArea: formData.extraFocusArea,
    };

    localStorage.setItem("companyFormData", JSON.stringify(updatedData));
    router.push("/register/success");
  };

  return (
    <div className="wrapper">
      <div className="image-container">
        <img src="/form-step-3.svg" alt="Progress bar step 3/6" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h5>Fokusområden (Välj minst 2)</h5>
            <CheckboxButtons
              options={focusAreaOptions}
              name="selectedFocusAreas"
              selectedValues={formData.selectedFocusAreas || []}
              onChange={handleCheckboxChange}
              className="mt-2"
            />
          </div>

          <div className="form-group">
            <FormInput
              type="textarea"
              label="Lägg till andra fokusområden"
              name="extraFocusArea"
              id="extraFocusArea"
              placeholder="Annat"
              value={formData.extraFocusArea}
              onChange={handleChange}
            />
          </div>

          <div className="form-navigation">
            <Button
              text="<-"
              className="primary"
              variant="default"
              color="blue"
              href="/register/company/image"
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
