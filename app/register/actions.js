"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "/utils/supabase/server";

export async function registerStudent(formData) {
  const supabase = await createClient();

  // Extract values from the FormData object
  const email = formData.get("email");
  const password = formData.get("password");
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const telephone = formData.get("telephone");
  const studyProgram = formData.get("studyProgram");
  const description = formData.get("description");
  const github = formData.get("portfolio-github");
  const linkedin = formData.get("linkedin");
  const selectedPrograms = formData.getAll("selectedPrograms");
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

    // Insert student data
    const { error: studentError } = await supabase.from("students").insert([
      {
        telephone_number: telephone,
        description: description,
        linkedin: linkedin,
        profile_id: userId,
        portfolio_github: github,
        study_program: studyProgram,
      },
    ]);

    if (studentError) {
      console.error(
        "Student insert error:",
        studentError.message,
        studentError.details
      );
    } else {
      console.log("Student created successfully");
    }

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

    // Process software/programs
    for (const softwareName of selectedPrograms) {
      let softwareId = null;

      const { data: softwareData, error: softwareLookupError } = await supabase
        .from("software")
        .select("id")
        .eq("name", softwareName)
        .single();

      if (!softwareLookupError && softwareData) {
        // Found existing software
        softwareId = softwareData.id;

        const { error: profileSoftwareError } = await supabase
          .from("profile_software")
          .insert([{ profile_id: userId, software_id: softwareId }]);

        if (profileSoftwareError) {
          console.error(
            "Failed to link software to profile:",
            profileSoftwareError.message
          );
        } else {
          console.log(`Linked software "${softwareName}" to user ${userId}`);
        }
      } else {
        // Software not found, insert into extra_software
        const { data: extraSoftwareData, error: extraSoftwareError } =
          await supabase
            .from("extra_software")
            .insert([{ name: softwareName }])
            .select("id")
            .single();

        if (extraSoftwareError) {
          console.error(
            "Failed to insert extra software:",
            extraSoftwareError.message
          );
          continue;
        }

        const extraSoftwareId = extraSoftwareData.id;
        const { error: profileExtraSoftwareError } = await supabase
          .from("profile_extra_software")
          .insert([{ profile_id: userId, extra_software_id: extraSoftwareId }]);

        if (profileExtraSoftwareError) {
          console.error(
            "Failed to link extra software to profile:",
            profileExtraSoftwareError.message
          );
        } else {
          console.log(
            `Linked EXTRA software "${softwareName}" to user ${userId}`
          );
        }
      }
    }

    revalidatePath("/", "layout");
    return redirect("/login");
  } catch (err) {
    console.error("Unexpected error:", err);
    return redirect("/error");
  }
}
