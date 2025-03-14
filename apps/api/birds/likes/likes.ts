import { api } from "encore.dev/api";

import { db } from "@/database";

import { ToggleLikeParams, ToggleLikeResponse } from "./interfaces";

export const toggle = api<ToggleLikeParams, ToggleLikeResponse>(
  { expose: true, auth: true, method: "POST", path: "/birds/:id/like" },
  async (params) => {
    const existingLike = await db.queryRow`
      SELECT id FROM bird_likes 
      WHERE bird_id = ${params.id} AND user_id = ${params.userId}
    `;

    if (existingLike) {
      await db.exec`
        DELETE FROM bird_likes 
        WHERE bird_id = ${params.id} AND user_id = ${params.userId}
      `;

      return { liked: false };
    }

    await db.exec`
      INSERT INTO bird_likes (bird_id, user_id)
      VALUES (${params.id}, ${params.userId})
    `;

    return { liked: true };
  }
);
