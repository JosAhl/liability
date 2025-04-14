"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "/utils/supabase/server";

export async function registerStudent(formData) {
  const supabase = await createClient();

  // Extract values from the FormData object
  const email = formData.get("email");
  const password = formData.get("password");
  const field =
    formData.get("userType"); /* Table fields: "student" or "företag" */

  // For table "profiles"
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const avatar_url = formData.get("avatar_url");

  // For table "students"
  const telephone = formData.get("telephone_number");
  const description = formData.get("description");
  const github = formData.get("portfolio_github");
  const linkedin = formData.get("linkedin");
  const cv_url = formData.get("cv_url");
  const other_url = formData.get("other_url");
  const studyProgram = formData.get("studyProgram");

  // For table "profile_software" and "profile_extra_software"
  //const selectedPrograms = formData.getAll("selectedPrograms");
  const selectedPrograms = JSON.parse(formData.get("selectedPrograms"));

  // For table "profile_skill" and "profile_extra_skill"
  const selectedSkills = formData.getAll("selectedSkills");

  try {
    // Step 1: Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name,
          avatar_url,
        },
      },
    });

    if (error) {
      console.error("Signup error:", error.message);
      return redirect("/error");
    }

    const userId = data.user.id;
    console.log("User created with ID:", userId);

    // Short delay to ensure auth is complete
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Step 2: Insert student data
    if (field.toLowerCase() === "student") {
      const { error: studentError } = await supabase.from("students").insert([
        {
          profile_id: userId,
          telephone_number: telephone,
          description,
          portfolio_github: github,
          linkedin,
          cv_url,
          other_url,
          study_program: studyProgram,
        },
      ]);

      if (studentError) {
        console.error("Student insert error:", studentError.message);
        return redirect("/error");
      }

      console.log("Student data inserted successfully");
    }

    // Step 3: Insert into the "profile_field" table
    const { data: fieldData, error: fieldError } = await supabase
      .from("fields")
      .select("id")
      .eq("name", field)
      .single();

    if (fieldError || !fieldData) {
      console.error(
        "Field lookup error:",
        fieldError?.message || "Field not found"
      );
      return redirect("/error");
    }

    const fieldId = fieldData.id;

    const { error: profileFieldError } = await supabase
      .from("profile_field")
      .insert([
        {
          profile_id: userId,
          field_id: fieldId,
        },
      ]);

    if (profileFieldError) {
      console.error("Profile field insert error:", profileFieldError.message);
      return redirect("/error");
    }

    console.log(`Linked field "${field}" to user ${userId}`);

    // Process skills
    for (const skillName of selectedSkills) {
      let skillId = null;

      const { data: skillData, error: skillLookupError } = await supabase
        .from("skills")
        .select("id")
        .eq("name", skillName)
        .single();

      if (!skillLookupError && skillData) {
        // Found existing skill
        skillId = skillData.id;

        const { error: profileSkillError } = await supabase
          .from("profile_skill")
          .insert([{ profile_id: userId, skill_id: skillId }]);

        if (profileSkillError) {
          console.error(
            "Failed to link skill to profile:",
            profileSkillError.message
          );
        } else {
          console.log(`Linked skill "${skillName}" to user ${userId}`);
        }
      } else {
        // Skill not found, insert into extra_skills
        const { data: extraSkillData, error: extraSkillError } = await supabase
          .from("extra_skills")
          .insert([{ name: skillName }])
          .select("id")
          .single();

        if (extraSkillError) {
          console.error(
            "Failed to insert extra skill:",
            extraSkillError.message
          );
          continue;
        }

        const extraSkillId = extraSkillData.id;

        const { error: profileExtraSkillError } = await supabase
          .from("profile_extra_skill")
          .insert([{ profile_id: userId, extra_skill_id: extraSkillId }]);

        if (profileExtraSkillError) {
          console.error(
            "Failed to link extra skill to profile:",
            profileExtraSkillError.message
          );
        } else {
          console.log(`Linked EXTRA skill "${skillName}" to user ${userId}`);
        }
      }
    }

    // Step 4: Process selected programs (software)
    if (selectedPrograms && selectedPrograms.length > 0) {
      console.log("Processing selected programs:", selectedPrograms);

      // Fetch all software from the "software" table
      const { data: allSoftware, error: softwareError } = await supabase
        .from("software")
        .select("id, name");

      if (softwareError) {
        console.error(
          "Error fetching software from database:",
          softwareError.message
        );
        throw softwareError;
      }

      // Create a map of software names to IDs
      const softwareMap = new Map();
      allSoftware.forEach((software) => {
        softwareMap.set(software.name.toLowerCase(), software.id);
      });

      // Separate selected programs into known software and extra software
      const matchedSoftwareIds = [];
      const extraSoftwareNames = [];

      selectedPrograms.forEach((program) => {
        const normalizedProgram = program.toLowerCase();
        if (softwareMap.has(normalizedProgram)) {
          matchedSoftwareIds.push(softwareMap.get(normalizedProgram));
        } else {
          extraSoftwareNames.push(program);
        }
      });

      // Insert matched software into "profile_software"
      if (matchedSoftwareIds.length > 0) {
        const { error: profileSoftwareError } = await supabase
          .from("profile_software")
          .insert(
            matchedSoftwareIds.map((softwareId) => ({
              profile_id: userId,
              software_id: softwareId,
            }))
          );

        if (profileSoftwareError) {
          console.error(
            "Error inserting into profile_software:",
            profileSoftwareError.message
          );
          throw profileSoftwareError;
        }

        console.log(
          "Inserted matched software into profile_software:",
          matchedSoftwareIds
        );
      }

      // Handle extra software
      if (extraSoftwareNames.length > 0) {
        console.log("Processing extra software:", extraSoftwareNames);

        // Check if extra software already exists in the "extra_software" table
        const { data: existingExtras, error: existingExtrasError } =
          await supabase
            .from("extra_software")
            .select("id, name")
            .in("name", extraSoftwareNames);

        if (existingExtrasError) {
          console.error(
            "Error fetching existing extra software:",
            existingExtrasError.message
          );
          throw existingExtrasError;
        }

        // Create a map of existing extra software names to IDs
        const existingExtrasMap = new Map();
        existingExtras.forEach((extra) => {
          existingExtrasMap.set(extra.name.toLowerCase(), extra.id);
        });

        // Find new extra software to insert
        const newExtraSoftware = extraSoftwareNames.filter(
          (name) => !existingExtrasMap.has(name.toLowerCase())
        );

        // Insert new extra software into the "extra_software" table
        let insertedExtras = [];
        if (newExtraSoftware.length > 0) {
          const { data: newExtras, error: newExtrasError } = await supabase
            .from("extra_software")
            .insert(newExtraSoftware.map((name) => ({ name })))
            .select("id, name");

          if (newExtrasError) {
            console.error(
              "Error inserting new extra software:",
              newExtrasError.message
            );
            throw newExtrasError;
          }

          insertedExtras = newExtras;
          console.log("Inserted new extra software:", newExtras);
        }

        // Combine existing and newly inserted extra software
        const allExtras = [...existingExtras, ...insertedExtras];

        // Insert into "profile_extra_software"
        const { error: profileExtraSoftwareError } = await supabase
          .from("profile_extra_software")
          .insert(
            allExtras.map((extra) => ({
              profile_id: userId,
              extra_software_id: extra.id,
            }))
          );

        if (profileExtraSoftwareError) {
          console.error(
            "Error inserting into profile_extra_software:",
            profileExtraSoftwareError.message
          );
          throw profileExtraSoftwareError;
        }

        console.log(
          "Inserted extra software into profile_extra_software:",
          allExtras
        );
      }
    }

    revalidatePath("/", "layout");
    return redirect("/login");
  } catch (err) {
    console.error("Unexpected error:", err);
    return redirect("/error");
  }
}
