import express from "express";
import productRoutes from "./routes/product.routes";

const app = express();

app.use(express.json());

app.use("/products", productRoutes);

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "API Running",
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});