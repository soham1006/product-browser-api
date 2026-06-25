import { faker } from "@faker-js/faker";
import { pool } from "../db";

const categories = [
  "Electronics",
  "Books",
  "Clothing",
  "Sports",
  "Furniture",
  "Beauty",
];

async function seed() {
  try {
    console.log("Seeding started...");

    const batchSize = 5000;
    const totalProducts = 200000;

    for (let offset = 0; offset < totalProducts; offset += batchSize) {
      const values: string[] = [];

      for (let i = 0; i < batchSize; i++) {
        const name = faker.commerce.productName().replace(/'/g, "''");

        const category =
          categories[Math.floor(Math.random() * categories.length)];

        const createdAt = faker.date.recent({
          days: 365,
        });

        values.push(
          `('${name}','${category}','${createdAt.toISOString()}','${createdAt.toISOString()}')`
        );
      }

      const query = `
        INSERT INTO products
        (name, category, created_at, updated_at)
        VALUES
        ${values.join(",")}
      `;

      await pool.query(query);

      console.log(
        `Inserted ${Math.min(offset + batchSize, totalProducts)} products`
      );
    }

    console.log("Seeding completed");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();