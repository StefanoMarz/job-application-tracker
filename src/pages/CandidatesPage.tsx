import { Link } from "react-router-dom";
import type { Candidate, CandidateStatus } from "../types/Candidate";
import CandidateCard from "../components/CandidateCard";
import { useCandidates } from "../hooks/useCandidates";
import AppLayout from "../components/AppLayout";
import { useState } from "react";
import CandidateModal from "../components/CandidateModal";

function CandidatesPage() {
  const {
    recruiterCandidates,
    filteredCandidates,
    searchTerm,
    setSearchTerm,
    deleteCandidate,
    updateCandidateStatus,
    updateCandidate,
  } = useCandidates();

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );

  function handleDeleteCandidate(candidateId: string) {
    const shouldDelete = window.confirm(
      "Sei sicura di voler cancellare questo candidato?"
    );

    if (!shouldDelete) {
      return;
    }
    deleteCandidate(candidateId);
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
  function handleUpdateCandidate(updatedCandidate: Candidate) {
    updateCandidate(updatedCandidate);
    setSelectedCandidate(updatedCandidate);
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
                          onStatusChange={updateCandidateStatus}
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
          <CandidateModal
            candidate={selectedCandidate}
            onClose={() => setSelectedCandidate(null)}
            onSave={handleUpdateCandidate}
          />
        )}
      </div>
    </AppLayout>
  );
}

export default CandidatesPage;
