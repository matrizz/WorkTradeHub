import express from "express"
import prisma from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const router = express.Router()

router.post("/register", async (req, res) => {
  const { name, email, password, role = "user" } = req.body
  try {
    let user = await prisma.findUnique({ where: { email } })
    if (user) return res.status(400).json({ msg: "Usuário já registrado" })

    const hashedPassword = await bcrypt.hash(password, 10)
    user = await prisma.create({
      data: { name, email, password: hashedPassword, role },
    })

    const payload = { userId: user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })

    res.status(201).json({ token })
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor", err })
  }
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await prisma.findUnique({ where: { email } })
    if (!user) return res.status(400).json({ msg: "Usuário não encontrado" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: "Credenciais inválidas" })

    const payload = { userId: user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })

    console.log(token)
    res.status(200).json({ token })
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" })
  }
})

export default router
