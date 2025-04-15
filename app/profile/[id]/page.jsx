/* 'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import ProfileView from '@/components/profile/ProfileView';
import ProfileEditForm from '@/components/profile/ProfileEditForm';

const supabase = createClient();

export default function ProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function load() {
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', id).single();
      setProfile(profile);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }

    load();
  }, [id]);

  //Mock data for testing

    useEffect(() => {

    async function load() {

        const profile = {

            id: 1,
            name: "John Doe",
        }
        setProfile(profil.id);

        const user = {

            id: 2,
            name: "Jane Doe",
        }
        setUser(user.id);
    }
    load();
    }
    , [id]);
    

  if (!profile || !user) return <p>Loading...</p>;

  const isOwner = profile.id === user.id;

  return isOwner ? <ProfileEditForm profile={profile} /> : <ProfileView profile={profile} />;
}
 */

import ProfileView from "@/components/profile/ProfileView";

const ProfilePage = () => {
    return (
        <section className="profile-page">
            <ProfileView />
        </section>
    );
}
export default ProfilePage;
//