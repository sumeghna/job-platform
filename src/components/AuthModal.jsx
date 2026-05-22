import { useState } from 'react';

function AuthModal({ onClose, onAuthSuccess, showToast }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Email validation
    if (!validateEmail(formData.email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    // Password validation for signup
    if (!isLogin && formData.password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (isLogin) {
        // Login logic
        const user = users.find(u => u.email === formData.email && u.password === formData.password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email }));
          showToast(`Welcome back, ${user.name}!`, 'success');
          onAuthSuccess(user.name);
          setTimeout(() => onClose(), 1000);
        } else {
          showToast('Invalid email or password. Please try again.', 'error');
        }
      } else {
        // Signup logic
        if (formData.password !== formData.confirmPassword) {
          showToast('Passwords do not match', 'error');
          setIsLoading(false);
          return;
        }
        
        const userExists = users.find(u => u.email === formData.email);
        if (userExists) {
          showToast('An account with this email already exists', 'warning');
          setIsLoading(false);
          return;
        }
        
        users.push({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify({ name: formData.name, email: formData.email }));
        showToast(`Account created successfully! Welcome ${formData.name}!`, 'success');
        onAuthSuccess(formData.name);
        setTimeout(() => onClose(), 1000);
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose}>×</button>
        
        <div className="auth-header">
          <div className="auth-logo">💼</div>
          <h2>{isLogin ? 'Welcome back' : 'Create an account'}</h2>
          <p>{isLogin ? 'Sign in to continue your journey' : 'Join thousands of job seekers'}</p>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="auth-input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>
          )}

          <div className="auth-input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="hello@example.com"
            />
          </div>

          <div className="auth-input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
            {!isLogin && (
              <span className="input-hint">Minimum 6 characters</span>
            )}
          </div>

          {!isLogin && (
            <div className="auth-input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>
          )}

          <button type="submit" className="auth-submit" disabled={isLoading}>
            {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              className="auth-switch" 
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ name: '', email: '', password: '', confirmPassword: '' });
              }}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        <div className="auth-social">
          <button className="social-btn google" onClick={() => showToast('Google sign in coming soon!', 'info')}>
            <span>G</span> Google
          </button>
          <button className="social-btn github" onClick={() => showToast('GitHub sign in coming soon!', 'info')}>
            <span>⎇</span> GitHub
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;