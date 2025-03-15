import { api } from "encore.dev/api";

import { db } from "@/database";
import { IdParams, PaginationParams, UserIdParams } from "@/shared/interfaces";
import { getPagination, processDbList } from "@/shared/utils";

import { FeedbackOutput, FeedbacksList } from "./interfaces";
import { AddFeedbackInput } from "./validation";

export const add = api<
  AddFeedbackInput & IdParams & UserIdParams,
  FeedbackOutput
>(
  {
    expose: true,
    auth: true,
    method: "POST",
    path: "/shelters/:id/feedbacks",
    tags: ["shelters", "feedbacks"],
  },
  async (params) => {
    const feedback = await db.queryRow`
      INSERT INTO shelter_feedbacks (shelter_id, user_id, content)
      VALUES (${params.id}, ${params.userId}, ${params.content})
      RETURNING id, content, created_at
    `;

    return feedback as FeedbackOutput;
  }
);

export const getList = api<PaginationParams & IdParams, FeedbacksList>(
  {
    expose: true,
    auth: true,
    method: "GET",
    path: "/shelters/:id/feedbacks",
    tags: ["shelters", "feedbacks", "admin"],
  },
  async (params) => {
    const { page, limit, offset } = getPagination(params);

    const result = await processDbList<FeedbackOutput>(
      db.query`
        SELECT 
          c.id,
          c.content,
          c.created_at,
          u.first_name,
          u.last_name
        FROM shelter_feedbacks c
        JOIN users u ON c.user_id = u.id
        WHERE c.shelter_id = ${params.id}
        ORDER BY c.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    );

    const totalCount = await db.queryRow`
      SELECT COUNT(*) as count FROM shelter_feedbacks WHERE shelter_id = ${params.id}
    `;

    return {
      items: result,
      total: totalCount?.count || 0,
      page,
      limit,
    };
  }
);
