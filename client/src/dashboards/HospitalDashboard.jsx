import { useAuth } from '../context/AuthContext';

const HospitalDashboard = () => {
    const { user } = useAuth();

    // Mock data - in production, this would come from API
    const departmentStats = [
        { name: 'General Medicine', patients: 45, staff: 12, status: 'normal' },
        { name: 'Cardiology', patients: 28, staff: 8, status: 'busy' },
        { name: 'Pediatrics', patients: 32, staff: 10, status: 'normal' },
        { name: 'Emergency', patients: 15, staff: 6, status: 'critical' },
    ];

    const overviewStats = {
        totalPatients: 120,
        totalStaff: 36,
        bedOccupancy: 78,
        alertsToday: 5,
    };

    const recentAlerts = [
        { id: 1, message: 'Emergency department at 90% capacity', type: 'warning', time: '10 min ago' },
        { id: 2, message: 'New patient admission in Cardiology', type: 'info', time: '25 min ago' },
        { id: 3, message: 'Staff rotation scheduled for 3 PM', type: 'info', time: '1 hour ago' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'normal': return '#33c091';
            case 'busy': return '#f0ad4e';
            case 'critical': return '#d9534f';
            default: return '#6c757d';
        }
    };

    const getAlertIcon = (type) => {
        switch (type) {
            case 'warning': return 'bi-exclamation-triangle-fill';
            case 'info': return 'bi-info-circle-fill';
            case 'critical': return 'bi-x-circle-fill';
            default: return 'bi-bell-fill';
        }
    };

    const getAlertColor = (type) => {
        switch (type) {
            case 'warning': return '#f0ad4e';
            case 'info': return '#0d6efd';
            case 'critical': return '#d9534f';
            default: return '#6c757d';
        }
    };

    return (
        <>
            {/* Header */}
            <div className="dashboard-header">
                <div className="row align-items-center">
                    <div className="col-md-8">
                        <span className="role-badge hospital-badge">Hospital Admin</span>
                        <h1>Welcome, {user?.name || 'Admin'}! 🏥</h1>
                        <p className="text-muted">Hospital operations overview</p>
                    </div>
                    <div className="col-md-4 text-md-end">
                        <button className="btn btn-primary">
                            <i className="bi bi-download me-2"></i>
                            Export Reports
                        </button>
                    </div>
                </div>
            </div>

            {/* Overview Stats */}
            <div className="row mt-4 g-3">
                <div className="col-6 col-md-3">
                    <div className="stats-card">
                        <div className="stats-icon" style={{ background: 'rgba(51, 192, 145, 0.1)' }}>
                            <i className="bi bi-people" style={{ color: '#33c091' }}></i>
                        </div>
                        <div className="stats-content">
                            <span className="stats-value">{overviewStats.totalPatients}</span>
                            <span className="stats-label">Total Patients</span>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="stats-card">
                        <div className="stats-icon" style={{ background: 'rgba(13, 110, 253, 0.1)' }}>
                            <i className="bi bi-person-badge" style={{ color: '#0d6efd' }}></i>
                        </div>
                        <div className="stats-content">
                            <span className="stats-value">{overviewStats.totalStaff}</span>
                            <span className="stats-label">Staff Members</span>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="stats-card">
                        <div className="stats-icon" style={{ background: 'rgba(240, 173, 78, 0.1)' }}>
                            <i className="bi bi-hospital" style={{ color: '#f0ad4e' }}></i>
                        </div>
                        <div className="stats-content">
                            <span className="stats-value">{overviewStats.bedOccupancy}%</span>
                            <span className="stats-label">Bed Occupancy</span>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="stats-card">
                        <div className="stats-icon" style={{ background: 'rgba(217, 83, 79, 0.1)' }}>
                            <i className="bi bi-bell" style={{ color: '#d9534f' }}></i>
                        </div>
                        <div className="stats-content">
                            <span className="stats-value">{overviewStats.alertsToday}</span>
                            <span className="stats-label">Alerts Today</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Department Overview */}
            <div className="row mt-4">
                <div className="col-lg-8">
                    <div className="status-card">
                        <div className="status-header">
                            <h3>Department Overview</h3>
                            <button className="btn btn-sm btn-secondary">View All</button>
                        </div>
                        <div className="department-grid">
                            {departmentStats.map((dept, index) => (
                                <div key={index} className="department-item">
                                    <div className="dept-header">
                                        <h4>{dept.name}</h4>
                                        <span
                                            className="dept-status"
                                            style={{ backgroundColor: getStatusColor(dept.status) }}
                                        >
                                            {dept.status}
                                        </span>
                                    </div>
                                    <div className="dept-stats">
                                        <div className="dept-stat">
                                            <i className="bi bi-people"></i>
                                            <span>{dept.patients} patients</span>
                                        </div>
                                        <div className="dept-stat">
                                            <i className="bi bi-person-badge"></i>
                                            <span>{dept.staff} staff</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Alerts */}
                <div className="col-lg-4">
                    <div className="status-card">
                        <div className="status-header">
                            <h3>Recent Alerts</h3>
                            <span className="entries-badge">{recentAlerts.length} new</span>
                        </div>
                        <div className="alerts-list">
                            {recentAlerts.map(alert => (
                                <div key={alert.id} className="alert-item">
                                    <i
                                        className={`bi ${getAlertIcon(alert.type)}`}
                                        style={{ color: getAlertColor(alert.type) }}
                                    ></i>
                                    <div className="alert-content">
                                        <p>{alert.message}</p>
                                        <span className="alert-time">{alert.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="micro-actions-section mt-4">
                <h3>Admin Actions</h3>
                <div className="row g-3">
                    <div className="col-6 col-md-3">
                        <div className="micro-action-card">
                            <i className="bi bi-people"></i>
                            <span>Manage Staff</span>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="micro-action-card">
                            <i className="bi bi-building"></i>
                            <span>Departments</span>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="micro-action-card">
                            <i className="bi bi-graph-up"></i>
                            <span>Analytics</span>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="micro-action-card">
                            <i className="bi bi-gear"></i>
                            <span>Settings</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HospitalDashboard;
