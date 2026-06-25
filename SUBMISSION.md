# Submission Notes

## Overview

This project provides a scalable backend for browsing 200,000 products with fast pagination and category filtering.

## Design Decisions

### PostgreSQL

Chosen for efficient indexing, sorting, and cursor-based pagination support.

### Cursor Pagination

Implemented using:

```sql
ORDER BY created_at DESC, id DESC
```

Cursor fields:

```text
created_at
id
```

This avoids the performance problems of OFFSET pagination.

### Index Strategy

Primary pagination index:

```sql
(created_at DESC, id DESC)
```

Category filter index:

```sql
(category, created_at DESC, id DESC)
```

These indexes allow PostgreSQL to perform index scans instead of full table scans.

## Dataset

A seed script generates 200,000 products using Faker.

## API Features

* Cursor Pagination
* Category Filtering
* Health Endpoint
* Public Deployment

## Scalability

The solution is designed to handle large datasets efficiently by avoiding OFFSET-based pagination and leveraging composite indexes.

## Repository

GitHub: <ADD_GITHUB_URL>

## Live API

Render: <ADD_RENDER_URL>
