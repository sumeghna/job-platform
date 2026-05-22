function FilterBar({ filters, onFilterChange }) {
  const locations = ['All', 'Remote', 'New York, NY', 'Austin, TX', 'San Francisco, CA', 'Los Angeles, CA'];
  const jobTypes = ['All', 'Full-time', 'Contract', 'Freelance'];
  const categories = [
  'All', 
  'Healthcare', 
  'Education', 
  'Marketing', 
  'Construction', 
  'Transportation', 
  'Hospitality', 
  'Finance', 
  'Logistics', 
  'Customer Service', 
  'Design', 
  'Trades', 
  'Technology', 
  'Government', 
  'Real Estate'
];

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>📍 Location</label>
        <select
          value={filters.location}
          onChange={(e) => onFilterChange('location', e.target.value)}
        >
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>💼 Job Type</label>
        <select
          value={filters.type}
          onChange={(e) => onFilterChange('type', e.target.value)}
        >
          {jobTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>📁 Category</label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FilterBar;