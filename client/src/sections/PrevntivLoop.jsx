const PrevntivLoop = () => {
    const steps = [
        {
            icon: 'fas fa-heartbeat',
            title: 'Establish a Baseline',
            description: 'Health profile, Lifestyle inputs, Vitals, labs, history',
            image: '/assets/img/health/cardiology-2.webp'
        },
        {
            icon: 'fa-solid fa-tv',
            title: 'Continuous Monitoring',
            description: 'Wearables, Manual vitals, Lab reports',
            image: '/assets/img/health/neurology-3.webp'
        },
        {
            icon: 'fas fa-bone',
            title: 'Early Signal Detection',
            description: 'Trend deviations, Pattern changes, Risk indicators',
            image: '/assets/img/health/orthopedics-1.webp'
        },
        {
            icon: 'fas fa-baby',
            title: 'Confidence & Continuity',
            description: 'Ongoing visibility, Shared care, Long-term relationship',
            image: '/assets/img/health/pediatrics-4.webp'
        }
    ];

    return (
        <section id="featured-services" className="featured-services section">
            <div className="container section-title" data-aos="fade-up">
                <h2>The Prevntiv Loop</h2>
                <p>
                    Instead of reacting to health problems, we continuously monitor, predict early signals, and{' '}
                    <b>guide proactive steps —</b> so you stay one step ahead of health issues.
                </p>
            </div>

            <div className="container" data-aos="fade-up" data-aos-delay="100">
                <div className="row gy-4">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="col-md-6"
                            data-aos="fade-up"
                            data-aos-delay={200 + index * 100}
                        >
                            <div className="service-card">
                                <div className="service-icon">
                                    <i className={step.icon}></i>
                                </div>
                                <div className="service-image">
                                    <img
                                        src={step.image}
                                        alt={step.title}
                                        className="img-fluid"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="service-content">
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                    <a href="#" className="service-link">
                                        Learn More <i className="fas fa-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PrevntivLoop;
