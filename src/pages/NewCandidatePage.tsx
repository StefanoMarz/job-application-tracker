import { useState } from "react";
import type { Candidate, CandidateStatus } from "../types/Candidate";
import type { Recruiter } from "../types/Recruiter";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";

function NewCandidatePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("+39");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<CandidateStatus>("new");
  const [currentRole, setCurrentRole] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  function handleSaveCandidate() {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !role.trim() ||
      !currentRole.trim()
    ) {
      alert("Compila tutti i campi obbligatori");

      if (!/^\+\d{1,4}$/.test(phonePrefix)) {
        alert("Inserisci un prefisso telefonico valido");
        return;
      }

      if (phone.length < 6 || phone.length > 10) {
        alert("Il numero di telefono deve contenere da 6 a 10 cifre");
        return;
      }

      return;
    }
    const normalizedEmail = email.trim().toLowerCase();

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!emailIsValid) {
      alert("Inserisci un indirizzo email valido");
      return;
    }
    const storedRecruiter = localStorage.getItem("currentRecruiter");

    if (!storedRecruiter) {
      alert("Sessione non valida");
      return;
    }

    const currentRecruiter: Recruiter = JSON.parse(storedRecruiter);

    const newCandidate: Candidate = {
      id: crypto.randomUUID(),
      recruiterId: currentRecruiter.id,
      createdAt: new Date().toISOString(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: `${phonePrefix}${phone}`,
      email: normalizedEmail,
      role: role.trim(),
      currentRole: currentRole.trim(),
      currentCompany: currentCompany.trim() || undefined,
      status,
      notes: notes.trim() || undefined,
    };

    const storedCandidates = localStorage.getItem("candidates");

    const candidates: Candidate[] = storedCandidates
      ? JSON.parse(storedCandidates)
      : [];

    const updatedCandidates = [...candidates, newCandidate];

    localStorage.setItem("candidates", JSON.stringify(updatedCandidates));
    navigate("/candidates");
  }

  return (
    <AppLayout>
      <div className="new-candidate-page">
        <p className="new-candidate-intro">
          Inserisci le informazioni del nuovo candidato.
        </p>

        <div className="new-candidate-card">
          <h1>Aggiungi candidato</h1>

          <div className="new-candidate-fields">
            <label>
              Nome
              <input
                className="new-candidate-input"
                type="text"
                placeholder="Inserisci il nome"
                value={firstName}
                onChange={(event) =>
                  setFirstName(event.target.value.toUpperCase())
                }
              />
            </label>

            <label>
              Cognome
              <input
                className="new-candidate-input"
                type="text"
                placeholder="Inserisci il cognome"
                value={lastName}
                onChange={(event) =>
                  setLastName(event.target.value.toUpperCase())
                }
              />
            </label>

            <label className="phone-field">
              Numero di telefono
              <div className="phone-inputs">
                <input
                  className="phone-prefix-input"
                  type="text"
                  inputMode="tel"
                  maxLength={5}
                  value={phonePrefix}
                  onChange={(event) => {
                    let value = event.target.value.replace(/[^\d+]/g, "");

                    if (value && !value.startsWith("+")) {
                      value = `+${value}`;
                    }

                    setPhonePrefix(value);
                  }}
                  aria-label="Prefisso telefonico"
                />

                <input
                  className="new-candidate-input"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="Numero di telefono"
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value.replace(/\D/g, ""))
                  }
                />
              </div>
            </label>

            <label>
              Email
              <input
                className="new-candidate-input"
                type="email"
                placeholder="Inserisci l'email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            <label>
              Ruolo attuale
              <input
                className="new-candidate-input"
                type="text"
                placeholder="Es. Frontend Developer"
                value={currentRole}
                onChange={(event) => setCurrentRole(event.target.value)}
              />
            </label>

            <label>
              Azienda attuale
              <input
                className="new-candidate-input"
                type="text"
                placeholder="Campo facoltativo"
                value={currentCompany}
                onChange={(event) => setCurrentCompany(event.target.value)}
              />
            </label>

            <label>
              Posizione per cui si candida
              <input
                className="new-candidate-input"
                type="text"
                placeholder="Es. Junior React Developer"
                value={role}
                onChange={(event) => setRole(event.target.value)}
              />
            </label>

            <label>
              Stato
              <select
                className="new-candidate-input"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as CandidateStatus)
                }
              >
                <option value="new">Da visionare</option>
                <option value="screening">Screening</option>
                <option value="first-interview">Primo colloquio</option>
                <option value="second-interview">Secondo colloquio</option>
                <option value="rejected">Rifiutato</option>
                <option value="hired">Assunto</option>
              </select>
            </label>

            <label className="new-candidate-notes">
              Note
              <textarea
                className="new-candidate-input"
                placeholder="Aggiungi eventuali note sul candidato"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
            </label>
          </div>

          <div className="new-candidate-actions">
            <button
              type="button"
              className="new-candidate-cancel"
              onClick={() => navigate("/candidates")}
            >
              Annulla
            </button>

            <button
              type="button"
              className="new-candidate-save"
              onClick={handleSaveCandidate}
            >
              Salva candidato
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default NewCandidatePage;
