import { useTheme } from '../App';
import '../LandingPage.css';

const LandingPage = ({ onOpenAuth }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="landing-page">
      <div className="animated-bg">
        <div className="bg-gradient bg-gradient-1"></div>
        <div className="bg-gradient bg-gradient-2"></div>
        <div className="bg-gradient bg-gradient-3"></div>
      </div>

      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo fade-in">
            <div className="logo-icon">
              <svg viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" stroke="url(#gradient)" strokeWidth="2"/>
                <path d="M15 20L18 23L25 16" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
                    <stop offset="0%" stopColor="#8b5cf6"/>
                    <stop offset="100%" stopColor="#ec4899"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="logo-text">UserFlow</span>
          </div>

          <div className="nav-actions fade-in" style={{animationDelay: '0.1s'}}>
            <button 
              className="theme-toggle" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
            <button className="btn btn-ghost" onClick={() => onOpenAuth('login')}>
              Sign In
            </button>
            <button className="btn btn-primary" onClick={() => onOpenAuth('register')}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title fade-in">
              Manage Your Users
              <br />
              <span className="gradient-text">Effortlessly</span>
            </h1>
            <p className="hero-description fade-in" style={{animationDelay: '0.2s'}}>
              A modern, elegant solution for user management. 
              Create, read, update, and delete users with ease in a beautiful, 
              intuitive interface designed for the modern web.
            </p>
            <div className="hero-cta fade-in" style={{animationDelay: '0.3s'}}>
              <button className="btn btn-primary btn-large" onClick={() => onOpenAuth('register')}>
                <span>Start Free</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="btn btn-secondary btn-large">
                <span>Watch Demo</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6.5 5.5l7 4.5-7 4.5v-9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="hero-visual fade-in" style={{animationDelay: '0.4s'}}>
            <div className="glass-card feature-card">
              <div className="feature-icon">👥</div>
              <h3>User Management</h3>
              <p>Full CRUD operations with an intuitive interface</p>
            </div>
            <div className="glass-card feature-card" style={{animationDelay: '0.5s'}}>
              <div className="feature-icon">🔒</div>
              <h3>Secure Auth</h3>
              <p>JWT-based authentication with bcrypt encryption</p>
            </div>
            <div className="glass-card feature-card" style={{animationDelay: '0.6s'}}>
              <div className="feature-icon">🎨</div>
              <h3>Modern Design</h3>
              <p>Glassmorphism with dark/light theme support</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Why Choose UserFlow?</h2>
            <p className="section-description">
              Everything you need to manage users effectively
            </p>
          </div>

          <div className="features-grid">
            <div className="glass-card feature-box scale-in">
              <div className="feature-box-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Built with modern technologies for optimal performance</p>
            </div>

            <div className="glass-card feature-box scale-in" style={{animationDelay: '0.1s'}}>
              <div className="feature-box-icon">📱</div>
              <h3>Responsive</h3>
              <p>Perfect experience on any device, from mobile to desktop</p>
            </div>

            <div className="glass-card feature-box scale-in" style={{animationDelay: '0.2s'}}>
              <div className="feature-box-icon">🛡️</div>
              <h3>Secure</h3>
              <p>Industry-standard security practices to protect your data</p>
            </div>

            <div className="glass-card feature-box scale-in" style={{animationDelay: '0.3s'}}>
              <div className="feature-box-icon">🎯</div>
              <h3>Intuitive</h3>
              <p>Clean, simple interface that anyone can use immediately</p>
            </div>

            <div className="glass-card feature-box scale-in" style={{animationDelay: '0.4s'}}>
              <div className="feature-box-icon">🔄</div>
              <h3>Real-time</h3>
              <p>Instant updates and synchronization across your team</p>
            </div>

            <div className="glass-card feature-box scale-in" style={{animationDelay: '0.5s'}}>
              <div className="feature-box-icon">📊</div>
              <h3>Analytics</h3>
              <p>Powerful insights into your user base and activity</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="glass-card cta-card">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-description">
            Join thousands of teams already using UserFlow to manage their users
          </p>
          <button className="btn btn-primary btn-large" onClick={() => onOpenAuth('register')}>
            Create Your Account
          </button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="logo-icon small">
              <svg viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" stroke="url(#gradient)" strokeWidth="2"/>
                <path d="M15 20L18 23L25 16" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
                    <stop offset="0%" stopColor="#8b5cf6"/>
                    <stop offset="100%" stopColor="#ec4899"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span>UserFlow</span>
          </div>
          <p className="footer-text">
            © 2026 UserFlow. Built with React, Express & MongoDB.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;