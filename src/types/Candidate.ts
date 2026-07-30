
export type CandidateStatus =
  | "new"
  | "screening"
  | "first-interview"
  | "second-interview"
  | "rejected"
  | "hired";

export type Candidate = {
    
    id: string;
    recruiterId: string;
    createdAt: string,
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    role: string;
    currentRole: string;
    currentCompany?: string;
    status: CandidateStatus;
    notes?: string;
  };
