import { useAuth } from '../context/AuthContext';
import IndividualDashboard from '../dashboards/IndividualDashboard';
import ProfessionalDashboard from '../dashboards/ProfessionalDashboard';
import HospitalDashboard from '../dashboards/HospitalDashboard';

const Dashboard = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <main className="main">
                <section className="dashboard-section">
                    <div className="container">
                        <div className="loading-screen">
                            <div className="spinner"></div>
                            <p>Loading your dashboard...</p>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    // Render dashboard based on user role
    const renderDashboard = () => {
        switch (user?.role) {
            case 'professional':
                return <ProfessionalDashboard />;
            case 'hospital':
                return <HospitalDashboard />;
            case 'individual':
            default:
                return <IndividualDashboard />;
        }
    };

    return (
        <main className="main">
            <section className="dashboard-section">
                <div className="container">
                    {renderDashboard()}
                </div>
            </section>
        </main>
    );
};

export default Dashboard;
