import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ProfessionalDashboard = () => {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');

    // Mock patient data - in production, this would come from API
    const patients = [
        { id: 1, name: 'John Smith', status: 'stable', lastCheck: '2 hours ago', vitals: 'Normal', age: 45 },
        { id: 2, name: 'Sarah Johnson', status: 'attention', lastCheck: '5 hours ago', vitals: 'BP elevated', age: 62 },
        { id: 3, name: 'Mike Wilson', status: 'stable', lastCheck: '1 day ago', vitals: 'Normal', age: 38 },
        { id: 4, name: 'Emily Davis', status: 'action', lastCheck: '3 hours ago', vitals: 'Multiple alerts', age: 55 },
        { id: 5, name: 'Robert Brown', status: 'stable', lastCheck: '6 hours ago', vitals: 'Normal', age: 29 },
    ];

    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'stable': return '#33c091';
            case 'attention': return '#f0ad4e';
            case 'action': return '#d9534f';
            default: return '#6c757d';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'stable': return 'Stable';
            case 'attention': return 'Needs Attention';
            case 'action': return 'Action Required';
            default: return 'Unknown';
        }
    };

    const stats = {
        totalPatients: patients.length,
        needsAttention: patients.filter(p => p.status === 'attention').length,
        actionRequired: patients.filter(p => p.status === 'action').length,
        stable: patients.filter(p => p.status === 'stable').length,
    };

    return (
        <>
            {/* Header */}
            <div className="dashboard-header">
                <div className="row align-items-center">
                    <div className="col-md-8">
                        <span className="role-badge">Healthcare Professional</span>
                        <h1>Welcome, Dr. {user?.name?.split(' ')[0] || 'Professional'}! 👨‍⚕️</h1>
                        <p className="text-muted">Monitor your patients' health status</p>
                    </div>
                    <div className="col-md-4 text-md-end">
                        <button className="btn btn-primary">
                            <i className="bi bi-person-plus me-2"></i>
                            Add Patient
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="row mt-4 g-3">
                <div className="col-6 col-md-3">
                    <div className="stats-card">
                        <div className="stats-icon" style={{ background: 'rgba(51, 192, 145, 0.1)' }}>
                            <i className="bi bi-people" style={{ color: '#33c091' }}></i>
                        </div>
                        <div className="stats-content">
                            <span className="stats-value">{stats.totalPatients}</span>
                            <span className="stats-label">Total Patients</span>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="stats-card">
                        <div className="stats-icon" style={{ background: 'rgba(51, 192, 145, 0.1)' }}>
                            <i className="bi bi-check-circle" style={{ color: '#33c091' }}></i>
                        </div>
                        <div className="stats-content">
                            <span className="stats-value">{stats.stable}</span>
                            <span className="stats-label">Stable</span>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="stats-card">
                        <div className="stats-icon" style={{ background: 'rgba(240, 173, 78, 0.1)' }}>
                            <i className="bi bi-exclamation-circle" style={{ color: '#f0ad4e' }}></i>
                        </div>
                        <div className="stats-content">
                            <span className="stats-value">{stats.needsAttention}</span>
                            <span className="stats-label">Needs Attention</span>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="stats-card">
                        <div className="stats-icon" style={{ background: 'rgba(217, 83, 79, 0.1)' }}>
                            <i className="bi bi-exclamation-triangle" style={{ color: '#d9534f' }}></i>
                        </div>
                        <div className="stats-content">
                            <span className="stats-value">{stats.actionRequired}</span>
                            <span className="stats-label">Action Required</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Patient Search */}
            <div className="search-section mt-4">
                <div className="search-box">
                    <i className="bi bi-search"></i>
                    <input
                        type="text"
                        placeholder="Search patients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-control"
                    />
                </div>
            </div>

            {/* Patient List */}
            <div className="patient-list mt-4">
                <h3>Patient Overview</h3>
                <div className="row g-3">
                    {filteredPatients.map(patient => (
                        <div key={patient.id} className="col-md-6 col-lg-4">
                            <div className="patient-card">
                                <div className="patient-header">
                                    <div className="patient-avatar">
                                        {patient.name.charAt(0)}
                                    </div>
                                    <div className="patient-info">
                                        <h4>{patient.name}</h4>
                                        <span className="patient-age">Age: {patient.age}</span>
                                    </div>
                                    <span
                                        className="patient-status"
                                        style={{ backgroundColor: getStatusColor(patient.status) }}
                                    >
                                        {getStatusLabel(patient.status)}
                                    </span>
                                </div>
                                <div className="patient-details">
                                    <div className="detail-row">
                                        <i className="bi bi-heart-pulse"></i>
                                        <span>{patient.vitals}</span>
                                    </div>
                                    <div className="detail-row">
                                        <i className="bi bi-clock"></i>
                                        <span>Last check: {patient.lastCheck}</span>
                                    </div>
                                </div>
                                <div className="patient-actions">
                                    <button className="btn btn-sm btn-secondary">View Details</button>
                                    <button className="btn btn-sm btn-primary">Contact</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="micro-actions-section mt-4">
                <h3>Quick Actions</h3>
                <div className="row g-3">
                    <div className="col-6 col-md-3">
                        <div className="micro-action-card">
                            <i className="bi bi-calendar-check"></i>
                            <span>Schedule Check-up</span>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="micro-action-card">
                            <i className="bi bi-file-medical"></i>
                            <span>View Reports</span>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="micro-action-card">
                            <i className="bi bi-bell"></i>
                            <span>Set Alerts</span>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="micro-action-card">
                            <i className="bi bi-chat-dots"></i>
                            <span>Messages</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfessionalDashboard;
