import express from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../middleware/auth.js";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/search", async (req, res) => {
  const { nome, category, minPrice, maxPrice, location, status } = req.query;
  try {
    const services = await prisma.service.findMany({
      where: {
        description: { contains: nome, mode: 'insensitive' },
        category,
        price: { gte: minPrice, lte: maxPrice },
        location: { contains: location, mode: 'insensitive' },
        status,
      },
    });
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

export default router;
