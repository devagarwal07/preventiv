const WhatsBroken = () => {
    const problems = [
        {
            icon: 'fas fa-heartbeat',
            title: 'Healthcare Starts too late',
            description: 'People enter the system only after symptoms escalate.'
        },
        {
            icon: 'fas fa-brain',
            title: "Data Exists, But Isn't Watched",
            description: "Vitals, labs, and lifestyle data are scattered and ignored until it's too late."
        },
        {
            icon: 'fas fa-cut',
            title: 'Care is Fragmented',
            description: "Doctors work in isolation. Diet, physio, lifestyle aren't connected. No shared context."
        },
        {
            icon: 'fa-solid fa-bed-pulse',
            title: 'Patients are left alone Between Visits',
            description: 'No reassurance. No Guidance. No early correction.'
        }
    ];

    return (
        <section id="home-about" className="home-about section">
            <div className="container" data-aos="fade-up" data-aos-delay="100">
                <div className="row">
                    <div className="col-lg-8 mx-auto text-center mb-5" data-aos="fade-up" data-aos-delay="150">
                        <h2 className="section-heading">What's Broken In Healthcare Today</h2>
                        <p className="lead-description">Most health systems are built for crises - not for people.</p>
                    </div>
                </div>

                <div className="row justify-content-center gap-5">
                    {problems.map((problem, index) => (
                        <div
                            key={index}
                            className="col-lg-4 col-md-6"
                            data-aos="fade-right"
                            data-aos-delay={300 + index * 50}
                        >
                            <div className="department-card">
                                <div className="card-icon">
                                    <i className={problem.icon}></i>
                                </div>
                                <div className="card-content">
                                    <h3 className="card-title">{problem.title}</h3>
                                    <p className="card-description">{problem.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="departments-cta text-center" data-aos="fade-right" data-aos-delay="600">
                        <div className="cta-content">
                            <h3 className="cta-title">People Don't Want Hospitals</h3>
                            <p className="cta-description">They want confidence that nothing is going wrong.</p>
                            <a href="#Service" className="btn btn-primary">See Our Solution</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatsBroken;
