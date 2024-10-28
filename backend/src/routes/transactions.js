import express from "express"
import prisma from "../models/Transaction.js"
import authMiddleware from "../middleware/auth.js"

const router = express.Router()

// Criar nova transação
router.post("/", authMiddleware, async (req, res) => {
  const { providerId, serviceId, amount, status } = req.body
  try {
    const transaction = await prisma.create({
      data: {
        clientId: req.user,
        providerId,
        serviceId,
        amount,
        status,
      },
    })
    res.status(201).json(transaction)
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" })
  }
})

// Buscar transações
router.get("/", authMiddleware, async (req, res) => {
  try {
    const transactions = await prisma.findMany({
      where: { clientId: req.user },
    })
    res.status(200).json(transactions)
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" })
  }
})

export default router
