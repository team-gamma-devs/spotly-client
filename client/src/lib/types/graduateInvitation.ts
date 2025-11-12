// This defines the graduate structure for the status dashboard, initially each graduate item in the status board
// was going to be a pill shape, that's why the name.
// Check components/manager/GraduateStatusTable.svelte

export interface GraduateInvitation {
  id: string;
  fullName: string;
  email: string;
  cohort: number;
  logState: boolean;
  createdAt: string;
  expiresAt: string;
}

// Backend response structure matching InvitationsResultResponse
export interface PaginatedInvitationsResponse {
  items: GraduateInvitation[];  // The invitations list
  pages: number;                // Total number of pages
  page: number;                 // Current page number (1-indexed)
  limit: number;                // Items per page
}