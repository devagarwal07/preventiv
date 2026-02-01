import { Link } from 'react-router-dom';

const Offers = () => {
    const offerings = [
        {
            title: 'For Individuals',
            image: '/assets/img/health/What Prevtiv Offers/For Individuals.webp',
            features: [
                'Health baseline & profile',
                'Continuous vitals tracking',
                'Early alerts',
                'Community support',
                'Professional guidance',
                'Secure health record'
            ]
        },
        {
            title: 'For Professionals',
            image: '/assets/img/health/What Prevtiv Offers/For Professionals.webp',
            features: [
                'Unified patient view',
                'Early risk indicators',
                'Shared EHR',
                'Cross-professional collaboration',
                'Reduced reactive load'
            ]
        },
        {
            title: 'For Hospitals & Clinics',
            image: '/assets/img/health/What Prevtiv Offers/For-Hospitals-Clinics.webp',
            features: [
                'Fewer unnecessary OPD visits',
                'Better patient retention',
                'Continuous patient visibility',
                'Data-driven preventive care',
                'Digital hospital layer beyond walls'
            ]
        }
    ];

    return (
        <section className="offers-section" id="Service">
            <div className="container text-center">
                <div className="row">
                    <div className="col-lg-8 mx-auto text-center" data-aos="fade-right" data-aos-delay="100">
                        <h2>What Prevntiv Offers</h2>
                        <p>Preventive care tailored for individuals, professionals, and healthcare institutions.</p>
                    </div>
                </div>

                <div className="offers-card mt-3" data-aos="fade-up" data-aos-delay="100">
                    <div className="container">
                        <div className="row g-4 justify-content-center">
                            {offerings.map((offering, index) => (
                                <div key={index} className="col-lg-4 col-md-6">
                                    <div className="offer-column p-3 h-100" style={{
                                        border: '1px solid #dee2e6',
                                        borderRadius: '8px',
                                        boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
                                        backgroundColor: '#fff'
                                    }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <img
                                                src={offering.image}
                                                alt={offering.title}
                                                style={{
                                                    width: '100%',
                                                    height: '200px',
                                                    objectFit: 'cover',
                                                    borderRadius: '8px',
                                                    marginBottom: '15px'
                                                }}
                                            />
                                        </div>
                                        <h4 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 700 }}>
                                            {offering.title}
                                        </h4>
                                        <div className="prevent-offer">
                                            {offering.features.map((feature, fIndex) => (
                                                <div
                                                    key={fIndex}
                                                    className="prevent-item d-flex gap-2"
                                                    style={{ marginBottom: '10px' }}
                                                >
                                                    <div className="prevent-icon" style={{ color: '#33c091' }}>
                                                        <i className="bi bi-check-circle-fill"></i>
                                                    </div>
                                                    <div className="prevent-text">{feature}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <Link to="/register" className="btn btn-join px-5 py-2">Get Started</Link>
                </div>
            </div>
        </section>
    );
};

export default Offers;
