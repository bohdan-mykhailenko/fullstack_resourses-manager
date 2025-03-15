import { Max, Min } from "encore.dev/validate";

export interface RateInput {
  rating: number & (Min<1> & Max<10>);
}
