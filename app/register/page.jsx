"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Button from "@/components/Button";
import "../../styles/components/form.css";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [fieldOptions, setFieldOptions] = useState([]);
  //const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch field options from database
    async function fetchFields() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("fields")
          .select("id, name");

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          console.log("Fields fetched:", data);
          setFieldOptions(data);
        } else {
          // Fallback to default options if no data
          setFieldOptions([
            { id: 1, name: "s" },
            { id: 2, name: "f" },
          ]);
          console.log("No fields found, using defaults");
        }
      } catch (error) {
        console.error("Error fetching fields:", error);
        // Fallback to default options if fetch fails
        setFieldOptions([
          { id: 1, name: "s" },
          { id: 2, name: "f" },
        ]);
      } finally {
        setLoading(false);
      }
    }

    //fetchUserProfile();
    fetchFields();
  }, []);

  const handleFieldSelection = async (fieldOption) => {
    try {
      // Save the selection to localStorage
      const formData = {
        fieldId: fieldOption.id,
        userType: fieldOption.name,
      };
      localStorage.setItem("studentFormData", JSON.stringify(formData));

      // Redirect based on field type
      if (fieldOption.name.toLowerCase() === "student") {
        router.push("/register/student/personal-info");
      } else {
        router.push("/register/company/company-info");
      }
    } catch (error) {
      console.error("Error saving field selection:", error);
    }
  };

  // Find specific field options
  const studentOption = fieldOptions.find(
    (option) => option.name.toLowerCase() === "student"
  );

  const companyOption = fieldOptions.find(
    (option) => option.name.toLowerCase() === "företag"
  );

  console.log("Field options:", fieldOptions);
  console.log("Student option:", studentOption);
  console.log("Company option:", companyOption);

  return (
    <div className="wrapper">
      <div className="image-container">
        <img src="/form-step-1.svg" alt="Progress bar step 1/6" />
      </div>
      <div className="registration-container">
        <h5>Är du student eller företag? *</h5>

        <div className="user-type-selection">
          {loading ? (
            <p>Laddar alternativ...</p>
          ) : (
            <>
              {companyOption && (
                <Button
                  text="Företag"
                  name="field"
                  value="företag"
                  className="primary"
                  variant="default"
                  color="blue"
                  onClick={() => handleFieldSelection(companyOption)}
                  //href="/register/company/company-info"
                />
              )}

              {studentOption && (
                <Button
                  text="Student"
                  name="field"
                  value="student"
                  className="primary"
                  variant="default"
                  color="blue"
                  onClick={() => handleFieldSelection(studentOption)}
                  //href="/register/student/personal-info"
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
