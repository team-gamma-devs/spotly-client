// This defines the graduate structure for the status dashboard
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

// Backend response structure match InvitationsResultResponse
export interface PaginatedInvitationsResponse {
  items: GraduateInvitation[];  // The invitations list
  pages: number;                // Total number of pages
  page: number;                 // Current page number (1-indexed)
  limit: number;                // Items per page
}