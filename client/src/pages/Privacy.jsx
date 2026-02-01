import { Link } from 'react-router-dom';

const Privacy = () => {
    return (
        <main className="main">
            <div className="page-title">
                <div className="heading">
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-lg-8">
                                <h1 className="heading-title">Privacy Policy</h1>
                                <p className="mb-0">
                                    Your privacy is important to us. This policy explains how Prevntiv collects, uses, and protects your personal health information.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="breadcrumbs">
                    <div className="container">
                        <ol>
                            <li><Link to="/">Home</Link></li>
                            <li className="current">Privacy</li>
                        </ol>
                    </div>
                </nav>
            </div>

            <section className="privacy section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <div className="privacy-content">
                                <div className="last-updated">
                                    <p><strong>Last updated:</strong> February 1, 2026</p>
                                </div>

                                <div className="privacy-section">
                                    <h3>Information We Collect</h3>
                                    <p>At Prevntiv, we collect information to provide you with personalized preventive health guidance. This includes:</p>

                                    <h4>Personal Information</h4>
                                    <ul>
                                        <li>Name and email address for account creation</li>
                                        <li>Health profile data you choose to share</li>
                                        <li>Vital signs and health metrics you log</li>
                                        <li>Wearable device data (with your explicit consent)</li>
                                    </ul>

                                    <h4>Usage Data</h4>
                                    <p>We collect anonymized data about how you use our platform to improve our services and provide better health insights.</p>
                                </div>

                                <div className="privacy-section">
                                    <h3>How We Use Your Information</h3>
                                    <p>Your health data is used exclusively to:</p>

                                    <div className="info-box">
                                        <h4>Primary Uses</h4>
                                        <ol>
                                            <li>Provide personalized health status assessments</li>
                                            <li>Generate actionable health recommendations</li>
                                            <li>Track your health trends over time</li>
                                            <li>Alert you to potential health concerns early</li>
                                        </ol>
                                    </div>
                                </div>

                                <div className="privacy-section">
                                    <h3>Data Security</h3>
                                    <p>We take the security of your health data seriously:</p>

                                    <div className="security-measures">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="measure-item">
                                                    <i className="bi bi-lock-fill"></i>
                                                    <h5>End-to-End Encryption</h5>
                                                    <p>All data is encrypted in transit and at rest using industry-standard protocols.</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="measure-item">
                                                    <i className="bi bi-server"></i>
                                                    <h5>Secure Storage</h5>
                                                    <p>Your data is stored on secure, HIPAA-ready infrastructure.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="privacy-section">
                                    <h3>Your Rights</h3>
                                    <div className="rights-list">
                                        <div className="right-item">
                                            <i className="bi bi-eye"></i>
                                            <div>
                                                <h5>Right to Access</h5>
                                                <p>You can request a copy of all your personal data at any time.</p>
                                            </div>
                                        </div>
                                        <div className="right-item">
                                            <i className="bi bi-pencil"></i>
                                            <div>
                                                <h5>Right to Correction</h5>
                                                <p>You can update or correct your information through your dashboard.</p>
                                            </div>
                                        </div>
                                        <div className="right-item">
                                            <i className="bi bi-trash"></i>
                                            <div>
                                                <h5>Right to Deletion</h5>
                                                <p>You can request complete deletion of your account and data.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="privacy-section">
                                    <h3>We Never Sell Your Data</h3>
                                    <div className="highlight-box">
                                        <i className="bi bi-shield-check"></i>
                                        <h4>Your Health Data is Yours</h4>
                                        <p>We will never sell, rent, or share your personal health information with third parties for marketing purposes. Your trust is our priority.</p>
                                    </div>
                                </div>

                                <div className="contact-section">
                                    <h3>Contact Us</h3>
                                    <p>If you have questions about this Privacy Policy or your data:</p>
                                    <div className="contact-info">
                                        <div className="contact-item">
                                            <i className="bi bi-envelope"></i>
                                            <span>privacy@prevntiv.com</span>
                                        </div>
                                        <div className="contact-item">
                                            <i className="bi bi-geo-alt"></i>
                                            <span>Patiala, Punjab, India</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Privacy;
