import express from "express"
import prisma from "../models/Notification.js"
import authMiddleware from "../middleware/auth.js"

const router = express.Router()

router.post("/", authMiddleware, async (req, res) => {
  const { message } = req.body
  try {
    const notification = await prisma.create({
      data: {
        userId: req.user,
        message,
      },
    })
    res.status(201).json(notification)
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" })
  }
})

router.get("/", authMiddleware, async (req, res) => {
  try {
    const notifications = await prisma.findMany({
      where: { userId: req.user },
    })
    res.status(200).json(notifications)
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" })
  }
})

router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params
  try {
    const notification = await prisma.update({
      where: { id: parseInt(id, 10) },
      data: { read: true },
    })
    res.status(200).json(notification)
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" })
  }
})

export default router
