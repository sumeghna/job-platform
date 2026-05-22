import { useState, useEffect } from 'react';
import AuthModal from './AuthModal';
import ToastContainer from './ToastContainer';

function EntryScreen({ onEnter }) {
  const [isVisible, setIsVisible] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [activeStat, setActiveStat] = useState(0);
  const [toasts, setToasts] = useState([]);
  
  const stats = [
    { value: "10,000+", label: "Active Jobs" },
    { value: "500+", label: "Companies" },
    { value: "94%", label: "Satisfaction Rate" },
    { value: "24hr", label: "Avg Response" }
  ];

  // Show toast function
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  // Remove toast function
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setUserName(user.name);
      setIsLoggedIn(true);
      showToast(`Welcome back, ${user.name}!`, 'success');
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    setIsVisible(false);
    setTimeout(() => onEnter(), 400);
  };

  const handleAuthSuccess = (name) => {
    setUserName(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setUserName('');
    showToast('You have been signed out', 'info');
  };

  return (
    <>
      <div className={`entry-screen ${!isVisible ? 'fade-out' : ''}`}>
        <div className="entry-container">
          {/* Left side - Brand & CTA */}
          <div className="entry-left">
            <div className="entry-badge">
              <span className="badge-dot"></span>
              Now Hiring Globally
            </div>
            
            <h1 className="entry-title">
              Find work that
              <span className="title-accent"> matters.</span>
            </h1>
            
            <p className="entry-description">
              Connect with top employers and discover opportunities 
              that align with your skills and values.
            </p>
            
            <div className="entry-buttons">
              {!isLoggedIn ? (
                <>
                  <button className="entry-cta primary" onClick={() => setShowAuth(true)}>
                    Get Started
                    <svg className="cta-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                 <button className="entry-cta secondary" onClick={() => {
  setIsVisible(false);
  setTimeout(() => onEnter(), 400);
}}>
  Browse as Guest
</button>
                </>
              ) : (
                <>
                  <button className="entry-cta primary" onClick={handleEnter}>
                    Continue as {userName}
                    <svg className="cta-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                  <button className="entry-cta secondary" onClick={handleLogout}>
                    Sign Out
                  </button>
                </>
              )}
            </div>
            
            <div className="entry-trust">
              <div className="trust-avatars">
                <span className="avatar">🏢</span>
                <span className="avatar">🌟</span>
                <span className="avatar">💼</span>
                <span className="avatar-count">+200</span>
              </div>
              <p>Trusted by companies worldwide</p>
            </div>
          </div>

          {/* Right side - Stats & Features */}
          <div className="entry-right">
            <div className="stats-card">
              <div className="stat-display">
                <span className="stat-value">{stats[activeStat].value}</span>
                <span className="stat-label">{stats[activeStat].label}</span>
              </div>
              <div className="stat-dots">
                {stats.map((_, idx) => (
                  <span 
                    key={idx} 
                    className={`stat-dot ${idx === activeStat ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>

            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-icon">🎯</div>
                <div>
                  <h4>Smart Matching</h4>
                  <p>AI-powered job recommendations</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <div>
                  <h4>Quick Apply</h4>
                  <p>Submit applications in seconds</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <div>
                  <h4>Track Progress</h4>
                  <p>Monitor your applications</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAuth && (
        <AuthModal 
          onClose={() => setShowAuth(false)} 
          onAuthSuccess={handleAuthSuccess}
          showToast={showToast}
        />
      )}

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}

export default EntryScreen;