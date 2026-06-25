# Product Browser API

Backend API for browsing 200,000 products efficiently using cursor-based pagination.

## Tech Stack

* Node.js
* Express.js
* TypeScript
* PostgreSQL (Neon)
* Render

## Features

* Cursor Pagination
* Category Filtering
* 200,000 Seeded Products
* PostgreSQL Indexing
* Public Deployment

## Database Schema

```sql
products
---------
id
name
category
created_at
updated_at
```

## Indexes

```sql
CREATE INDEX idx_products_created_id
ON products (created_at DESC, id DESC);

CREATE INDEX idx_products_category_created_id
ON products (category, created_at DESC, id DESC);
```

## API Endpoints

### Health Check

GET /health

### Get Products

GET /products

Query Parameters:

* limit
* category
* cursorCreatedAt
* cursorId

Examples:

```http
/products?limit=20

/products?category=Electronics&limit=20

/products?limit=20&cursorCreatedAt=...&cursorId=...
```

## Run Locally

```bash
npm install

npm run seed

npm run dev
```

## Deployment

* Database: Neon PostgreSQL
* Backend: Render
