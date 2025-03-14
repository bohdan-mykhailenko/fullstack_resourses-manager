import { MaxLen, MinLen } from "encore.dev/validate";

export interface AddCommentInput {
  content: string & (MinLen<2> & MaxLen<300>);
}
