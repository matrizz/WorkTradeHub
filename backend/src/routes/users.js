import express from 'express'
import prisma from '../models/User.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

// Buscar usuário por ID
router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params
  try {
    const user = await prisma.findUnique({ where: { id: parseInt(id, 10) } })
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' })

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ msg: 'Erro no servidor' })
  }
})

export default router
