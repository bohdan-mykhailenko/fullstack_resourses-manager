const BEARER_TOKEN_PREFIX = "Bearer";

export const parseBearerToken = (authorization: string) =>
  authorization.split(BEARER_TOKEN_PREFIX + " ")[1];
