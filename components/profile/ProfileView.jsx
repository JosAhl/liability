"use client"; 

import "@/styles/components/profile-view.css";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client.js";

const ProfileView = () => {

    const [profile, setProfile] = useState(null);

    async function fetchProfile() {
        try {
          const supabase = createClient();
      
          const { data, error } = await supabase
          .from("profiles")
          .select(`
            *,
            students(*),
            profile_software(
              *,
              software(*)
            ),
            profile_extra_software(
              *,
              extra_software(*)
            ),
            profile_skill(
              *,
              skills(*)
            ),
            profile_extra_skill(
              *,
              extra_skills(*)
            ),
            profile_field(
              *,
              fields(*)
            )
          `)
          .eq("id", "c789e175-af3f-4fda-9252-8afa959d32f3");
        
      
          if (error) throw error;
      
          if (data && data.length > 0) {
            setProfile(data[0]);
            console.log("Profile data:", data[0]);
          } else {
            console.log("No profile found.");
          }
      
        } catch (error) {
          console.error("Error fetching profile:", error.message || error);
        }
      }
      
    useEffect(() => {
        fetchProfile();
    }, []);

    const student = profile?.students?.[0];

    const allSoftware = [
        ...(profile?.profile_software || []).map(item => item.software?.name),
        ...(profile?.profile_extra_software || []).map(item => item.extra_software?.name),
      ].filter(Boolean); 

    const allSkills = [
        ...(profile?.profile_skill || []).map((item) => item.skills?.name),
        ...(profile?.profile_extra_skill || []).map((item) => item.extra_skills?.name),
      ].filter(Boolean);

      const supabaseID = "xfrzjsoxmayndxxygssl";
      const avatarPath = profile?.avatar_url;
      const avatarUrl = `https://${supabaseID}.supabase.co/storage/v1/object/sign/${avatarPath}`;
      
    console.log("Avatar URL:", avatarUrl);

    if (!profile) return <p>Laddar profil...</p>;

    return (
        <section className="profile-view">
      
          {/* Actions */}
          <div className="profile-view-actions">
            <button className="btn"><img src="/icon/export.png" alt="" /><p className="action-p">Exportera profil</p></button>
            <button className="btn"><img src="/icon/edit.png" alt="" /><p className="action-p">Redigera profil</p></button>
            <button className="btn"><img src="/icon/delete.png" alt="" /><p className="action-p">Radera profil</p></button>
          </div>
      
          {/* Header */}
          <div className="profile-view-header">
            <div className="profile-view-header-text">
              <h1 className="profile-view-header-h1">
                {profile?.first_name} {profile?.last_name}
              </h1>
              <h2 className="profile-view-header-h2">{profile?.profile_field?.[0]?.fields?.name}</h2>
            </div>
            <img className="profile-view-header-img" src={avatarUrl} alt="" />
          </div>
      
          {/* Kompetenser */}
          <div className="profile-view-competences">
            <h3 className="profile-competence-h3">Kompetenser</h3>
            <div className="compentence-container">
                {allSkills.map((skill, index) => (
                    <div className="competence" key={index}>
                        {skill}
                    </div>
                ))}
            </div>
          </div>
      
          {/* Programvaror */}
          <div className="profile-view-software">
            <h3 className="profile-software-h3">Programvaror</h3>
            <div className="software-container">
            {allSoftware.map((software, index) => (
      <div className="software" key={index}>
        {software}
      </div>
    ))}
            </div>
          </div>
      
          {/* About */}
          {student?.description && (
            <div className="profile-view-about">
                <h3 className="profile-about-h3">Om mig</h3>
                <p className="profile-about-p">{student.description}</p>
            </div>
        )}
      
          {/* Contact */}
          {(student?.telephone_number || profile?.email || student?.linkedin) && (
          <div className="profile-view-contact">
            <h3 className="profile-contact-h3">Kontakt</h3>
            <div className="profile-contact-data">
            {student?.telephone_number && (
            <a href={`tel:${student.telephone_number}`}>
                <img src="/icon/Phone.png" alt="" />
                {student.telephone_number}
            </a>
            )}

            {profile?.email && (
            <a href={`mailto:${profile.email}`}>
                <img src="/icon/contact-envelope.png" alt="" />
                {profile.email}
            </a>
            )}

            {student?.linkedin && (
            <a href={student.linkedin} target="_blank" rel="noopener noreferrer">
                <img src="/icon/contact-linkedinLogo.png" alt="" />
                {student.linkedin}
            </a>
            )}
            </div>
          </div> )}
      
          {/* Merits */}
          {(student?.linkedin || student?.portfolio_github) && (
            <div className="profile-view-merits">
                <h3 className="profile-merits-h3">Meriter</h3>
                <div className="merit-container">
                {student?.linkedin && (
                    <div className="merit">
                    <a href={student.linkedin} target="_blank">
                        LinkedIn-profil
                    </a>
                    </div>
                )}
                {student?.portfolio_github && (
                    <div className="merit">
                    <a href={student.portfolio_github} target="_blank">
                        GitHub/Portfolio
                    </a>
                    </div>
                )}
                </div>
            </div>
)}

      
        </section>
      );
    }      

export default ProfileView;