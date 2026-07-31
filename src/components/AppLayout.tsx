import type { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import type { Recruiter } from "../types/Recruiter";

type AppLayoutProps = {
  children: ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();

  const currentRecruiter: Recruiter | null = JSON.parse(
    localStorage.getItem("currentRecruiter") || "null"
  );

  function handleLogout() {
    localStorage.removeItem("currentRecruiter");
    navigate("/login");
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div>
          <h2 className="sidebar-title">Recruitment Manager</h2>

          <div className="sidebar-user">
            <span className="sidebar-user-status">
              <span className="sidebar-status-dot"></span>
              Profilo autenticato
            </span>
            <strong>
              {currentRecruiter?.firstName} {currentRecruiter?.lastName}
            </strong>
            <span>{currentRecruiter?.email}</span>
          </div>

          <nav className="sidebar-navigation">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/candidates"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              Candidati
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              Profilo
            </NavLink>
          </nav>
        </div>

        <button type="button" className="sidebar-logout" onClick={handleLogout}>
          Disconnetti
        </button>
      </aside>

      <main className="app-content">{children}</main>
    </div>
  );
}

export default AppLayout;
