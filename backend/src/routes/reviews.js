import express from "express"
import prisma from "../models/Review.js"
import authMiddleware from "../middleware/auth.js"

const router = express.Router()

// Criar nova avaliação
router.post("/", authMiddleware, async (req, res) => {
  const { providerId, serviceId, rating, comment } = req.body
  try {
    const review = await prisma.create({
      data: {
        clientId: req.user,
        providerId,
        serviceId,
        rating,
        comment,
      },
    })
    res.status(201).json(review)
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" })
  }
})

// Buscar avaliações
router.get("/", async (req, res) => {
  try {
    const reviews = await prisma.findMany()
    res.status(200).json(reviews)
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" })
  }
})

export default router
