'use server';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "/utils/supabase/server";

// Function to handle student registration
export async function registerStudent(formData) {
  const supabase = await createClient();

  // Extract common auth values
  const email = formData.get("email");
  const password = formData.get("password");

  const fields = formData.getAll("fields"); /* from fields table */
  
  // Extract student-specific values
  const first_name = formData.get("first_name"); /* from profiles table */
  const last_name = formData.get("last_name"); /* from profiles table */
  const telephone_number = formData.get("telephone_number"); /* from students table */
  const software = formData.getAll("software"); // For multiple checkboxes /* from software table */
  const focus_areas = formData.getAll("focus_areas"); /* from focus_areas table */
  const skills = formData.get("skills"); /* from skills table */

  console.log("Attempting student registration:", { email, first_name, last_name });

  try {
    // Step 1: Sign up the user in Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: first_name,
          last_name: last_name
        },
      },
    });

    if (error) {
      console.error("Student signup error:", error.message);
      return redirect("/register/error?message=" + encodeURIComponent(error.message));
    }

    const userId = data.user.id;
    console.log("Student user created with ID:", userId);

    // Small delay to ensure auth is processed
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Step 2: Insert student profile data
    const { error: profileError } = await supabase
      .from("student_profiles") // Create this table in Supabase
      .insert([{ 
        id: userId,
        first_name: first_name,
        last_name: last_name,
        email: email,
        telephone_number: telephone_number,
        software: software,
        skills: skills,
        registration_date: new Date().toISOString()
      }]);

    if (profileError) {
      console.error("Student profile insert error:", profileError.message, profileError.details);
      return redirect("/register/error?message=" + encodeURIComponent("Error creating profile"));
    }

    console.log("Student profile created successfully");
    revalidatePath("/", "layout");
    return redirect("/register/success");
  } catch (err) {
    console.error("Unexpected error:", err);
    return redirect("/register/error");
  }
}
/*
// Function to handle company registration
export async function registerCompany(formData) {
  const supabase = await createClient();

  // Extract common auth values
  const email = formData.get("email");
  const password = formData.get("password");
  
  // Extract company-specific values
  const companies = formData.get("companies");
  const contactPerson = formData.get("contactPerson");
  const phone = formData.get("phone");
  const industry = formData.get("industry");
  // Add any other company-specific fields

  console.log("Attempting company registration:", { email, companyName, contactPerson });

  try {
    // Step 1: Sign up the user in Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          company_name: companyName,
          contact_person: contactPerson,
          user_type: "company"
        },
      },
    });

    if (error) {
      console.error("Company signup error:", error.message);
      return redirect("/register/error?message=" + encodeURIComponent(error.message));
    }

    const userId = data.user.id;
    console.log("Company user created with ID:", userId);

    // Small delay to ensure auth is processed
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Step 2: Insert company profile data
    const { error: profileError } = await supabase
      .from("company_profiles") // Create this table in Supabase
      .insert([{ 
        id: userId,
        company_name: companyName,
        contact_person: contactPerson,
        email: email,
        phone: phone,
        industry: industry,
        registration_date: new Date().toISOString()
      }]);

    if (profileError) {
      console.error("Company profile insert error:", profileError.message, profileError.details);
      return redirect("/register/error?message=" + encodeURIComponent("Error creating profile"));
    }

    console.log("Company profile created successfully");
    revalidatePath("/", "layout");
    return redirect("/register/success");
  } catch (err) {
    console.error("Unexpected error:", err);
    return redirect("/register/error");
  }
}
*/