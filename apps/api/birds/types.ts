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

export interface SearchedBirdOutput {
  birds: BirdOutput[];
}

export interface PaginatedBirdsOutput {
  birds: BirdOutput[];
  total: number;
  page: number;
  limit: number;
}

export interface SearchBirdParams {
  query?: string;
}
