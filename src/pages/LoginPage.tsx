import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Recruiter } from "../types/Recruiter";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    const storedRecruiters = localStorage.getItem("recruiters");

    const recruiters: Recruiter[] = storedRecruiters
      ? JSON.parse(storedRecruiters)
      : [];

    const recruiterFound = recruiters.find(
      (recruiter) =>
        recruiter.email === email.trim().toLowerCase() &&
        recruiter.password === password
    );

    if (!recruiterFound) {
      alert("Email o password non corrette");
      return;
    }

    localStorage.setItem("currentRecruiter", JSON.stringify(recruiterFound));

    navigate("/dashboard");

    console.log(recruiterFound);
  }

  return (
    <>
      <div className="login-page">
        <p className="login-page-intro">
          Accedi per gestire candidati e processi di selezione.
        </p>
        <div className="login-card">
          <Link to="/register" className="register-link">
            Crea un account
          </Link>

          <div className="login-fields">
            <input
              className="login-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <input
              className="login-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button type="button" className="login-button" onClick={handleLogin}>
            Accedi
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
