import { Gateway } from "encore.dev/api";

import { handler } from "./handler";

export const gateway = new Gateway({
  authHandler: handler,
});
