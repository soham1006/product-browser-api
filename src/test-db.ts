import { pool } from "./db";

async function testDB() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log(result.rows[0]);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

testDB();