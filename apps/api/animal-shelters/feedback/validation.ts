import { MaxLen, MinLen } from "encore.dev/validate";

export interface AddFeedbackInput {
  content: string & (MinLen<2> & MaxLen<300>);
}
