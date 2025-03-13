export interface BirdOutput {
  id: string;
  scientificName: string;
  commonName: string;
  description?: string;
  imageUrl?: string;
  likesCount?: number;
  commentsCount?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface PaginatedBirdsOutput {
  birds: BirdOutput[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateBirdInput {
  scientificName: string;
  commonName: string;
  description?: string;
  imageUrl?: string;
}

export interface UpdateBirdInput {
  scientificName?: string;
  commonName?: string;
  description?: string;
  imageUrl?: string;
}

export interface SearchBirdParams {
  query?: string;
  scientificName?: string;
  commonName?: string;
}
