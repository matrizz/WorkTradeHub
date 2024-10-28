import express from "express"
import prisma from "../models/Service.js"

const router = express.Router()

// Pesquisa de serviços com filtros
router.get("/services", async (req, res) => {
  const { location, category, priceRange, rating } = req.query
  try {
    const services = await prisma.findMany({
      where: {
        AND: [
          location ? { location: { contains: location } } : {},
          category ? { category: { equals: category } } : {},
          priceRange
            ? { price: { gte: priceRange[0], lte: priceRange[1] } }
            : {},
          rating ? { rating: { gte: rating } } : {},
        ],
      },
    })
    res.status(200).json(services)
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" })
  }
})

export default router
