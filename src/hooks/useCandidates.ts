import { useState } from "react";
import type { Candidate, CandidateStatus } from "../types/Candidate";
import type { Recruiter } from "../types/Recruiter";

export function useCandidates() {
  const [currentRecruiter] = useState<Recruiter | null>(() => {
    const storedRecruiter = localStorage.getItem("currentRecruiter");

    return storedRecruiter ? JSON.parse(storedRecruiter) : null;
  });

  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    const storedCandidates = localStorage.getItem("candidates");

    return storedCandidates ? JSON.parse(storedCandidates) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");

  function saveCandidates(updatedCandidates: Candidate[]) {
    localStorage.setItem("candidates", JSON.stringify(updatedCandidates));
    setCandidates(updatedCandidates);
  }

  function deleteCandidate(candidateId: string) {
    const updatedCandidates = candidates.filter(
      (candidate) => candidate.id !== candidateId
    );

    saveCandidates(updatedCandidates);
  }

  function updateCandidateStatus(
    candidateId: string,
    newStatus: CandidateStatus
  ) {
    const updatedCandidates = candidates.map((candidate) =>
      candidate.id === candidateId
        ? { ...candidate, status: newStatus }
        : candidate
    );

    saveCandidates(updatedCandidates);
  }

  function updateCandidate(updatedCandidate: Candidate) {
    const updatedCandidates = candidates.map((candidate) =>
      candidate.id === updatedCandidate.id ? updatedCandidate : candidate
    );

    saveCandidates(updatedCandidates);
  }

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

  return {
    recruiterCandidates,
    filteredCandidates,
    searchTerm,
    setSearchTerm,
    deleteCandidate,
    updateCandidateStatus,
    updateCandidate,
  };
}