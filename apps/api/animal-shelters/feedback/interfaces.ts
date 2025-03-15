import { IdParams, PaginatedList } from "@/shared/interfaces";

export interface FeedbackOutput extends IdParams {
  content: string;
  created_at: Date;
  first_name: string;
  last_name: string;
}

export interface FeedbacksList extends PaginatedList<FeedbackOutput> {}
