import { useState } from 'react';
import JobList from './components/JobList';
import FilterBar from './components/FilterBar';
import Navbar from './components/Navbar';
import EntryScreen from './components/EntryScreen';
import jobsData from './data/jobs.json';
import './App.css';

function App() {
  const [showMainApp, setShowMainApp] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: 'All',
    type: 'All',
    category: 'All'
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleEnter = () => {
    setShowMainApp(true);
    filterJobs();
  };

  const filterJobs = () => {
    let filtered = [...jobsData];

    if (filters.location !== 'All') {
      filtered = filtered.filter(job => job.location === filters.location);
    }

    if (filters.type !== 'All') {
      filtered = filtered.filter(job => job.type === filters.type);
    }

    if (filters.category !== 'All') {
      filtered = filtered.filter(job => job.category === filters.category);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term)
      );
    }

    setJobs(filtered);
    setLoading(false);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setTimeout(() => filterJobs(), 0);
  };

  const clearFilters = () => {
    setFilters({ location: 'All', type: 'All', category: 'All' });
    setSearchTerm('');
    setTimeout(() => filterJobs(), 0);
  };

  // Show entry screen first
  if (!showMainApp) {
    return <EntryScreen onEnter={handleEnter} />;
  }

  // Main app content - stays here, never goes back to entry
  return (
    <div className="app">
      <Navbar />
      
      <main className="main-container">
        <header className="hero-section">
          <h1>Find Your Dream Job</h1>
          <p>Discover thousands of opportunities from top companies</p>
        </header>

        <div className="search-section">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by job title, company, or skills..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setTimeout(() => filterJobs(), 0);
              }}
              className="search-input"
            />
            {searchTerm && (
              <button onClick={() => {
                setSearchTerm('');
                setTimeout(() => filterJobs(), 0);
              }} className="clear-search">
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="filters-section">
          <FilterBar filters={filters} onFilterChange={handleFilterChange} />
          <button onClick={clearFilters} className="clear-filters">
            Clear All Filters
          </button>
        </div>

        <div className="results-header">
          <div className="results-count">
            {loading ? (
              <span>Loading jobs...</span>
            ) : (
              <span>Found <strong>{jobs.length}</strong> job{jobs.length !== 1 ? 's' : ''}</span>
            )}
          </div>
        </div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Finding best matches for you...</p>
          </div>
        ) : (
          <JobList jobs={jobs} />
        )}
      </main>

      <footer className="footer">
        <p>© 2024 JobBoard - Find your next career opportunity</p>
        <p className="footer-note">🚀 Demo Mode: Applications saved locally. Full backend coming soon!</p>
      </footer>
    </div>
  );
}

export default App;