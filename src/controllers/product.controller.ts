import { Request, Response } from "express";
import { getProducts } from "../repositories/product.repository";

export async function getProductsController(
  req: Request,
  res: Response
) {
  try {
    const limit = Number(req.query.limit) || 20;

    const category = req.query.category as string | undefined;

    const cursorCreatedAt =
      req.query.cursorCreatedAt as string | undefined;

    const cursorId = req.query.cursorId
      ? Number(req.query.cursorId)
      : undefined;

    const products = await getProducts({
      limit,
      category,
      cursorCreatedAt,
      cursorId,
    });

    let nextCursor = null;

    if (products.length > 0) {
      const last = products[products.length - 1];

      nextCursor = {
        createdAt: last.created_at,
        id: last.id,
      };
    }

    res.status(200).json({
      success: true,
      count: products.length,
      nextCursor,
      products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}