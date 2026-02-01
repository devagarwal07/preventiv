import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path || location.hash === path;

    const handleLogout = () => {
        logout();
        setMobileMenuOpen(false);
    };

    return (
        <header id="header" className="header d-flex align-items-center fixed-top">
            <div className="container position-relative d-flex align-items-center justify-content-between">
                <Link to="/" className="logo d-flex align-items-center me-auto me-xl-0">
                    <img src="/assets/img/logoB.png" alt="Prevntiv Logo" />
                </Link>

                <nav id="navmenu" className={`navmenu ${mobileMenuOpen ? 'mobile-nav-active' : ''}`}>
                    <ul>
                        <li>
                            <Link to="/" className={isActive('/') ? 'active' : ''}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <a href="/#home-about">About</a>
                        </li>
                        <li>
                            <a href="/#featured-services">Problems</a>
                        </li>
                        <li>
                            <a href="/#Service">Services</a>
                        </li>
                        <li>
                            <a href="/#who-section">Our Users</a>
                        </li>
                        {isAuthenticated ? (
                            <>
                                <li>
                                    <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="nav-logout-btn">
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        )}
                    </ul>
                    <i
                        className={`mobile-nav-toggle d-xl-none bi ${mobileMenuOpen ? 'bi-x' : 'bi-list'}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    ></i>
                </nav>

                {isAuthenticated ? (
                    <Link className="btn-getstarted" to="/dashboard">
                        My Health
                    </Link>
                ) : (
                    <Link className="btn-getstarted" to="/register">
                        Join Community
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Navbar;
