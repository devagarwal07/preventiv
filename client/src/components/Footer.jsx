import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer id="footer" className="footer position-relative">
            <div className="container footer-top">
                <div className="row justify-content-center mb-5">
                    <div className="col-auto text-center">
                        <Link to="/" className="logo">
                            <img src="/assets/img/logoB.png" alt="Prevntiv Logo" style={{ maxHeight: '60px' }} />
                        </Link>
                    </div>
                </div>

                <div className="row text-center gy-4 justify-content-center border-top pt-4">
                    <div className="col-lg-3 col-md-4 d-flex align-items-center justify-content-center">
                        <i className="bi bi-geo-alt me-2" style={{ fontSize: '1.5rem' }}></i>
                        <div className="text-start">
                            <p className="mb-0"><b>Patiala, Punjab</b></p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-4 d-flex align-items-center justify-content-center">
                        <i className="bi bi-envelope me-2" style={{ fontSize: '1.5rem' }}></i>
                        <a href="mailto:prevntiv@gmail.com">prevntiv@gmail.com</a>
                    </div>
                </div>

                <div className="row text-center mt-4">
                    <div className="col-12">
                        <div className="d-flex justify-content-center gap-3">
                            <Link to="/privacy" className="text-muted">Privacy Policy</Link>
                            <span className="text-muted">|</span>
                            <Link to="/terms" className="text-muted">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container copyright text-center mt-4">
                <p>© <span>Copyright</span> <strong>Prevntiv</strong>&nbsp;<span>All Rights Reserved</span></p>
                <div className="credits">
                    Designed by <a href="#">Prevntiv</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
