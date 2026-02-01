import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section id="hero" className="hero section">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-5">
                        <div className="hero-image" data-aos="fade-right" data-aos-delay="100">
                            <img
                                src="/assets/img/health/staff-8.webp"
                                alt="Healthcare Professional"
                                className="img-fluid main-image"
                            />
                        </div>
                    </div>

                    <div className="col-lg-7">
                        <div className="hero-content" data-aos="fade-left" data-aos-delay="200">
                            <div className="badge-container">
                                <span className="hero-badge">Community that Cares</span>
                            </div>

                            <h1 className="hero-title">Healthcare shouldn't start at diagnosis.</h1>
                            <p className="hero-description">
                                <b>Prevntiv</b> is a community-driven preventive health platform that detects
                                early signals, guides action, and builds long-term health confidence — before crises happen.
                            </p>

                            <div className="hero-stats">
                                <div className="stat-group">
                                    <div className="stat">
                                        <i className="fa-solid fa-people-group"></i>
                                        <div className="stat-text">
                                            <span className="number">Community</span>
                                        </div>
                                    </div>
                                    <div className="stat">
                                        <i className="fa-solid fa-heart-pulse"></i>
                                        <div className="stat-text">
                                            <span className="number">Early Monitoring</span>
                                        </div>
                                    </div>
                                    <div className="stat">
                                        <i className="fa-solid fa-chart-line"></i>
                                        <div className="stat-text">
                                            <span className="number">Early Signals</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="hero-stats">
                                <div className="stat-group">
                                    <div className="stat">
                                        <i className="fa-solid fa-file-medical"></i>
                                        <div className="stat-text">
                                            <span className="number">Full Health History</span>
                                        </div>
                                    </div>
                                    <div className="stat">
                                        <i className="fa-solid fa-hospital"></i>
                                        <div className="stat-text">
                                            <span className="number">Treatment of root cause</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="cta-section">
                                <div className="cta-buttons">
                                    <Link to="/register" className="btn btn-primary">Join the Community</Link>
                                    <a href="#featured-services" className="btn btn-secondary">
                                        <i className="bi bi-play-circle"></i>
                                        Learn More
                                    </a>
                                </div>

                                <div className="quick-actions">
                                    <a href="#Service" className="action-link">
                                        <i className="bi bi-calendar-check"></i>
                                        <span>Find Available Times</span>
                                    </a>
                                    <a href="#" className="action-link">
                                        <i className="bi bi-chat-dots"></i>
                                        <span>Chat with Support</span>
                                    </a>
                                    <Link to="/dashboard" className="action-link">
                                        <i className="bi bi-file-medical"></i>
                                        <span>Patient Portal</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="background-elements">
                <div className="bg-shape shape-1"></div>
                <div className="bg-shape shape-2"></div>
                <div className="bg-pattern"></div>
            </div>
        </section>
    );
};

export default Hero;
