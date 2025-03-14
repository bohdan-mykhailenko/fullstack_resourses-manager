import { IdParams, PaginatedList } from "@/shared/interfaces";

export interface CommentOutput extends IdParams {
  content: string;
  created_at: Date;
  first_name: string;
  last_name: string;
}

export interface CommentsList extends PaginatedList<CommentOutput> {}
