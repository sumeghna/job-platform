import { useState, useRef } from 'react';

function ApplyModal({ job, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    resume: null,
    coverLetter: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resumeError, setResumeError] = useState('');
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeError('');
    
    if (!file) return;
    
    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      setResumeError('Please upload PDF, DOC, DOCX, or TXT files only');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setResumeError('File size must be less than 5MB');
      return;
    }
    
    setFormData({
      ...formData,
      resume: file
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.resume) {
      setResumeError('Please upload your resume');
      return;
    }
    
    setIsSubmitting(true);

    // Create a data object for localStorage
    const applicationData = {
      id: Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      appliedAt: new Date().toISOString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      experience: formData.experience,
      coverLetter: formData.coverLetter,
      resumeName: formData.resume.name,
      resumeSize: formData.resume.size,
      resumeType: formData.resume.type
    };

    // Save to localStorage
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    applications.push(applicationData);
    localStorage.setItem('applications', JSON.stringify(applications));

    // For demo: Create a download link for the resume (simulating file storage)
    const reader = new FileReader();
    reader.onloadend = () => {
      const resumeData = {
        id: Date.now(),
        fileName: formData.resume.name,
        fileData: reader.result,
        applicationId: applicationData.id
      };
      const resumes = JSON.parse(localStorage.getItem('resumes') || '[]');
      resumes.push(resumeData);
      localStorage.setItem('resumes', JSON.stringify(resumes));
    };
    reader.readAsDataURL(formData.resume);

    // Log to console for debugging
    console.log('Application submitted:', applicationData);
    console.log('Resume file:', formData.resume.name);

    // Show success
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          experience: '',
          resume: null,
          coverLetter: ''
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 2000);
    }, 1000);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (submitted) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content success-modal">
          <div className="success-icon">✓</div>
          <h3>Application Submitted!</h3>
          <p>Your application for <strong>{job.title}</strong> at {job.company} has been received.</p>
          <p className="demo-note">Resume: {formData.resume?.name} has been saved</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2>Apply for {job.title}</h2>
        <p className="modal-company">{job.company}</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
            />
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 234 567 8900"
            />
          </div>

          <div className="form-group">
            <label>Years of Experience *</label>
            <select
              name="experience"
              required
              value={formData.experience}
              onChange={handleChange}
            >
              <option value="">Select experience</option>
              <option value="0-1">0-1 years</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5-8">5-8 years</option>
              <option value="8+">8+ years</option>
            </select>
          </div>

          <div className="form-group">
            <label>Upload Resume/CV *</label>
            <div className="resume-upload-area">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt"
                className="resume-input"
                id="resume-input"
              />
              <label htmlFor="resume-input" className="resume-label">
                <span className="upload-icon">📄</span>
                {formData.resume ? (
                  <span className="file-name">{formData.resume.name}</span>
                ) : (
                  <span>Click to upload or drag and drop</span>
                )}
              </label>
              {formData.resume && (
                <div className="file-info">
                  <span className="file-size">{formatFileSize(formData.resume.size)}</span>
                  <button 
                    type="button" 
                    className="remove-file"
                    onClick={() => {
                      setFormData({...formData, resume: null});
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
              <p className="upload-hint">Supports PDF, DOC, DOCX, TXT (Max 5MB)</p>
            </div>
            {resumeError && <div className="error-message">{resumeError}</div>}
          </div>

          <div className="form-group">
            <label>Cover Letter</label>
            <textarea
              name="coverLetter"
              rows="4"
              value={formData.coverLetter}
              onChange={handleChange}
              placeholder="Why are you interested in this position? What makes you a good fit?"
            ></textarea>
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplyModal;