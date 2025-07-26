# Remote Job Aggregator + Application Tracker

A full-stack web application that helps users discover and track remote job opportunities. The application fetches jobs from public APIs and provides a comprehensive system for managing job applications.

## 🎯 Features

- **Job Discovery**
  - Integration with Remotive API
  - Search jobs by keyword or category
  - Advanced filtering options

- **User Management**
  - Email & password authentication
  - Social login (GitHub, LinkedIn) support
  - Profile management
  - Skills tracking

- **Job Management**
  - Save interesting jobs
  - Track application status
  - Add notes and next steps
  - Application statistics

## 🛠️ Tech Stack

- **Backend**
  - Node.js
  - Express.js
  - MySQL with Sequelize ORM
  - JWT Authentication
  - Express Session

- **API Integration**
  - Remotive API
  - GitHub OAuth
  - LinkedIn OAuth

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/remote-job-tracker.git
   cd remote-job-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the root directory:
   ```env
   # Server
   PORT=3000
   NODE_ENV=development

   # Database
   DB_NAME=job_tracker
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_HOST=localhost

   # Session
   SESSION_SECRET=your_session_secret

   # OAuth (optional)
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   LINKEDIN_CLIENT_ID=your_linkedin_client_id
   LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
   ```

4. Initialize the database:
   ```bash
   # Create MySQL database
   mysql -u root -p
   CREATE DATABASE job_tracker;
   ```

5. Start the server:
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## 📚 API Documentation

### Authentication Routes
- POST `/api/auth/signup` - Register new user
- POST `/api/auth/login` - User login
- POST `/api/auth/logout` - User logout
- GET `/api/auth/me` - Get current user

### Job Routes
- GET `/api/jobs/search` - Search jobs
- GET `/api/jobs/categories` - Get job categories
- GET `/api/jobs/:id` - Get job details
- POST `/api/jobs/:id/save` - Save a job
- GET `/api/jobs/applications` - Get user's applications

### User Routes
- GET `/api/users/profile` - Get user profile
- PATCH `/api/users/profile` - Update profile
- GET `/api/users/dashboard` - Get dashboard data

## 🗄️ Database Schema

### Users
- id (PK)
- email (unique)
- password
- firstName
- lastName
- githubId
- linkedinId
- skills (JSON)

### Jobs
- id (PK)
- remoteId
- title
- company
- category
- jobType
- location
- description
- applyUrl
- salary
- tags (JSON)
- postedAt

### Applications
- id (PK)
- userId (FK)
- jobId (FK)
- status (ENUM)
- appliedDate
- notes
- nextStep
- interviewDate

### SavedJobs
- id (PK)
- userId (FK)
- jobId (FK)
- savedAt
- notes

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- [Remotive API](https://remotive.io/api/remote-jobs) for providing job data
- Express.js community
- Sequelize ORM team 