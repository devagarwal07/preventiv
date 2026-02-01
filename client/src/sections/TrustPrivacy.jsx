import { Link } from 'react-router-dom';

const TrustPrivacy = () => {
    const badges = [
        { icon: '✅', text: 'Patient-Owned Data' },
        { icon: '🛡', text: 'Standards-Ready' },
        { icon: '🔐', text: 'Role-Based Access' },
        { icon: '✍', text: 'Explicit Consent' },
        { icon: '📊', text: 'Auditability' }
    ];

    const protectionFeatures = [
        {
            icon: '🔒',
            title: 'Privacy-by-Design',
            description: 'Encrypted & secure data architecture'
        },
        {
            icon: '🧩',
            title: 'Role-Based Access',
            description: 'Strict controls, access by need-to-know'
        },
        {
            icon: '🔒',
            title: 'Standards-Ready',
            description: 'FHIR-compliant interoperability'
        },
        {
            icon: '🔒',
            title: 'Auditability',
            description: 'Comprehensive logging of access'
        }
    ];

    return (
        <>
            {/* Trust Section */}
            <section className="container text-center py-5">
                <div className="text-center" data-aos="fade-right" data-aos-delay="100">
                    <h2>Trust, Privacy & Ethics</h2>
                    <p>Prevention only works when trust is absolute.</p>
                </div>

                <div className="row align-items-center text-center g-4" data-aos="fade-left" data-aos-delay="200">
                    <div className="col-lg-4 col-md-4">
                        <div className="badge-crd">
                            <div className="badge-box">{badges[0].icon} {badges[0].text}</div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4">
                        <img src="/assets/img/icon.webp" height="95px" width="100px" alt="logo-icon" />
                        <div className="badge-crd">
                            <div className="badge-box mt-3">{badges[1].icon} {badges[1].text}</div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4">
                        <div className="badge-crd">
                            <div className="badge-box">{badges[2].icon} {badges[2].text}</div>
                        </div>
                    </div>

                    <div className="d-flex gap-5 justify-content-between">
                        <div className="col-lg-4 col-md-6">
                            <div className="badge-crd">
                                <div className="badge-box">{badges[3].icon} {badges[3].text}</div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="badge-crd">
                                <div className="badge-box">{badges[4].icon} {badges[4].text}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How We Protect Section */}
            <section className="container py-5">
                <h3 className="text-center mb-4" data-aos="fade-right" data-aos-delay="100">
                    How We Protect Your Health Data
                </h3>

                <div className="row justify-content-center">
                    <div className="col-lg-10" data-aos="fade-left" data-aos-delay="200">
                        <div
                            className="row g-4 mt-3 pb-4 justify-content-start pt-3 px-3"
                            style={{ boxShadow: '0 5px 10px #16896d', borderRadius: '10px' }}
                        >
                            {protectionFeatures.map((feature, index) => (
                                <div key={index} className="col-lg-6 col-md-6">
                                    <div
                                        className="feature-box d-flex gap-2 p-3 rounded-3"
                                        style={{ boxShadow: '0 5px 10px #16896d' }}
                                    >
                                        <div className="feature-icon">
                                            <div>{feature.icon}</div>
                                        </div>
                                        <div className="feature-description">
                                            <h3>{feature.title}</h3>
                                            <p>{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="text-center mt-5">
                    <p className="fs-5 mb-4">Prevention only works when trust is absolute.</p>
                    <Link to="/register" className="btn btn-join">Get Started Today</Link>
                </div>
            </section>
        </>
    );
};

export default TrustPrivacy;
