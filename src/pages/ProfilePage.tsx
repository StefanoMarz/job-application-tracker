import AppLayout from "../components/AppLayout";
import type { Recruiter } from "../types/Recruiter";
import { useState } from "react";

function ProfilePage() {
  function handleCancel() {
    setFirstName(currentRecruiter?.firstName || "");
    setLastName(currentRecruiter?.lastName || "");
    setEmail(currentRecruiter?.email || "");
    setIsEditing(false);
  }

  function handleSave() {
    if (!currentRecruiter) return;

    const normalizedFirstName = firstName.trim();
    const normalizedLastName = lastName.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedFirstName || !normalizedLastName || !normalizedEmail) {
      alert("Compila tutti i campi.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      alert("Inserisci un indirizzo email valido.");
      return;
    }

    const recruiters: Recruiter[] = JSON.parse(
      localStorage.getItem("recruiters") || "[]"
    );

    const emailAlreadyUsed = recruiters.some(
      (recruiter) =>
        recruiter.id !== currentRecruiter.id &&
        recruiter.email.toLowerCase() === normalizedEmail
    );

    if (emailAlreadyUsed) {
      alert("Questa email è già associata a un altro account.");
      return;
    }

    const updatedRecruiter: Recruiter = {
      ...currentRecruiter,
      firstName: normalizedFirstName,
      lastName: normalizedLastName,
      email: normalizedEmail,
    };

    const updatedRecruiters = recruiters.map((recruiter) =>
      recruiter.id === currentRecruiter.id ? updatedRecruiter : recruiter
    );

    localStorage.setItem("currentRecruiter", JSON.stringify(updatedRecruiter));

    localStorage.setItem("recruiters", JSON.stringify(updatedRecruiters));

    setCurrentRecruiter(updatedRecruiter);
    setFirstName(updatedRecruiter.firstName);
    setLastName(updatedRecruiter.lastName);
    setEmail(updatedRecruiter.email);
    setIsEditing(false);
  }

  const [currentRecruiter, setCurrentRecruiter] = useState<Recruiter | null>(
    () => JSON.parse(localStorage.getItem("currentRecruiter") || "null")
  );
  const [isEditing, setIsEditing] = useState(false);

  const [firstName, setFirstName] = useState(currentRecruiter?.firstName || "");

  const [lastName, setLastName] = useState(currentRecruiter?.lastName || "");

  const [email, setEmail] = useState(currentRecruiter?.email || "");

  return (
    <AppLayout>
      <div className="profile-page">
        <section className="profile-card">
          <div className="profile-header">
            <div>
              <h1>Il tuo profilo</h1>
              <p>Visualizza e aggiorna i dati del tuo account.</p>
            </div>

            <button
              type="button"
              className="profile-edit-button"
              onClick={() => setIsEditing(true)}
              disabled={isEditing}
            >
              {isEditing ? "Modifica in corso" : "Modifica profilo"}
            </button>
          </div>

          {isEditing ? (
            <div className="profile-form">
              <label className="profile-form-field">
                <span>Nome</span>
                <input
                  type="text"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </label>

              <label className="profile-form-field">
                <span>Cognome</span>
                <input
                  type="text"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </label>

              <label className="profile-form-field">
                <span>Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>

              <div className="profile-form-actions">
                <button
                  type="button"
                  className="profile-save-button"
                  onClick={handleSave}
                >
                  Salva modifiche
                </button>

                <button
                  type="button"
                  className="profile-cancel-button"
                  onClick={handleCancel}
                >
                  Annulla
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-details">
              <div className="profile-field">
                <span>Nome</span>
                <strong>{currentRecruiter?.firstName}</strong>
              </div>

              <div className="profile-field">
                <span>Cognome</span>
                <strong>{currentRecruiter?.lastName}</strong>
              </div>

              <div className="profile-field">
                <span>Email</span>
                <strong>{currentRecruiter?.email}</strong>
              </div>

              <div className="profile-field">
                <span>ID account</span>
                <strong>
                  {currentRecruiter?.id.slice(0, 8).toUpperCase()}
                </strong>
              </div>
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
}

export default ProfilePage;
