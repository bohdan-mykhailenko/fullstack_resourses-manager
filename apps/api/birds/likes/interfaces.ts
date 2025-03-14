import { IdParams, UserIdParams } from "@/shared/interfaces";

export interface ToggleLikeParams extends IdParams, UserIdParams {}

export interface ToggleLikeResponse {
  liked: boolean;
}
