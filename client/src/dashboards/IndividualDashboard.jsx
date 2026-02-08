import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const IndividualDashboard = () => {
    const { user } = useAuth();
    const [todayStatus, setTodayStatus] = useState(null);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showVitalsForm, setShowVitalsForm] = useState(false);
    const [vitalsForm, setVitalsForm] = useState({
        heartRate: '',
        systolic: '',
        diastolic: '',
        steps: '',
        sleep: '',
        energy: '5',
        mood: 'good'
    });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchHealthData();
    }, []);

    const fetchHealthData = async () => {
        try {
            const [todayRes, summaryRes] = await Promise.all([
                axios.get(`${API_URL}/health/today`),
                axios.get(`${API_URL}/health/summary`)
            ]);
            setTodayStatus(todayRes.data);
            setSummary(summaryRes.data);
        } catch (error) {
            console.error('Error fetching health data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVitalsChange = (e) => {
        setVitalsForm({ ...vitalsForm, [e.target.name]: e.target.value });
    };

    const handleSubmitVitals = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage('');

        try {
            const vitals = {
                heartRate: vitalsForm.heartRate ? parseInt(vitalsForm.heartRate) : undefined,
                bloodPressure: vitalsForm.systolic && vitalsForm.diastolic ? {
                    systolic: parseInt(vitalsForm.systolic),
                    diastolic: parseInt(vitalsForm.diastolic)
                } : undefined,
                steps: vitalsForm.steps ? parseInt(vitalsForm.steps) : undefined,
                sleep: vitalsForm.sleep ? parseFloat(vitalsForm.sleep) : undefined,
                energy: parseInt(vitalsForm.energy),
                mood: vitalsForm.mood
            };

            await axios.post(`${API_URL}/health/vitals`, { vitals });

            setMessage('Vitals recorded successfully!');
            setShowVitalsForm(false);
            setVitalsForm({
                heartRate: '',
                systolic: '',
                diastolic: '',
                steps: '',
                sleep: '',
                energy: '5',
                mood: 'good'
            });

            fetchHealthData();
        } catch (error) {
            setMessage('Error recording vitals. Please try again.');
            console.error('Error submitting vitals:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'stable': return '#33c091';
            case 'attention': return '#f0ad4e';
            case 'action': return '#d9534f';
            default: return '#6c757d';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'stable': return 'bi-check-circle-fill';
            case 'attention': return 'bi-exclamation-circle-fill';
            case 'action': return 'bi-exclamation-triangle-fill';
            default: return 'bi-question-circle-fill';
        }
    };

    // Calculate health score based on available data
    const getHealthScore = () => {
        let score = 50; // Base score
        let factors = [];

        // Status-based scoring
        if (todayStatus?.status === 'stable') {
            score += 25;
            factors.push({ label: 'Status', value: '+25', positive: true });
        } else if (todayStatus?.status === 'attention') {
            score += 10;
            factors.push({ label: 'Status', value: '+10', positive: true });
        } else if (todayStatus?.status === 'action') {
            score -= 15;
            factors.push({ label: 'Status', value: '-15', positive: false });
        }

        // Weekly activity bonus
        if (summary?.entriesThisWeek >= 5) {
            score += 15;
            factors.push({ label: 'Consistency', value: '+15', positive: true });
        } else if (summary?.entriesThisWeek >= 3) {
            score += 10;
            factors.push({ label: 'Activity', value: '+10', positive: true });
        } else if (summary?.entriesThisWeek > 0) {
            score += 5;
            factors.push({ label: 'Activity', value: '+5', positive: true });
        }

        // Sleep bonus
        if (summary?.averages?.sleep >= 7 && summary?.averages?.sleep <= 9) {
            score += 10;
            factors.push({ label: 'Sleep', value: '+10', positive: true });
        } else if (summary?.averages?.sleep < 6) {
            score -= 5;
            factors.push({ label: 'Sleep', value: '-5', positive: false });
        }

        // Steps bonus
        if (summary?.averages?.steps >= 8000) {
            score += 10;
            factors.push({ label: 'Steps', value: '+10', positive: true });
        } else if (summary?.averages?.steps >= 5000) {
            score += 5;
            factors.push({ label: 'Steps', value: '+5', positive: true });
        }

        // Clamp between 0 and 100
        score = Math.max(0, Math.min(100, score));

        return { score, factors };
    };

    const getScoreColor = (score) => {
        if (score >= 80) return '#33c091';
        if (score >= 60) return '#7ec88b';
        if (score >= 40) return '#f0ad4e';
        return '#d9534f';
    };

    const getScoreLabel = (score) => {
        if (score >= 80) return 'Excellent';
        if (score >= 60) return 'Good';
        if (score >= 40) return 'Fair';
        return 'Needs Attention';
    };

    const healthData = getHealthScore();

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
                <p>Loading your health data...</p>
            </div>
        );
    }

    return (
        <>
            {/* Header */}
            <div className="dashboard-header">
                <div className="row align-items-center">
                    <div className="col-md-8">
                        <h1>Hello, {user?.name || 'there'}! 👋</h1>
                        <p className="text-muted">Here's your health overview for today</p>
                    </div>
                    <div className="col-md-4 text-md-end">
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowVitalsForm(!showVitalsForm)}
                        >
                            <i className="bi bi-plus-circle me-2"></i>
                            Log Vitals
                        </button>
                    </div>
                </div>
            </div>

            {/* Health Score Bar */}
            <div className="health-score-card mt-4">
                <div className="health-score-header">
                    <div className="health-score-info">
                        <h3>Your Health Score</h3>
                        <span className="health-score-label" style={{ color: getScoreColor(healthData.score) }}>
                            {getScoreLabel(healthData.score)}
                        </span>
                    </div>
                    <div className="health-score-value" style={{ color: getScoreColor(healthData.score) }}>
                        {healthData.score}
                        <span className="score-max">/100</span>
                    </div>
                </div>
                <div className="health-bar-container">
                    <div
                        className="health-bar-fill"
                        style={{
                            width: `${healthData.score}%`,
                            backgroundColor: getScoreColor(healthData.score)
                        }}
                    >
                        <div className="health-bar-glow"></div>
                    </div>
                </div>
                {healthData.factors.length > 0 && (
                    <div className="health-factors">
                        {healthData.factors.map((factor, index) => (
                            <span
                                key={index}
                                className={`factor-tag ${factor.positive ? 'positive' : 'negative'}`}
                            >
                                {factor.label}: {factor.value}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Message */}
            {message && (
                <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'} mt-3`}>
                    {message}
                </div>
            )}

            {/* Vitals Form */}
            {showVitalsForm && (
                <div className="vitals-form-card mt-4" data-aos="fade-down">
                    <h3>Log Today's Vitals</h3>
                    <form onSubmit={handleSubmitVitals}>
                        <div className="row g-3">
                            <div className="col-md-4">
                                <label className="form-label">Heart Rate (BPM)</label>
                                <input
                                    type="number"
                                    name="heartRate"
                                    className="form-control"
                                    placeholder="e.g., 72"
                                    value={vitalsForm.heartRate}
                                    onChange={handleVitalsChange}
                                    min="30"
                                    max="220"
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Blood Pressure (Systolic)</label>
                                <input
                                    type="number"
                                    name="systolic"
                                    className="form-control"
                                    placeholder="e.g., 120"
                                    value={vitalsForm.systolic}
                                    onChange={handleVitalsChange}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Blood Pressure (Diastolic)</label>
                                <input
                                    type="number"
                                    name="diastolic"
                                    className="form-control"
                                    placeholder="e.g., 80"
                                    value={vitalsForm.diastolic}
                                    onChange={handleVitalsChange}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Steps Today</label>
                                <input
                                    type="number"
                                    name="steps"
                                    className="form-control"
                                    placeholder="e.g., 5000"
                                    value={vitalsForm.steps}
                                    onChange={handleVitalsChange}
                                    min="0"
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Hours of Sleep</label>
                                <input
                                    type="number"
                                    name="sleep"
                                    className="form-control"
                                    placeholder="e.g., 7.5"
                                    value={vitalsForm.sleep}
                                    onChange={handleVitalsChange}
                                    min="0"
                                    max="24"
                                    step="0.5"
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Energy Level (1-10)</label>
                                <input
                                    type="range"
                                    name="energy"
                                    className="form-range"
                                    value={vitalsForm.energy}
                                    onChange={handleVitalsChange}
                                    min="1"
                                    max="10"
                                />
                                <small className="text-muted">Current: {vitalsForm.energy}</small>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">How are you feeling?</label>
                                <select
                                    name="mood"
                                    className="form-control"
                                    value={vitalsForm.mood}
                                    onChange={handleVitalsChange}
                                >
                                    <option value="great">😄 Great</option>
                                    <option value="good">🙂 Good</option>
                                    <option value="okay">😐 Okay</option>
                                    <option value="low">😔 Low</option>
                                    <option value="bad">😫 Not well</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <button
                                    type="submit"
                                    className="btn btn-primary me-2"
                                    disabled={submitting}
                                >
                                    {submitting ? 'Saving...' : 'Save Vitals'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowVitalsForm(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {/* Status Cards */}
            <div className="row mt-4">
                {/* Today's Status */}
                <div className="col-lg-6">
                    <div className="status-card">
                        <div className="status-header">
                            <h3>Today's Status</h3>
                            <span
                                className="status-badge"
                                style={{ backgroundColor: getStatusColor(todayStatus?.status) }}
                            >
                                <i className={`bi ${getStatusIcon(todayStatus?.status)} me-1`}></i>
                                {todayStatus?.status?.toUpperCase() || 'UNKNOWN'}
                            </span>
                        </div>
                        <p className="status-message">{todayStatus?.statusMessage}</p>

                        <div className="suggested-actions">
                            <h4>Suggested Actions</h4>
                            <ul>
                                {todayStatus?.suggestedActions?.map((action, index) => (
                                    <li key={index}>
                                        <i className="bi bi-check2-circle me-2"></i>
                                        {action}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Weekly Summary */}
                <div className="col-lg-6">
                    <div className="status-card">
                        <div className="status-header">
                            <h3>Weekly Overview</h3>
                            <span className="entries-badge">
                                {summary?.entriesThisWeek || 0} entries
                            </span>
                        </div>
                        <p className="status-message">{summary?.message}</p>

                        {summary?.averages && (
                            <div className="averages-grid">
                                {summary.averages.heartRate && (
                                    <div className="average-item">
                                        <i className="bi bi-heart-pulse"></i>
                                        <div>
                                            <span className="value">{summary.averages.heartRate}</span>
                                            <span className="label">Avg Heart Rate</span>
                                        </div>
                                    </div>
                                )}
                                {summary.averages.sleep && (
                                    <div className="average-item">
                                        <i className="bi bi-moon"></i>
                                        <div>
                                            <span className="value">{summary.averages.sleep}h</span>
                                            <span className="label">Avg Sleep</span>
                                        </div>
                                    </div>
                                )}
                                {summary.averages.steps && (
                                    <div className="average-item">
                                        <i className="bi bi-activity"></i>
                                        <div>
                                            <span className="value">{summary.averages.steps.toLocaleString()}</span>
                                            <span className="label">Avg Steps</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Micro Actions */}
            <div className="micro-actions-section mt-4">
                <h3>Quick Actions</h3>
                <div className="row g-3">
                    <div className="col-6 col-md-3">
                        <div className="micro-action-card" onClick={() => setShowVitalsForm(true)}>
                            <i className="bi bi-droplet"></i>
                            <span>Log Water</span>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="micro-action-card" onClick={() => setShowVitalsForm(true)}>
                            <i className="bi bi-person-walking"></i>
                            <span>Log Walk</span>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="micro-action-card" onClick={() => setShowVitalsForm(true)}>
                            <i className="bi bi-moon-stars"></i>
                            <span>Log Sleep</span>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="micro-action-card" onClick={() => setShowVitalsForm(true)}>
                            <i className="bi bi-emoji-smile"></i>
                            <span>Log Mood</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Health Loop Diagram */}
            <div className="health-loop-section mt-5">
                <h3 className="text-center mb-4">Your Prevntiv Loop</h3>
                <div className="loop-diagram">
                    <div className="loop-step">
                        <div className="loop-icon">📊</div>
                        <div className="loop-text">Passive Signals</div>
                    </div>
                    <div className="loop-arrow">→</div>
                    <div className="loop-step">
                        <div className="loop-icon">🧠</div>
                        <div className="loop-text">Context Engine</div>
                    </div>
                    <div className="loop-arrow">→</div>
                    <div className="loop-step">
                        <div className="loop-icon">💡</div>
                        <div className="loop-text">Interpretation</div>
                    </div>
                    <div className="loop-arrow">→</div>
                    <div className="loop-step active">
                        <div className="loop-icon">👤</div>
                        <div className="loop-text">You Are Here</div>
                    </div>
                    <div className="loop-arrow">→</div>
                    <div className="loop-step">
                        <div className="loop-icon">✅</div>
                        <div className="loop-text">Micro Action</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IndividualDashboard;
