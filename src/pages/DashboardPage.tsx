import { Link, useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("currentRecruiter");
    navigate("/login");
  }
  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        <h1>Recruitment Dashboard</h1>

        <p className="dashboard-intro">
          Gestisci i candidati e monitora il processo di selezione.
        </p>

        <div className="dashboard-actions">
          <Link to="/candidates" className="dashboard-primary-action">
            Gestisci candidati
          </Link>

          <button
            type="button"
            className="dashboard-logout-button"
            onClick={handleLogout}
          >
            Disconnetti
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
