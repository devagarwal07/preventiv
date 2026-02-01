import { Link } from 'react-router-dom';

const Terms = () => {
    return (
        <main className="main">
            <div className="page-title">
                <div className="heading">
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-lg-8">
                                <h1 className="heading-title">Terms of Service</h1>
                                <p className="mb-0">
                                    Please read these terms carefully before using the Prevntiv platform.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="breadcrumbs">
                    <div className="container">
                        <ol>
                            <li><Link to="/">Home</Link></li>
                            <li className="current">Terms</li>
                        </ol>
                    </div>
                </nav>
            </div>

            <section className="terms-of-service section">
                <div className="container">
                    <div className="tos-header text-center">
                        <span className="last-updated">Last Updated: February 1, 2026</span>
                        <h2>Terms of Service</h2>
                        <p>Please read these terms of service carefully before using our services</p>
                    </div>

                    <div className="tos-content">
                        <div className="content-section">
                            <h3>1. Agreement to Terms</h3>
                            <p>By accessing Prevntiv's website and services, you agree to be bound by these Terms of Service. If you do not agree with any of these terms, you may not use our services.</p>
                            <div className="info-box">
                                <i className="bi bi-info-circle"></i>
                                <p>Prevntiv is a health monitoring and guidance platform. It is not a substitute for professional medical advice, diagnosis, or treatment.</p>
                            </div>
                        </div>

                        <div className="content-section">
                            <h3>2. Health Information Disclaimer</h3>
                            <p>Prevntiv provides health monitoring, trend analysis, and general wellness guidance. Our services are designed to complement, not replace, professional healthcare.</p>
                            <div className="alert-box">
                                <i className="bi bi-exclamation-triangle"></i>
                                <div className="alert-content">
                                    <h5>Important Medical Notice</h5>
                                    <p>Always consult with qualified healthcare professionals for medical advice. In case of emergency, contact emergency services immediately.</p>
                                </div>
                            </div>
                        </div>

                        <div className="content-section">
                            <h3>3. User Accounts</h3>
                            <p>When you create an account with Prevntiv:</p>
                            <ul className="list-items">
                                <li>You must provide accurate and complete information</li>
                                <li>You are responsible for maintaining account security</li>
                                <li>You must notify us of any unauthorized access</li>
                                <li>One account per person is permitted</li>
                            </ul>
                        </div>

                        <div className="content-section">
                            <h3>4. Acceptable Use</h3>
                            <p>You agree to use Prevntiv only for its intended purpose of health monitoring and personal wellness.</p>
                            <div className="prohibited-list">
                                <div className="prohibited-item">
                                    <i className="bi bi-x-circle"></i>
                                    <span>Sharing your account credentials with others</span>
                                </div>
                                <div className="prohibited-item">
                                    <i className="bi bi-x-circle"></i>
                                    <span>Entering false health data intentionally</span>
                                </div>
                                <div className="prohibited-item">
                                    <i className="bi bi-x-circle"></i>
                                    <span>Using the platform for commercial purposes without permission</span>
                                </div>
                                <div className="prohibited-item">
                                    <i className="bi bi-x-circle"></i>
                                    <span>Attempting to access other users' data</span>
                                </div>
                            </div>
                        </div>

                        <div className="content-section">
                            <h3>5. Data Ownership</h3>
                            <p>You retain ownership of all health data you enter into Prevntiv. We are granted a license to use this data solely to provide our services to you.</p>
                        </div>

                        <div className="content-section">
                            <h3>6. Service Availability</h3>
                            <p>We strive to maintain high availability but cannot guarantee uninterrupted service. We reserve the right to modify or discontinue features with reasonable notice.</p>
                        </div>

                        <div className="content-section">
                            <h3>7. Limitation of Liability</h3>
                            <p>Prevntiv provides health guidance tools and is not liable for medical decisions made based on our platform's recommendations. Users should always verify health concerns with qualified professionals.</p>
                        </div>

                        <div className="content-section">
                            <h3>8. Changes to Terms</h3>
                            <p>We may update these Terms from time to time. Continued use of Prevntiv after changes constitutes acceptance of the new terms.</p>
                            <div className="notice-box">
                                <i className="bi bi-bell"></i>
                                <p>We will notify registered users of significant changes via email.</p>
                            </div>
                        </div>
                    </div>

                    <div className="tos-contact">
                        <div className="contact-box">
                            <div className="contact-icon">
                                <i className="bi bi-envelope"></i>
                            </div>
                            <div className="contact-content">
                                <h4>Questions About Terms?</h4>
                                <p>If you have any questions about these Terms, please contact us.</p>
                                <a href="mailto:support@prevntiv.com" className="contact-link">Contact Support</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Terms;
