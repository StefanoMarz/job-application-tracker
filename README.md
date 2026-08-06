# Recruitment Pipeline Manager

A responsive frontend application for managing candidates throughout a recruitment process.

Recruiters can create an account, log in, manage their profile, add candidates, search applications and organize candidates across different hiring stages.

## Live Demo

[View the live application](https://recruitment-pipeline-manager.vercel.app)

## Features

* Recruiter registration and login
* Protected routes
* Recruiter profile management
* Dashboard with candidate statistics
* Candidate creation with form validation
* Candidate search by name, surname, position and company
* Recruitment pipeline divided by hiring stage
* Candidate status updates
* Candidate detail modal
* Candidate editing and deletion
* Responsive navigation and layout
* Browser-based data persistence using localStorage

## Recruitment Stages

Candidates can be organized into the following stages:

* New
* Screening
* First interview
* Second interview
* Rejected
* Hired

## Technologies

* React
* TypeScript
* Vite
* React Router
* CSS
* localStorage
* Vercel

## Project Structure

The project is organized into reusable components, pages, hooks and TypeScript types.

```text
src/
├── components/
│   ├── AppLayout.tsx
│   ├── CandidateCard.tsx
│   └── CandidateModal.tsx
├── hooks/
│   └── useCandidates.ts
├── pages/
│   ├── CandidatesPage.tsx
│   ├── DashboardPage.tsx
│   ├── LoginPage.tsx
│   ├── NewCandidatePage.tsx
│   ├── ProfilePage.tsx
│   └── RegisterPage.tsx
└── types/
    ├── Candidate.ts
    └── Recruiter.ts
```

### Candidate Management

Candidate data management is handled by the `useCandidates` custom hook.

The hook is responsible for:

* loading candidates from localStorage;
* filtering candidates by recruiter;
* searching candidates;
* updating candidate statuses;
* editing candidate information;
* deleting candidates;
* synchronizing changes with localStorage.

The candidate detail and editing interface is handled by the reusable `CandidateModal` component.

This separation keeps `CandidatesPage` focused on displaying the recruitment pipeline and coordinating the main user interactions.

## Running the Project Locally

Clone the repository:

```bash
git clone https://github.com/StefanoMarz/recruitment-pipeline-manager.git
```

Enter the project directory:

```bash
cd recruitment-pipeline-manager
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Code Quality

Run the linter:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Both commands should complete without errors before changes are merged.

## Data Storage

This project currently uses browser localStorage.

Recruiter accounts and candidate data are stored only in the browser where they were created. Data is therefore not shared between different browsers or devices.

The current authentication system is intended for demonstration purposes and does not replace secure server-side authentication.

## Future Improvements

* Node.js backend with TypeScript
* REST API integration
* PostgreSQL database
* Secure server-side authentication
* User-specific candidate data
* Additional candidate filters
* Improved pipeline interactions
* Automated testing

## Author

**Stefano Marzella**

Developed as a frontend portfolio project.
