# 💼 JobBoard

A modern job board web app built with React. Browse jobs, create an account, filter by category/location/type, and submit applications with resume upload.

## 🔗 Links

- **GitHub:** https://github.com/YOUR_USERNAME/job-platform
- **Live Demo:** Coming soon (after backend deployment)

## ✨ Features

- Entry screen with animated stats
- User authentication (Signup/Login) - localStorage based
- 16+ jobs across 15 industries (Healthcare, Education, Marketing, Construction, Hospitality, Finance, Tech, etc.)
- Search by title, company, or keywords
- Filter by location, job type, and category
- Job application form with resume upload (PDF, DOC, DOCX, TXT, max 5MB)
- Toast notifications for all actions
- Fully responsive (mobile, tablet, desktop)

## 🛠️ Tech Stack

- React 18 + Vite
- CSS3 (custom, no frameworks)
- localStorage (demo data persistence)

## 📁 Project Structure
src/
├── components/
│ ├── EntryScreen.jsx # Landing page
│ ├── AuthModal.jsx # Signup/Login
│ ├── Navbar.jsx # Navigation
│ ├── JobCard.jsx # Job card
│ ├── JobList.jsx # Jobs grid
│ ├── FilterBar.jsx # Search & filters
│ ├── ApplyModal.jsx # Application form
│ ├── Toast.jsx # Notifications
│ └── ToastContainer.jsx
├── data/
│ └── jobs.json # 16 mock jobs
├── App.jsx
└── App.css

text

## 🏃 Run Locally

```bash
git clone https://github.com/YOUR_USERNAME/job-platform.git
cd job-platform
npm install
npm run dev
Visit http://localhost:5173

🧪 View Stored Data
Chrome DevTools (F12) → Application → Local Storage → http://localhost:5173

Keys: users, currentUser, applications, resumes

📱 Responsive Breakpoints
Device	Breakpoint
Desktop	>1024px (2-3 columns)
Tablet	768-1024px (1-2 columns)
Mobile	<768px (1 column)
🔜 Coming Soon (Phase 2)
PostgreSQL/MongoDB database

Real email notifications

Employer dashboard

Stripe payments

Application tracking

🙋‍♂️ Author
Your Sumeghna Banerjee

GitHub: @sumeghna

Email: your.email@example.com

📄 License
MIT

text

---

