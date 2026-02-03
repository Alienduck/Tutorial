import { useState } from 'react';
import '../AuthModal.css';

const AuthModal = ({ mode, onClose, onLogin, onSwitchMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (mode === 'register' && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const endpoint = mode === 'login' ? '/user/login' : '/user/register';
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      if (mode === 'login') {
        onLogin(data.token, { email: formData.email });
      } else {
        setError('');
        onSwitchMode('login');
        setFormData({ email: formData.email, password: '', confirmPassword: '' });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12m0-12L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="modal-header">
          <h2>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{mode === 'login' ? 'Sign in to continue' : 'Get started for free'}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="error-message">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M10 6v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              {error}
            </div>
          )}

          <div className="input-group">
            <label className="input-label" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="input"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {mode === 'register' && (
            <div className="input-group">
              <label className="input-label" htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="input"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="modal-footer">
          <p>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button 
              className="link-button" 
              onClick={() => onSwitchMode(mode === 'login' ? 'register' : 'login')}
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;