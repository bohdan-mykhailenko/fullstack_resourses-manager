import { MaxLen, MinLen } from "encore.dev/validate";

export interface CreateAnimalShelterInput {
  name: string & (MinLen<2> & MaxLen<50>);
  description: string & (MinLen<2> & MaxLen<300>);
  email: string & (MinLen<2> & MaxLen<512>);
  websiteUrl: string & (MinLen<2> & MaxLen<512>);
  imageUrl: string & (MinLen<2> & MaxLen<512>);
  address: string & (MinLen<2> & MaxLen<512>);
  phone: string & (MinLen<2> & MaxLen<512>);
}

export interface UpdateAnimalShelterInput {
  name?: string & (MinLen<2> & MaxLen<50>);
  description?: string & (MinLen<2> & MaxLen<300>);
  email?: string & (MinLen<2> & MaxLen<512>);
  websiteUrl?: string & (MinLen<2> & MaxLen<512>);
  imageUrl?: string & (MinLen<2> & MaxLen<512>);
  address?: string & (MinLen<2> & MaxLen<512>);
  phone?: string & (MinLen<2> & MaxLen<512>);
}
