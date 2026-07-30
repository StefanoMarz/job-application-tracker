import { Link } from "react-router-dom";
import { useState } from "react";
import type { Recruiter } from "../types/Recruiter";

function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister() {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      alert("Compila tutti i campi");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!emailIsValid) {
      alert("Inserisci un indirizzo email valido");
      return;
    }

    const passwordHasLetter = /[a-zA-Z]/.test(password);
    const passwordHasNumber = /\d/.test(password);

    if (password.length < 8 || !passwordHasLetter || !passwordHasNumber) {
      alert(
        "La password deve contenere almeno 8 caratteri, una lettera e un numero"
      );
      return;
    }

    const storedRecruiters = localStorage.getItem("recruiters");

    const recruiters = storedRecruiters ? JSON.parse(storedRecruiters) : [];

    const emailAlreadyExists = recruiters.some(
      (recruiter: Recruiter) =>
        recruiter.email.toLowerCase() === normalizedEmail
    );
    if (emailAlreadyExists) {
      alert("Questa email è già registrata");
      return;
    }

    const newRecruiter: Recruiter = {
      id: crypto.randomUUID(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      password,
    };

    localStorage.setItem(
      "recruiters",
      JSON.stringify([...recruiters, newRecruiter])
    );

    alert("Registrazione completata");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");

    console.log({
      firstName,
      lastName,
      email,
      password,
    });
  }

  return (
    <>
      <div className="register-page">
        <p className="register-page-intro">Crea il tuo account recruiter.</p>

        <div className="register-card">
          <h1>Registrazione</h1>

          <Link to="/login" className="login-link">
            Hai già un account? Accedi
          </Link>
          <div className="register-fields">
            <label>
              Nome:
              <input
                className="register-input"
                type="text"
                placeholder="Nome"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </label>
            <label>
              Cognome:
              <input
                className="register-input"
                type="text"
                placeholder="Cognome"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </label>

            <label>
              Email:
              <input
                className="register-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            <label>
              Password:
              <input
                className="register-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <small className="password-requirements">
                Almeno 8 caratteri, deve contenere almeno una lettera e un
                numero.
              </small>
            </label>
          </div>

          <button
            type="button"
            className="register-button"
            onClick={handleRegister}
          >
            Registrati
          </button>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
