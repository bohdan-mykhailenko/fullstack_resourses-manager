import { PaginatedList } from "@/shared/interfaces";

export interface AnimalShelterOutput {
  id: string;
  name: string;
  description: string;
  email: string;
  websiteUrl: string;
  imageUrl: string;
  address: string;
  phone: string;
  likesCount?: number;
  feedbacksCount?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface SearchedAnimalSheltersList {
  items: AnimalShelterOutput[];
}

export interface PaginatedAnimalSheltersList
  extends PaginatedList<AnimalShelterOutput> {}

export interface SearchAnimalShelterParams {
  query?: string;
}
