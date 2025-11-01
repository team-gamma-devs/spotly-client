
// This defines the graduate structure for the status dashboard, initially each graduate item in the status board
// was going to be a pill shape, that's why the name.
// Check components/manager/GraduateStatusTable.svete

export interface GraduatePill {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	updatedAt: string;
	invitStatus: "Expired" | "Invited" | "Pending" | "Accepted";
};