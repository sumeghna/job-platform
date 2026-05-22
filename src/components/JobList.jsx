import JobCard from './JobCard';

function JobList({ jobs }) {
  if (jobs.length === 0) {
    return (
      <div className="no-results">
        <p>😕 No jobs found matching your criteria</p>
        <p>Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default JobList;