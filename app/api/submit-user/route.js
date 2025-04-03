import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server"; // Import your Supabase server client

export async function POST(req) {
  const supabase = createClient();
  const body = await req.json();

  try {
    // 1️⃣ Insert into `users` table
    const { data: user, error: userError } = await supabase
      .from("profiles")
      .insert([
        {
          first_name: body.firstName,
          last_name: body.lastName
        },
      ])
      .select()
      .single();

    if (userError) throw userError;

    console.log("Inserted data to profiles table")

    const userId = user.id; // Get the inserted user's ID

    console.log(userId)


/* 
    // 2️⃣ Insert into `user_software` (Junction table for programs)
    const programEntries = body.selectedPrograms.map((programName) => ({
      user_id: userId,
      software_name: programName, // Assuming "software" table has a unique "name"
    }));

    if (programEntries.length > 0) {
      const { error: programError } = await supabase
        .from("user_software")
        .insert(programEntries);
      if (programError) throw programError;
    }

    // 3️⃣ Insert into `user_skills` (Junction table for skills)
    const skillEntries = body.selectedSkills.map((skillName) => ({
      user_id: userId,
      skill_name: skillName, // Assuming "skills" table has a unique "name"
    }));

    if (skillEntries.length > 0) {
      const { error: skillError } = await supabase.from("user_skills").insert(skillEntries);
      if (skillError) throw skillError;
    } */

    return NextResponse.json({ message: "User registered successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Database insert error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
