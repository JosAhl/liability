"use client"

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client"; // Import your client setup

export default function Dashboard() {
  const [programs, setPrograms] = useState([]); // State to store fetched programs
  const [selectedPrograms, setSelectedPrograms] = useState([]); // State for selected programs
  const [skills, setSkills] = useState([]); // State to store fetched skills
  const [selectedSkills, setSelectedSkills] = useState([]); // State for selected skills
  const [newSoftware, setNewSoftware] = useState(""); // State for user inputted software
  const [newSkill, setNewSkill] = useState(""); // State for user inputted skill

  const [profileImage, setProfileImage] = useState(null); // State to store the profile image
  const [profileImagePreview, setProfileImagePreview] = useState(null); // State to store the preview URL


  // Fetch programs from Supabase
  useEffect(() => {
    async function fetchPrograms() {
      const supabase = createClient(); // Create a client for fetching data
      const { data, error } = await supabase.from("software").select("name");
      
      if (error) {
        console.error("Error fetching programs:", error);
      } else {
        setPrograms(data); // Set programs if fetch was successful
      }
    }

    fetchPrograms();
  }, []);

  // Fetch skills from Supabase
  useEffect(() => {
    async function fetchSkills() {
      const supabase = createClient(); // Create a client for fetching data
      const { data, error } = await supabase.from("skills").select("name");
      
      if (error) {
        console.error("Error fetching skills:", error);
      } else {
        setSkills(data); // Set skills if fetch was successful
      }
    }

    fetchSkills();
  }, []);

  // Handle checkbox changes for software (programs)
  const handleCheckboxChange = (programName, type) => {
    if (type === "program") {
      setSelectedPrograms((prev) =>
        prev.includes(programName)
          ? prev.filter((name) => name !== programName) // Remove program if already selected
          : [...prev, programName] // Add program if not selected
      );
    } else if (type === "skill") {
      setSelectedSkills((prev) =>
        prev.includes(programName)
          ? prev.filter((name) => name !== programName) // Remove skill if already selected
          : [...prev, programName] // Add skill if not selected
      );
    }
  };

  // Handle adding user input software
  const handleAddSoftware = () => {
    if (newSoftware && !programs.some(program => program.name === newSoftware)) {
      // Add the new software to the programs list and select it by default
      setPrograms(prevPrograms => [
        ...prevPrograms,
        { name: newSoftware } // Add to programs list
      ]);
      setSelectedPrograms(prev => [...prev, newSoftware]); // Add to selected programs
      setNewSoftware(""); // Clear input field
    }
  };

  // Handle adding user input skill
  const handleAddSkill = () => {
    if (newSkill && !skills.some(skill => skill.name === newSkill)) {
      // Add the new skill to the skills list and select it by default
      setSkills(prevSkills => [
        ...prevSkills,
        { name: newSkill } // Add to skills list
      ]);
      setSelectedSkills(prev => [...prev, newSkill]); // Add to selected skills
      setNewSkill(""); // Clear input field
    }
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);

      // Generate a preview
      const reader = new FileReader();
      reader.onloadend = () => setProfileImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };    

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Gather all form data
    const formData = new FormData(event.target);
    const userData = {
      firstName: formData.get("first_name"),
      lastName: formData.get("last_name"),
      email: formData.get("email"),
      telephone: formData.get("telephone"),
      studyProgram: formData.get("studyProgram"),
      description: formData.get("description"),
      github: formData.get("portfolio-github"),
      linkedin: formData.get("linkedin"),
      selectedPrograms,
      selectedSkills,
    };
  
    console.log("User Data:", userData);
  
    // Send data to API route for database insertion
    const response = await fetch("/api/submit-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  
    if (response.ok) {
      alert("Registration successful!");
    } else {
      alert("Error submitting data.");
    }
  };
  
  

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* First part of the form */}
        <label htmlFor="first_name">First name</label>
        <input type="text" name="first_name" id="first_name" />
        <label htmlFor="last_name">Last name</label>
        <input type="text" name="last_name" id="last_name" />
        <label htmlFor="telephone">Telephone</label>
        <input type="tel" name="telephone" id="telephone" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />

        <fieldset>
            <legend>Vad pluggar du?</legend>
            <div>
                <input type="radio" name="studyProgram" id="DD" value="DD" />
                <label htmlFor="DD">DD</label>
            </div>
            <div>
                <input type="radio" name="studyProgram" id="WU" value="WU" />
                <label htmlFor="WU">WU</label>
            </div>
        </fieldset>

        {/* Software programs section */}
        <fieldset>
          <legend>Software Programs</legend>
          {programs.length > 0 ? (
            programs.map((program) => (
              <label key={program.name} style={{ display: "block", marginBottom: "8px" }}>
                <input
                  type="checkbox"
                  value={program.name}
                  checked={selectedPrograms.includes(program.name)} // Preselect if in selectedPrograms
                  onChange={() => handleCheckboxChange(program.name, "program")} // Handle checkbox changes
                />
                {program.name}
              </label>
            ))
          ) : (
            <p>Loading programs...</p>
          )}
          {/* Input for adding custom software */}
          <label htmlFor="addSoftware">Add software</label>
          <input
            type="text"
            name="addSoftware"
            id="addSoftware"
            value={newSoftware}
            onChange={(e) => setNewSoftware(e.target.value)} // Update the new software state
          />
          <button type="button" onClick={handleAddSoftware}>Add</button> {/* Add button */}
        </fieldset>

        {/* Skills section */}
        <fieldset>
          <legend>Skills</legend>
          {skills.length > 0 ? (
            skills.map((skill) => (
              <label key={skill.name} style={{ display: "block", marginBottom: "8px" }}>
                <input
                  type="checkbox"
                  value={skill.name}
                  checked={selectedSkills.includes(skill.name)} // Preselect if in selectedSkills
                  onChange={() => handleCheckboxChange(skill.name, "skill")} // Handle checkbox changes
                />
                {skill.name}
              </label>
            ))
          ) : (
            <p>Loading skills...</p>
          )}
          {/* Input for adding custom skill */}
          <label htmlFor="addSkill">Add skill</label>
          <input
            type="text"
            name="addSkill"
            id="addSkill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)} // Update the new skill state
          />
          <button type="button" onClick={handleAddSkill}>Add</button> {/* Add button */}
        </fieldset>

        <fieldset>
          <legend>Profile Picture</legend>
          {profileImagePreview && (
            <img
              src={profileImagePreview}
              alt="Profile Preview"
              style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", marginBottom: "10px" }}
            />
          )}
          <input type="file" accept="image/*" onChange={handleProfileImageChange} />
        </fieldset>

        <label htmlFor="description">Kort beskrivning om dig</label>
        <input type="text" name="description" id="description"/>

        <label htmlFor="portfolio-github">portfolio-github</label>
        <input type="url" name="portfolio-github" id="portfolio-github"/>

        <label htmlFor="linkedin">linkedin</label>
        <input type="url" name="linkedin" id="linkedin"/>

        <label htmlFor="cv">CV</label>
        <input type="file" name="cv" id="cv" accept=".pdf" />

        <label htmlFor="övrigt">övrigt</label>
        <input type="file" name="övrigt" id="övrigt" accept=".pdf" />

        {/* Submit button */}
        <button type="submit" style={{ marginTop: "12px" }}>Register</button>
      </form>
    </>
  );
}
