import { Link } from "react-router-dom";
import type { Candidate, CandidateStatus } from "../types/Candidate";
import type { Recruiter } from "../types/Recruiter";
import { useState } from "react";
import CandidateCard from "../components/CandidateCard";
import AppLayout from "../components/AppLayout";

function CandidatesPage() {
  const storedRecruiter = localStorage.getItem("currentRecruiter");
  const storedCandidates = localStorage.getItem("candidates");

  const currentRecruiter: Recruiter | null = storedRecruiter
    ? JSON.parse(storedRecruiter)
    : null;

  const [candidates, setCandidates] = useState<Candidate[]>(
    storedCandidates ? JSON.parse(storedCandidates) : []
  );
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(
    null
  );
  const [editingPhonePrefix, setEditingPhonePrefix] = useState("+39");
  const [editingPhoneNumber, setEditingPhoneNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const recruiterCandidates = currentRecruiter
    ? candidates.filter(
        (candidate) => candidate.recruiterId === currentRecruiter.id
      )
    : [];

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredCandidates = recruiterCandidates.filter((candidate) => {
    const fullName =
      `${candidate.firstName} ${candidate.lastName}`.toLowerCase();

    return (
      fullName.includes(normalizedSearchTerm) ||
      candidate.role.toLowerCase().includes(normalizedSearchTerm) ||
      candidate.currentCompany?.toLowerCase().includes(normalizedSearchTerm)
    );
  });

  function handleDeleteCandidate(candidateId: string) {
    const shouldDelete = window.confirm(
      "Sei sicura di voler cancellare questo candidato?"
    );

    if (!shouldDelete) {
      return;
    }
    const updatedCandidates = candidates.filter(
      (candidate) => candidate.id !== candidateId
    );

    localStorage.setItem("candidates", JSON.stringify(updatedCandidates));

    setCandidates(updatedCandidates);
  }

  function handleStatusChange(candidateId: string, newStatus: CandidateStatus) {
    const updatedCandidates = candidates.map((candidate) =>
      candidate.id === candidateId
        ? { ...candidate, status: newStatus }
        : candidate
    );

    localStorage.setItem("candidates", JSON.stringify(updatedCandidates));

    setCandidates(updatedCandidates);
  }

  const statusLabels: Record<CandidateStatus, string> = {
    new: "Da visionare",
    screening: "Screening",
    "first-interview": "Colloquio conoscitivo",
    "second-interview": "Colloquio tecnico",
    rejected: "Rifiutato",
    hired: "Assunto",
  };

  const pipelineStatuses: CandidateStatus[] = [
    "new",
    "screening",
    "first-interview",
    "second-interview",
    "rejected",
    "hired",
  ];

  function handleSaveChanges() {
    if (!editingCandidate) {
      return;
    }

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

    const updatedCandidates = candidates.map((candidate) =>
      candidate.id === updatedCandidate.id ? updatedCandidate : candidate
    );

    localStorage.setItem("candidates", JSON.stringify(updatedCandidates));

    setCandidates(updatedCandidates);
    setSelectedCandidate(updatedCandidate);
    setEditingCandidate(null);
    setIsEditing(false);
    setEditingPhonePrefix("+39");
    setEditingPhoneNumber("");
  }

  return (
    <AppLayout>
      <div className="candidates-page">
        <div className="candidates-header">
          <div className="candidates-heading">
            <span className="section-label">Recruitment pipeline</span>

            <h1>Candidati</h1>

            <p>
              Organizza e monitora ogni candidatura nelle diverse fasi di
              selezione.
            </p>
          </div>
          <div className="candidates-header-actions">
            <Link to="/candidates/new" className="add-candidate-link">
              Aggiungi candidato
            </Link>
          </div>
        </div>

        <div className="candidates-search">
          <label htmlFor="candidate-search">Cerca candidato</label>

          <input
            id="candidate-search"
            type="search"
            placeholder="Filtra per nome, cognome, posizione o azienda"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          {searchTerm && (
            <button
              type="button"
              className="clear-search-button"
              onClick={() => setSearchTerm("")}
            >
              Cancella ricerca
            </button>
          )}
        </div>
        {recruiterCandidates.length === 0 ? (
          <div className="empty-candidates">
            <h2>Nessun candidato presente</h2>
          </div>
        ) : filteredCandidates.length === 0 ? (
          <div className="empty-candidates">
            <h2>Nessun candidato trovato</h2>
            <p>Prova a modificare i termini della ricerca.</p>
          </div>
        ) : (
          <div className="pipeline-scroll">
            <div className="pipeline">
              {pipelineStatuses.map((pipelineStatus) => (
                <section className="pipeline-column" key={pipelineStatus}>
                  <h2>{statusLabels[pipelineStatus]}</h2>

                  <p>
                    {
                      filteredCandidates.filter(
                        (candidate) => candidate.status === pipelineStatus
                      ).length
                    }{" "}
                    candidati
                  </p>

                  <ul>
                    {filteredCandidates
                      .filter(
                        (candidate) => candidate.status === pipelineStatus
                      )
                      .map((candidate) => (
                        <CandidateCard
                          key={candidate.id}
                          candidate={candidate}
                          onStatusChange={handleStatusChange}
                          onDelete={handleDeleteCandidate}
                          onOpen={setSelectedCandidate}
                        />
                      ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        )}
        {selectedCandidate && (
          <div className="candidate-modal-overlay">
            <div className="candidate-modal">
              {isEditing && editingCandidate ? (
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
                    {selectedCandidate.firstName} {selectedCandidate.lastName}
                  </h2>

                  <p className="candidate-detail-row">
                    <span className="candidate-detail-label">
                      Posizione da candidato:{" "}
                    </span>
                    <strong className="candidate-detail-value">
                      {selectedCandidate.role}
                    </strong>
                  </p>

                  <p className="candidate-detail-row">
                    <span className="candidate-detail-label">
                      Ruolo attuale:{" "}
                    </span>
                    <strong className="candidate-detail-value">
                      {selectedCandidate.currentRole}
                    </strong>
                  </p>

                  <p className="candidate-detail-row">
                    <span className="candidate-detail-label">
                      Azienda attuale:{" "}
                    </span>
                    <strong className="candidate-detail-value">
                      {selectedCandidate.currentCompany || "Non indicata"}
                    </strong>
                  </p>

                  <p className="candidate-detail-row">
                    <span className="candidate-detail-label">Email: </span>
                    <strong className="candidate-detail-value">
                      {selectedCandidate.email}
                    </strong>
                  </p>

                  <p className="candidate-detail-row">
                    <span className="candidate-detail-label">Telefono: </span>
                    <strong className="candidate-detail-value">
                      {selectedCandidate.phone}
                    </strong>
                  </p>

                  {selectedCandidate.notes && (
                    <p className="candidate-detail-row">
                      <span className="candidate-detail-label">Note: </span>
                      <strong className="candidate-detail-value">
                        {selectedCandidate.notes}
                      </strong>
                    </p>
                  )}
                </>
              )}

              <button
                type="button"
                className="candidate-modal-close"
                aria-label="Chiudi dettagli candidato"
                onClick={() => {
                  setSelectedCandidate(null);
                  setIsEditing(false);
                }}
              >
                ×
              </button>

              {isEditing ? (
                <div className="candidate-modal-actions">
                  <button
                    type="button"
                    className="candidate-cancel-edit"
                    onClick={() => {
                      setEditingCandidate(null);
                      setEditingPhonePrefix("+39");
                      setEditingPhoneNumber("");
                      setIsEditing(false);
                    }}
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
                  onClick={() => {
                    const phoneMatch =
                      selectedCandidate.phone.match(/^(\+\d{1,4})(\d+)$/);

                    setEditingCandidate(selectedCandidate);
                    setEditingPhonePrefix(phoneMatch?.[1] ?? "+39");
                    setEditingPhoneNumber(
                      phoneMatch?.[2] ?? selectedCandidate.phone
                    );
                    setIsEditing(true);
                  }}
                >
                  Modifica
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default CandidatesPage;
