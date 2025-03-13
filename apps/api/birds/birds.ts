import { APIError, api } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";

import { BirdOutput, PaginatedBirdsOutput, SearchBirdParams } from "./types";
import { CreateBirdInput, UpdateBirdInput } from "./validation";

const db = new SQLDatabase("birds", { migrations: "./migrations" });

export const listBirds = api(
  { expose: true, auth: true, method: "GET", path: "/birds" },
  async (params: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedBirdsOutput> => {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const offset = (page - 1) * limit;

    const result: BirdOutput[] = [];

    for await (const bird of db.query`
      SELECT b.*, 
        (SELECT COUNT(*) FROM bird_likes WHERE bird_id = b.id) as likes_count,
        (SELECT COUNT(*) FROM bird_comments WHERE bird_id = b.id) as comments_count
      FROM birds b
      ORDER BY b.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `) {
      result.push(bird as BirdOutput);
    }

    const totalCount = await db.queryRow`
      SELECT COUNT(*) as count FROM birds
    `;

    return {
      birds: result,
      total: totalCount?.count || 0,
      page,
      limit,
    };
  }
);

export const getBird = api(
  { expose: true, auth: true, method: "GET", path: "/birds/:id" },
  async (params: { id: string }): Promise<BirdOutput> => {
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

export const searchBirds = api(
  { expose: true, auth: true, method: "GET", path: "/birds/search" },
  async (params: SearchBirdParams): Promise<BirdOutput[]> => {
    const { query } = params;

    if (!query) {
      const result: BirdOutput[] = [];
      for await (const bird of db.query`
        SELECT * FROM birds
        ORDER BY created_at DESC
      `) {
        result.push(bird as BirdOutput);
      }

      return result;
    }

    const result = [];

    for await (const bird of db.query`
        SELECT * FROM birds 
        WHERE 
          scientific_name ILIKE ${`%${query}%`} OR 
          common_name ILIKE ${`%${query}%`} OR 
          description ILIKE ${`%${query}%`}
        ORDER BY created_at DESC
      `) {
      result.push(bird as BirdOutput);
    }

    return result;
  }
);

export const createBird = api(
  { expose: true, auth: true, method: "POST", path: "/api/birds" },
  async (input: CreateBirdInput): Promise<BirdOutput> => {
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

// TODO: complete
export const updateBird = api(
  { expose: true, auth: true, method: "PUT", path: "/api/birds/:id" },
  async (
    params: { id: string },
    input: UpdateBirdInput
  ): Promise<BirdOutput> => {
    const existingBird = await db.queryRow`
      SELECT * FROM birds WHERE id = ${params.id}
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
      WHERE id = ${params.id}
      RETURNING *
    `;

    return updatedBird;
  }
);
