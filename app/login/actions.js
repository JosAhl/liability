"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "/utils/supabase/server";

export async function login(formData) {
  const supabase = await createClient();
  // Your login logic here
  console.log("Logging in:", formData);
}

export async function signup(formData) {
  const supabase = await createClient();

  // Extract values before using them
  const email = formData.get("email");
  const password = formData.get("password");
  const first_name = formData.get("first_name");

  console.log("Attempting signup with:", { email, first_name }); // Log for debugging

  try {
    // Step 1: Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name, // Store in user metadata as a backup
        },
      },
    });

    if (error) {
      console.error("Signup error:", error.message);
      return redirect("/error");
    }

    const userId = data.user.id;
    console.log("User created with ID:", userId);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const { error: profileError } = await supabase
      .from("profiles")
      .insert([{ id: userId, first_name }]);

    if (profileError) {
      console.error(
        "Profile insert error:",
        profileError.message,
        profileError.details
      );
    } else {
      console.log("Profile created successfully");
    }

    revalidatePath("/", "layout");
    return redirect("/");
  } catch (err) {
    console.error("Unexpected error:", err);
    return redirect("/error");
  }
}
