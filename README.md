# Recruitment Pipeline Manager

A frontend application for managing candidates throughout a recruitment process.

The application allows recruiters to register, log in, add candidates and organize them across different hiring stages.

## Live Demo

[View the live application](https://job-application-tracker-ichis1.vercel.app)

## Features

- Recruiter registration and login
- Protected routes
- Candidate creation and validation
- Candidate search by name, surname, position and company
- Recruitment pipeline divided by hiring stage
- Candidate status updates
- Candidate detail modal
- Candidate editing and deletion
- Data persistence using localStorage
- Responsive interface

## Technologies

- React
- TypeScript
- Vite
- React Router
- CSS
- Local Storage
- Vercel

## Recruitment Stages

Candidates can be organized into the following stages:

- New
- Screening
- First interview
- Second interview
- Rejected
- Hired

## Running the Project Locally

Clone the repository:

```bash
git clone https://github.com/StefanoMarz/job-application-tracker.git

Enter the project directory:

cd job-application-tracker

Install the dependencies:

npm install

Start the development server:

npm run dev
Build

To create a production build:

npm run build
Data Storage

This project currently uses browser localStorage.

Recruiters and candidates are therefore stored only in the browser and are not shared between devices.

Future Improvements
Recruiter profile page
Shared application sidebar
Improved responsive navigation
Additional candidate filters
Backend and database integration
Author Stefano Marzella

Developed by Stefano Marzella