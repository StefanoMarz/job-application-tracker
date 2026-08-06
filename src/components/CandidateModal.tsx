import { useState } from "react";
import type { Candidate } from "../types/Candidate";

type CandidateModalProps = {
  candidate: Candidate;
  onClose: () => void;
  onSave: (updatedCandidate: Candidate) => void;
};

function CandidateModal({
  candidate,
  onClose,
  onSave,
}: CandidateModalProps) {
  const phoneMatch = candidate.phone.match(/^(\+\d{1,4})(\d+)$/);

  const [isEditing, setIsEditing] = useState(false);
  const [editingCandidate, setEditingCandidate] =
    useState<Candidate>(candidate);

  const [editingPhonePrefix, setEditingPhonePrefix] = useState(
    phoneMatch?.[1] ?? "+39"
  );

  const [editingPhoneNumber, setEditingPhoneNumber] = useState(
    phoneMatch?.[2] ?? candidate.phone
  );

  function resetEditing() {
    const currentPhoneMatch = candidate.phone.match(/^(\+\d{1,4})(\d+)$/);

    setEditingCandidate(candidate);
    setEditingPhonePrefix(currentPhoneMatch?.[1] ?? "+39");
    setEditingPhoneNumber(currentPhoneMatch?.[2] ?? candidate.phone);
    setIsEditing(false);
  }

  function handleSaveChanges() {
    if (
      !editingCandidate.firstName.trim() ||
      !editingCandidate.lastName.trim() ||
      !editingCandidate.email.trim() ||
      !editingCandidate.role.trim() ||
      !editingCandidate.currentRole.trim()
    ) {
      alert("Compila tutti i campi obbligatori");
      return;
    }

    const normalizedEmail = editingCandidate.email.trim().toLowerCase();

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!emailIsValid) {
      alert("Inserisci un indirizzo email valido");
      return;
    }

    if (!/^\+\d{1,4}$/.test(editingPhonePrefix)) {
      alert("Inserisci un prefisso telefonico valido");
      return;
    }

    if (editingPhoneNumber.length < 6 || editingPhoneNumber.length > 10) {
      alert("Il numero di telefono deve contenere da 6 a 10 cifre");
      return;
    }

    const updatedCandidate: Candidate = {
      ...editingCandidate,
      firstName: editingCandidate.firstName.trim().toUpperCase(),
      lastName: editingCandidate.lastName.trim().toUpperCase(),
      email: normalizedEmail,
      phone: `${editingPhonePrefix}${editingPhoneNumber}`,
      role: editingCandidate.role.trim(),
      currentRole: editingCandidate.currentRole.trim(),
      currentCompany: editingCandidate.currentCompany?.trim() || undefined,
      notes: editingCandidate.notes?.trim() || undefined,
    };

    onSave(updatedCandidate);
    setEditingCandidate(updatedCandidate);
    setIsEditing(false);
  }

  return (
    <div className="candidate-modal-overlay">
      <div className="candidate-modal">
        {isEditing ? (
          <div className="candidate-edit-fields">
            <label>
              Nome
              <input
                type="text"
                value={editingCandidate.firstName}
                onChange={(event) =>
                  setEditingCandidate({
                    ...editingCandidate,
                    firstName: event.target.value,
                  })
                }
              />
            </label>

            <label>
              Cognome
              <input
                type="text"
                value={editingCandidate.lastName}
                onChange={(event) =>
                  setEditingCandidate({
                    ...editingCandidate,
                    lastName: event.target.value,
                  })
                }
              />
            </label>

            <label>
              Posizione
              <input
                type="text"
                value={editingCandidate.role}
                onChange={(event) =>
                  setEditingCandidate({
                    ...editingCandidate,
                    role: event.target.value,
                  })
                }
              />
            </label>

            <label>
              Ruolo attuale
              <input
                type="text"
                value={editingCandidate.currentRole}
                onChange={(event) =>
                  setEditingCandidate({
                    ...editingCandidate,
                    currentRole: event.target.value,
                  })
                }
              />
            </label>

            <label>
              Azienda attuale
              <input
                type="text"
                value={editingCandidate.currentCompany ?? ""}
                onChange={(event) =>
                  setEditingCandidate({
                    ...editingCandidate,
                    currentCompany: event.target.value,
                  })
                }
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={editingCandidate.email}
                onChange={(event) =>
                  setEditingCandidate({
                    ...editingCandidate,
                    email: event.target.value,
                  })
                }
              />
            </label>

            <label>
              Telefono
              <div className="phone-inputs">
                <input
                  className="phone-prefix-input"
                  type="text"
                  inputMode="tel"
                  maxLength={5}
                  value={editingPhonePrefix}
                  onChange={(event) => {
                    let value = event.target.value.replace(/[^\d+]/g, "");

                    if (value && !value.startsWith("+")) {
                      value = `+${value}`;
                    }

                    setEditingPhonePrefix(value);
                  }}
                  aria-label="Prefisso telefonico"
                />

                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={editingPhoneNumber}
                  onChange={(event) =>
                    setEditingPhoneNumber(
                      event.target.value.replace(/\D/g, "")
                    )
                  }
                  aria-label="Numero di telefono"
                />
              </div>
            </label>

            <label>
              Note
              <textarea
                value={editingCandidate.notes ?? ""}
                onChange={(event) =>
                  setEditingCandidate({
                    ...editingCandidate,
                    notes: event.target.value,
                  })
                }
              />
            </label>
          </div>
        ) : (
          <>
            <h2 className="candidate-modal-name">
              {candidate.firstName} {candidate.lastName}
            </h2>

            <p className="candidate-detail-row">
              <span className="candidate-detail-label">
                Posizione da candidato:{" "}
              </span>
              <strong className="candidate-detail-value">
                {candidate.role}
              </strong>
            </p>

            <p className="candidate-detail-row">
              <span className="candidate-detail-label">Ruolo attuale: </span>
              <strong className="candidate-detail-value">
                {candidate.currentRole}
              </strong>
            </p>

            <p className="candidate-detail-row">
              <span className="candidate-detail-label">
                Azienda attuale:{" "}
              </span>
              <strong className="candidate-detail-value">
                {candidate.currentCompany || "Non indicata"}
              </strong>
            </p>

            <p className="candidate-detail-row">
              <span className="candidate-detail-label">Email: </span>
              <strong className="candidate-detail-value">
                {candidate.email}
              </strong>
            </p>

            <p className="candidate-detail-row">
              <span className="candidate-detail-label">Telefono: </span>
              <strong className="candidate-detail-value">
                {candidate.phone}
              </strong>
            </p>

            {candidate.notes && (
              <p className="candidate-detail-row">
                <span className="candidate-detail-label">Note: </span>
                <strong className="candidate-detail-value">
                  {candidate.notes}
                </strong>
              </p>
            )}
          </>
        )}

        <button
          type="button"
          className="candidate-modal-close"
          aria-label="Chiudi dettagli candidato"
          onClick={onClose}
        >
          ×
        </button>

        {isEditing ? (
          <div className="candidate-modal-actions">
            <button
              type="button"
              className="candidate-cancel-edit"
              onClick={resetEditing}
            >
              Annulla
            </button>

            <button
              type="button"
              className="candidate-save-edit"
              onClick={handleSaveChanges}
            >
              Salva modifiche
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="edit-candidate-button"
            onClick={() => setIsEditing(true)}
          >
            Modifica
          </button>
        )}
      </div>
    </div>
  );
}

export default CandidateModal;