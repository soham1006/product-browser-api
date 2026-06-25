# Product Browser API

A scalable backend API built with **Node.js**, **Express.js**, **TypeScript**, and **PostgreSQL** to efficiently browse **200,000+ products** using **cursor-based pagination**.

## Live Demo

* **API:** https://product-browser-api-hci3.onrender.com
* **Health Check:** https://product-browser-api-hci3.onrender.com/health

## Features

* Cursor-based pagination
* Category filtering
* PostgreSQL database
* Composite indexing for fast queries
* Seed script to generate 200,000 products
* Public deployment on Render
* Health check endpoint

## Tech Stack

* Node.js
* Express.js
* TypeScript
* PostgreSQL (Neon)
* Faker.js
* Render

## Project Structure

```text
src/
├── controllers/
├── db/
├── repositories/
├── routes/
├── scripts/
├── types/
├── app.ts
├── server.ts
└── test-db.ts
```

## Database Schema

```sql
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

## Database Indexes

```sql
CREATE INDEX idx_products_created_id
ON products (created_at DESC, id DESC);

CREATE INDEX idx_products_category_created_id
ON products (category, created_at DESC, id DESC);
```

## API Endpoints

### Health Check

```http
GET /health
```

### Get Products

```http
GET /products
```

### Query Parameters

| Parameter       | Description                    |
| --------------- | ------------------------------ |
| limit           | Number of products to return   |
| category        | Filter by category             |
| cursorCreatedAt | Cursor timestamp for next page |
| cursorId        | Cursor ID for next page        |

## Example Requests

### First Page

```http
GET /products?limit=10
```

### Filter by Category

```http
GET /products?category=Electronics&limit=10
```

### Next Page

```http
GET /products?limit=10&cursorCreatedAt=2026-06-25T06:27:37.698Z&cursorId=157578
```

## Local Setup

### Clone Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd product-browser-api
```

### Install Dependencies

```bash
npm install
```

### Create `.env`

```env
PORT=5000
DATABASE_URL=YOUR_DATABASE_URL
```

### Seed Database

```bash
npm run seed
```

### Run Development Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Design Decisions

* PostgreSQL was chosen for efficient indexing and sorting.
* Cursor pagination was implemented to avoid the performance issues of OFFSET pagination.
* Composite indexes improve query performance for sorting and category filtering.
* Products are ordered by `created_at DESC, id DESC` to ensure deterministic ordering.

## Scalability

The API is designed to efficiently handle large datasets using:

* Cursor-based pagination
* Composite indexes
* Indexed sorting
* Batched seed generation

## Author

**Soham Mewada**
