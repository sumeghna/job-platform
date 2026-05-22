import { useState } from 'react';
import ApplyModal from './ApplyModal';

function JobCard({ job }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="job-card">
        <div className="job-card-header">
          <div className="job-logo">{job.logo}</div>
          <div className="job-title-section">
            <h3>{job.title}</h3>
            <div className="company-name">{job.company}</div>
          </div>
        </div>

        <div className="job-details">
          <span className="job-location">📍 {job.location}</span>
          <span className="job-type">{job.type}</span>
          <span className="job-salary">💰 {job.salary}</span>
        </div>

        <p className="job-description">{job.description}</p>

        <div className="job-requirements">
          {job.requirements.slice(0, 4).map((req, index) => (
            <span key={index} className="requirement-tag">
              {req}
            </span>
          ))}
          {job.requirements.length > 4 && (
            <span className="requirement-tag">+{job.requirements.length - 4} more</span>
          )}
        </div>

        <div className="job-card-footer">
          <div className="job-meta">
            <span>📅 Posted {job.postedDate}</span>
            <span>👥 {job.applications} applicants</span>
          </div>
          <button onClick={() => setShowModal(true)} className="apply-button">
            Apply Now →
          </button>
        </div>
      </div>

      {showModal && <ApplyModal job={job} onClose={() => setShowModal(false)} />}
    </>
  );
}

export default JobCard;