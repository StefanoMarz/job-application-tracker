# Recruitment Pipeline Manager

A responsive frontend application for managing candidates throughout a recruitment process.

Recruiters can create an account, log in, manage their profile, add candidates and organize them across different hiring stages.

## Live Demo

[View the live application](https://job-application-tracker-ichis1.vercel.app)

## Features

- Recruiter registration and login
- Protected routes
- Recruiter profile management
- Dashboard with candidate statistics
- Candidate creation and form validation
- Candidate search by name, surname, position and company
- Recruitment pipeline divided by hiring stage
- Candidate status updates
- Candidate detail modal
- Candidate editing and deletion
- Responsive navigation and layout
- Data persistence using localStorage

## Recruitment Stages

Candidates can be organized into the following stages:

- New
- Screening
- First interview
- Second interview
- Rejected
- Hired

## Technologies

- React
- TypeScript
- Vite
- React Router
- CSS
- localStorage
- Vercel

## Running the Project Locally

Clone the repository:

```bash
git clone https://github.com/StefanoMarz/job-application-tracker.git
```

Enter the project directory:

```bash
cd job-application-tracker
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Production Build

To create a production build:

```bash
npm run build
```

## Data Storage

This project currently uses browser localStorage.

Recruiter accounts and candidate data are stored only in the browser. Data is therefore not shared between different browsers or devices.

The authentication system is intended for demonstration purposes and does not replace secure server-side authentication.

## Future Improvements

- Backend and database integration
- Secure server-side authentication
- Additional candidate filters
- Improved pipeline interactions
- Automated testing

## Author

**Stefano Marzella**

Developed as a frontend portfolio project.
