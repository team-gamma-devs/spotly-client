import type { ScoreLevel } from "./userFull";

export interface CreateFeedbackRequest {
  graduatedId: string;
  annotation?: string;
  technicalScore?: ScoreLevel;
  professionalScore?: ScoreLevel;
}
export interface IncompleteFeedback {
  id: string;
  firstName: string;
  lastName: string;
  cohort: number;
}