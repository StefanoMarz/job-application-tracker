import type { Candidate, CandidateStatus } from "../types/Candidate";

type CandidateCardProps = {
  candidate: Candidate;
  onStatusChange: (candidateId: string, newStatus: CandidateStatus) => void;
  onDelete: (candidateId: string) => void;
  onOpen: (candidate: Candidate) => void;
};

function CandidateCard({
  candidate,
  onStatusChange,
  onDelete,
  onOpen,
}: CandidateCardProps) {
  return (
    <li>
<h3 className="candidate-name">
  {candidate.firstName} {candidate.lastName}
</h3>

      <label>
        <strong>Stato:</strong>{" "}
        <select
          value={candidate.status}
          onChange={(event) =>
            onStatusChange(candidate.id, event.target.value as CandidateStatus)
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
      <div className="candidate-card-actions">

  <button
    type="button"
    className="candidate-details-button"
    onClick={() => onOpen(candidate)}
  >
    Dettagli
  </button>

  <button
    type="button"
    className="delete-candidate-button"
    onClick={() => onDelete(candidate.id)}
  >
    Cancella
  </button>
</div>
    </li>
  );
}

export default CandidateCard;
