import { api } from "encore.dev/api";

import { db } from "@/database";
import { IdParams, UserIdParams } from "@/shared/interfaces";

import { RatingOutput } from "./interfaces";
import { RateInput } from "./validation";

export const rate = api<RateInput & IdParams & UserIdParams, RatingOutput>(
  {
    expose: true,
    auth: true,
    method: "POST",
    path: "/shelters/:id/ratings",
    tags: ["shelters", "ratings"],
  },
  async (params) => {
    const existingRating = await db.queryRow`
      SELECT id FROM shelter_ratings 
      WHERE shelter_id = ${params.id} AND user_id = ${params.userId}
    `;

    if (existingRating) {
      await db.exec`
        UPDATE shelter_ratings 
        SET rating = ${params.rating}
        WHERE shelter_id = ${params.id} AND user_id = ${params.userId}
      `;

      return { message: "Rating updated successfully" };
    }

    await db.exec`
      INSERT INTO shelter_ratings (shelter_id, user_id, rating)
      VALUES (${params.id}, ${params.userId}, ${params.rating})
    `;

    return { message: "Rating created successfully" };
  }
);
