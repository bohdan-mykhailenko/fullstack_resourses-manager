import { api } from "encore.dev/api";

import { db } from "@/database";
import { IdParams, PaginationParams, UserIdParams } from "@/shared/interfaces";
import { getPagination } from "@/shared/utils";

import { CommentOutput, CommentsList } from "./interfaces";
import { AddCommentInput } from "./validation";

export const addComment = api<
  AddCommentInput & IdParams & UserIdParams,
  CommentOutput
>(
  { expose: true, auth: true, method: "POST", path: "/birds/:id/comments" },
  async (params) => {
    const comment = await db.queryRow`
      INSERT INTO bird_comments (bird_id, user_id, content)
      VALUES (${params.id}, ${params.userId}, ${params.content})
      RETURNING id, content, created_at
    `;

    return comment as CommentOutput;
  }
);

export const getComments = api<PaginationParams & IdParams, CommentsList>(
  { expose: true, auth: true, method: "GET", path: "/birds/:id/comments" },
  async (params) => {
    const { page, limit, offset } = getPagination(params);
    const result: CommentOutput[] = [];

    for await (const comment of db.query`
      SELECT 
        c.id,
        c.content,
        c.created_at,
        u.first_name,
        u.last_name
      FROM bird_comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.bird_id = ${params.id}
      ORDER BY c.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `) {
      result.push(comment as CommentOutput);
    }

    const totalCount = await db.queryRow`
      SELECT COUNT(*) as count FROM bird_comments WHERE bird_id = ${params.id}
    `;

    return {
      items: result,
      total: totalCount?.count || 0,
      page,
      limit,
    };
  }
);
