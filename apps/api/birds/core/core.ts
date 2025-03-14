import { APIError, api } from "encore.dev/api";

import { db } from "@/database";
import { IdParams, PaginationParams } from "@/shared/interfaces";
import { getPagination, processDbList } from "@/shared/utils";

import {
  BirdOutput,
  PaginatedBirdsList,
  SearchBirdParams,
  SearchedBirdsList,
} from "./interfaces";
import { CreateBirdInput, UpdateBirdInput } from "./validation";

export const getOne = api<IdParams, BirdOutput>(
  { expose: true, auth: true, method: "GET", path: "/birds/:id" },
  async (params) => {
    const bird = await db.queryRow`
      SELECT b.*, 
        (SELECT COUNT(*) FROM bird_likes WHERE bird_id = b.id) as likes_count,
        (SELECT COUNT(*) FROM bird_comments WHERE bird_id = b.id) as comments_count
      FROM birds b
      WHERE b.id = ${params.id}
    `;

    if (!bird) {
      throw APIError.notFound("Bird not found");
    }

    return bird as BirdOutput;
  }
);

export const getList = api<PaginationParams, PaginatedBirdsList>(
  { expose: true, auth: true, method: "GET", path: "/birds" },
  async (params) => {
    const { page, limit, offset } = getPagination(params);

    const result = await processDbList<BirdOutput>(
      db.query`
        SELECT b.*, 
          (SELECT COUNT(*) FROM bird_likes WHERE bird_id = b.id) as likes_count,
          (SELECT COUNT(*) FROM bird_comments WHERE bird_id = b.id) as comments_count
        FROM birds b
        ORDER BY b.created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `
    );

    const totalCount = await db.queryRow`
      SELECT COUNT(*) as count FROM birds
    `;

    return {
      items: result,
      total: totalCount?.count || 0,
      page,
      limit,
    };
  }
);

export const search = api<SearchBirdParams, SearchedBirdsList>(
  { expose: true, auth: true, method: "GET", path: "/birds/search" },
  async (params) => {
    const { query } = params;

    if (!query) {
      const result = await processDbList<BirdOutput>(
        db.query`
          SELECT * FROM birds
          ORDER BY created_at DESC
        `
      );

      return { items: result };
    }

    const result = await processDbList<BirdOutput>(
      db.query`
        SELECT * FROM birds 
        WHERE 
          scientific_name ILIKE ${`%${query}%`} OR 
          common_name ILIKE ${`%${query}%`} OR 
          description ILIKE ${`%${query}%`}
        ORDER BY created_at DESC
      `
    );

    return { items: result };
  }
);

export const create = api<CreateBirdInput, BirdOutput>(
  { expose: true, auth: true, method: "POST", path: "/birds" },
  async (input) => {
    const bird = await db.queryRow`
      INSERT INTO birds (
        scientific_name, 
        common_name, 
        description, 
        image_url
      )
      VALUES (
        ${input.scientificName}, 
        ${input.commonName}, 
        ${input.description}, 
        ${input.imageUrl}
      )
      RETURNING *
    `;

    return bird as BirdOutput;
  }
);

export const update = api<UpdateBirdInput & IdParams, BirdOutput>(
  { expose: true, auth: true, method: "PUT", path: "/birds/:id" },
  async (input) => {
    const existingBird = await db.queryRow`
      SELECT * FROM birds WHERE id = ${input.id}
    `;

    if (!existingBird) {
      throw APIError.notFound("Bird not found");
    }

    const updatedBird = await db.queryRow`
      UPDATE birds 
      SET 
        scientific_name = ${input.scientificName || existingBird.scientific_name},
        common_name = ${input.commonName || existingBird.common_name},
        description = ${input.description || existingBird.description},
        image_url = ${input.imageUrl || existingBird.image_url},
        updated_at = NOW()
      WHERE id = ${input.id}
      RETURNING *
    `;

    return updatedBird as BirdOutput;
  }
);
