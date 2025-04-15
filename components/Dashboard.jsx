import '@/styles/components/dashboard.css';
import DashboardSearch from '@/components/DashboardSearch';
import ProfileCard from './ProfileCard';


const Dashboard = () => {

    return (
        <>
            <DashboardSearch />
            <ProfileCard/>
        </>
    );
}
export default Dashboard;