import express from "express"
import prisma from "../models/Service.js"
import authMiddleware from "../middleware/auth.js"

const router = express.Router()

// Criar novo serviço
router.post("/", authMiddleware, async (req, res) => {
  const { description, price, category, status, images, location } = req.body
  try {
    const service = await prisma.create({
      data: {
        providerId: req.user,
        description,
        price,
        category,
        status,
        images,
        location,
      },
    })
    res.status(201).json(service)
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Erro no servidor" })
  }
})

// Buscar serviços
router.get("/", async (req, res) => {
  try {
    const services = await prisma.findMany()
    res.status(200).json(services)
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" })
  }
})

export default router
