import { Link } from 'react-router-dom';

const WhoItsFor = () => {
    const userTypes = [
        {
            image: '/assets/img/Who Prevtiv is For/Individuals.png',
            title: 'Individuals',
            description: 'who want reassurance, not panic.'
        },
        {
            image: '/assets/img/Who Prevtiv is For/Chronic & lifestyle-risk populations.png',
            title: 'Chronic & lifestyle-risk populations',
            description: 'who want consistent visibility.'
        },
        {
            image: '/assets/img/Who Prevtiv is For/Doctors.png',
            title: 'Doctors',
            description: 'who believe prevention is the future.'
        },
        {
            image: '/assets/img/Who Prevtiv is For/Dieticians, physios, wellness professionals.png',
            title: 'Dieticians, physios, wellness professionals',
            description: 'who guide beyond the symptoms.'
        }
    ];

    return (
        <section className="who-section" id="who-section">
            <div className="container">
                <div className="text-center" data-aos="fade-right" data-aos-delay="100">
                    <h2>Who Prevntiv is For</h2>
                    <p>See if you belong:</p>
                </div>

                <div className="row g-4 mt-4">
                    {userTypes.map((userType, index) => (
                        <div key={index} className="col-lg-6">
                            <div className="who-card">
                                <div className="row align-items-center">
                                    <div className="col-md-5">
                                        <div className="img-box">
                                            <img src={userType.image} alt={userType.title} />
                                        </div>
                                    </div>
                                    <div className="col-md-7 mt-3 mt-md-0">
                                        <h4>{userType.title}</h4>
                                        <p>{userType.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="col-12">
                        <div className="who-card large-card">
                            <div className="row align-items-center">
                                <div className="col-md-7">
                                    <h3>Hospitals transitioning to preventive care</h3>
                                    <p>Join a community that's building a new era of proactive, connected care.</p>
                                </div>
                                <div className="col-md-5 order-mobile-first">
                                    <div className="img-box">
                                        <img
                                            src="/assets/img/Who Prevtiv is For/Hospitals transitioning to preventive care.png"
                                            alt="Hospitals"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="cta text-center mt-5">
                    <h2>Help us move healthcare forward.</h2>
                    <p>Join a community that's building a new era of proactive, connected care.</p>

                    <div className="d-flex justify-content-center gap-3 flex-wrap mt-3">
                        <Link to="/register" className="btn btn-join px-4 border-none">Join the Community</Link>
                        <a href="#" className="btn-contact">
                            <i className="bi bi-telephone"></i>
                            Contact Us
                        </a>
                    </div>

                    <a href="#" className="demo-link d-block mt-3">Or, request a demo →</a>
                </div>
            </div>
        </section>
    );
};

export default WhoItsFor;
