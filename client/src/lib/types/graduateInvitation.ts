
// This defines the graduate structure for the status dashboard, initially each graduate item in the status board
// was going to be a pill shape, that's why the name.
// Check components/manager/GraduateStatusTable.svete

export interface GraduateInvitation {
  id: string;
  fullName: string;
  email: string;
  cohort: number;
  logState: boolean;
  createdAt: string;
  expiresAt: string;
};