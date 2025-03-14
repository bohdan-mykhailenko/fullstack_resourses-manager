import { MaxLen, MinLen } from "encore.dev/validate";

export interface CreateBirdInput {
  scientificName: string & (MinLen<2> & MaxLen<50>);
  commonName: string & (MinLen<2> & MaxLen<50>);
  description: string & (MinLen<2> & MaxLen<300>);
  imageUrl: string & (MinLen<2> & MaxLen<512>);
}

export interface UpdateBirdInput {
  scientificName?: string & (MinLen<2> & MaxLen<50>);
  commonName?: string & (MinLen<2> & MaxLen<50>);
  description?: string & (MinLen<2> & MaxLen<300>);
  imageUrl?: string & (MinLen<2> & MaxLen<512>);
}
