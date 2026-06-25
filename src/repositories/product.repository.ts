import { pool } from "../db";

interface ProductQuery {
  limit: number;
  category?: string;
  cursorCreatedAt?: string;
  cursorId?: number;
}

export async function getProducts({
  limit,
  category,
  cursorCreatedAt,
  cursorId,
}: ProductQuery) {
  const values: any[] = [];
  const conditions: string[] = [];

  if (category) {
    values.push(category);
    conditions.push(`category = $${values.length}`);
  }

  if (cursorCreatedAt && cursorId) {
    values.push(cursorCreatedAt);
    values.push(cursorId);

    conditions.push(
      `(created_at, id) < ($${values.length - 1}, $${values.length})`
    );
  }

  let query = `
    SELECT
      id,
      name,
      category,
      created_at,
      updated_at
    FROM products
  `;

  if (conditions.length) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  values.push(limit);

  query += `
    ORDER BY created_at DESC, id DESC
    LIMIT $${values.length}
  `;

  const result = await pool.query(query, values);

  return result.rows;
}