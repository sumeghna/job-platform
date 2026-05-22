function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="brand-icon">💼</span>
          <span className="brand-name">JobBoard</span>
        </div>
        
        <div className="nav-links">
          <a href="#" className="nav-link">Browse Jobs</a>
          <a href="#" className="nav-link">Saved Jobs</a>
          <a href="#" className="nav-link">Post a Job</a>
        </div>

        <div className="nav-stats">
          <span>🎯 Live Jobs: 8</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;