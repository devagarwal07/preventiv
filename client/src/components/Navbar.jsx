import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__container">
                {/* Logo */}
                <Link to="/" className="navbar__logo" onClick={closeMenu}>
                    <img src="/assets/img/logoB.png" alt="Prevntiv" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="navbar__nav navbar__nav--desktop">
                    <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
                    <a href="/#home-about">About</a>
                    <a href="/#featured-services">Problems</a>
                    <a href="/#Service">Services</a>
                    <a href="/#who-section">Our Users</a>
                    {isAuthenticated && (
                        <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
                            Dashboard
                        </Link>
                    )}
                </nav>

                {/* Desktop Actions */}
                <div className="navbar__actions navbar__actions--desktop">
                    {isAuthenticated ? (
                        <>
                            <span className="navbar__role-badge">
                                {user?.role === 'hospital' ? '🏥' : user?.role === 'professional' ? '👨‍⚕️' : '👤'}
                            </span>
                            <button onClick={handleLogout} className="navbar__btn navbar__btn--outline">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="navbar__btn navbar__btn--outline">
                                Login
                            </Link>
                            <Link to="/register" className="navbar__btn navbar__btn--primary">
                                Join Community
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className={`navbar__toggle ${isMenuOpen ? 'navbar__toggle--open' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`navbar__overlay ${isMenuOpen ? 'navbar__overlay--visible' : ''}`}
                onClick={closeMenu}
            ></div>

            {/* Mobile Menu */}
            <div className={`navbar__mobile ${isMenuOpen ? 'navbar__mobile--open' : ''}`}>
                <nav className="navbar__mobile-nav">
                    <Link to="/" className={isActive('/') ? 'active' : ''} onClick={closeMenu}>
                        <i className="bi bi-house"></i>
                        Home
                    </Link>
                    <a href="/#home-about" onClick={closeMenu}>
                        <i className="bi bi-info-circle"></i>
                        About
                    </a>
                    <a href="/#featured-services" onClick={closeMenu}>
                        <i className="bi bi-exclamation-triangle"></i>
                        Problems
                    </a>
                    <a href="/#Service" onClick={closeMenu}>
                        <i className="bi bi-gear"></i>
                        Services
                    </a>
                    <a href="/#who-section" onClick={closeMenu}>
                        <i className="bi bi-people"></i>
                        Our Users
                    </a>
                    {isAuthenticated && (
                        <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''} onClick={closeMenu}>
                            <i className="bi bi-speedometer2"></i>
                            Dashboard
                        </Link>
                    )}
                </nav>

                <div className="navbar__mobile-actions">
                    {isAuthenticated ? (
                        <>
                            <div className="navbar__user-info">
                                <span className="navbar__role-badge navbar__role-badge--large">
                                    {user?.role === 'hospital' ? '🏥' : user?.role === 'professional' ? '👨‍⚕️' : '👤'}
                                </span>
                                <span className="navbar__user-name">{user?.name || 'User'}</span>
                            </div>
                            <button onClick={handleLogout} className="navbar__btn navbar__btn--logout">
                                <i className="bi bi-box-arrow-right"></i>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="navbar__btn navbar__btn--outline navbar__btn--full" onClick={closeMenu}>
                                Login
                            </Link>
                            <Link to="/register" className="navbar__btn navbar__btn--primary navbar__btn--full" onClick={closeMenu}>
                                Join Community
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
