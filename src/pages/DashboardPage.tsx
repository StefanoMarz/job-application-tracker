import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import type { Candidate } from "../types/Candidate";
import type { Recruiter } from "../types/Recruiter";

function DashboardPage() {
  const currentRecruiter: Recruiter | null = JSON.parse(
    localStorage.getItem("currentRecruiter") || "null"
  );

  const candidates: Candidate[] = JSON.parse(
    localStorage.getItem("candidates") || "[]"
  );

  const recruiterCandidates = candidates.filter(
    (candidate) => candidate.recruiterId === currentRecruiter?.id
  );

  const totalCandidates = recruiterCandidates.length;

  const newCandidates = recruiterCandidates.filter(
    (candidate) => candidate.status === "new"
  ).length;

  const interviewingCandidates = recruiterCandidates.filter(
    (candidate) =>
      candidate.status === "first-interview" ||
      candidate.status === "second-interview"
  ).length;

  const hiredCandidates = recruiterCandidates.filter(
    (candidate) => candidate.status === "hired"
  ).length;

  const rejectedCandidates = recruiterCandidates.filter(
    (candidate) => candidate.status === "rejected"
  ).length;

  return (
    <AppLayout>
      <div className="dashboard-page">
        <div className="dashboard-card">
          <h1>Recruitment Dashboard</h1>

          <p className="dashboard-intro">
            Gestisci i candidati e monitora il processo di selezione.
          </p>

          <div className="dashboard-stats">
            <div className="dashboard-stat-card">
              <span>Candidati totali</span>
              <strong>{totalCandidates}</strong>
            </div>

            <div className="dashboard-stat-card">
              <span>Da visionare</span>
              <strong>{newCandidates}</strong>
            </div>

            <div className="dashboard-stat-card">
              <span>In colloquio</span>
              <strong>{interviewingCandidates}</strong>
            </div>

            <div className="dashboard-stat-card">
              <span>Assunti</span>
              <strong>{hiredCandidates}</strong>
            </div>

            <div className="dashboard-stat-card">
              <span>Rifiutati</span>
              <strong>{rejectedCandidates}</strong>
            </div>
          </div>

          <div className="dashboard-actions">
            <Link to="/candidates" className="dashboard-primary-action">
              Gestisci candidati
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default DashboardPage;
