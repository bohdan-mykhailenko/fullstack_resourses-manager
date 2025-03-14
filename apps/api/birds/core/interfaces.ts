import { IdParams, PaginatedList, UserIdParams } from "@/shared/interfaces";

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
