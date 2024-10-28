import express from "express"
import prisma from "../models/Portfolio.js"
import authMiddleware from "../middleware/auth.js"

const router = express.Router()

// Criar novo portfólio
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, images } = req.body
  try {
    const portfolio = await prisma.create({
      data: {
        providerId: req.user,
        title,
        description,
        images,
      },
    })
    res.status(201).json(portfolio)
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" })
  }
})

// Buscar portfólios
router.get("/", async (req, res) => {
  try {
    const portfolios = await prisma.findMany()
    res.status(200).json(portfolios)
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" })
  }
})

export default router