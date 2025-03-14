import { IdParams, PaginatedList, UserIdParams } from "@/shared/types";

export interface BirdOutput {
  id: string;
  scientificName: string;
  commonName: string;
  description: string;
  imageUrl: string;
  likesCount?: number;
  commentsCount?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface SearchedBirdsList {
  items: BirdOutput[];
}

export interface PaginatedBirdsList extends PaginatedList<BirdOutput> {}

export interface SearchBirdParams {
  query?: string;
}

export interface ToggleLikeParams extends IdParams, UserIdParams {}

export interface ToggleLikeResponse {
  liked: boolean;
}

export interface CommentOutput extends IdParams {
  content: string;
  created_at: Date;
  first_name: string;
  last_name: string;
}

export interface CommentsList extends PaginatedList<CommentOutput> {}
