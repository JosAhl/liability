'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Dashboard from '@/components/Dashboard';
/* import ProfileCard from '@/components/dashboard/ProfileCard';
import Filters from '@/components/dashboard/Filters';
 */

const supabase = createClient();

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState(null); // "students" or "companies"
  const [data, setData] = useState([]);

/*   useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = '/login';
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', user.id)
        .single();

      setUser({ ...user, ...profile });

      const defaultView = profile.user_type === 'student' ? 'companies' : 'students';
      setView(defaultView);
    }

    loadUser();
  }, []);

  useEffect(() => {
    if (view) {
      supabase
        .from('profiles')
        .select('*')
        .eq('user_type', view.slice(0, -1)) // "students" -> "student"
        .then(({ data }) => setData(data));
    }
  }, [view]);

  if (!user || !view) return <p>Loading...</p>; */

  return (
    <>

        <section className="dashboard-container">
            <Dashboard />
        {/*  <h1>{view === 'students' ? 'Students' : 'Companies'}</h1>
        <button onClick={() => setView(view === 'students' ? 'companies' : 'students')}>
            Switch to {view === 'students' ? 'Companies' : 'Students'}
        </button> */}

        {/*  <Filters /> */}

            

        <div className="profile-list">
            {data.map(profile => (
            <ProfileCard key={profile.id} profile={profile} currentUser={user} />
            ))}
        </div>
        </section>
    </>
  );
}
