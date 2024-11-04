import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/auth.js";
import { PrismaClient } from "@prisma/client";

const prisma = new  PrismaClient();

const router = express.Router();

router.get("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findUnique({ where: { cuid: id } });
    if (!user) return res.status(404).json({ msg: "Usuário não encontrado" });
    const { password, ...rest } = user;

    res.status(200).json(rest);
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  try {
    let updateData = { name, email, role };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }
    const user = await User.update({
      where: { cuid: id },
      data: updateData,
    });

    const { password: pass, ...rest } = user;

    res.status(200).json(rest);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.transaction.deleteMany({
      where: {
        OR: [{ clientId: id }, { providerId: id }],
      },
    });
    await prisma.service.deleteMany({
      where: {
        providerId:  id,

      }
    });
    await prisma.notification.deleteMany({
      where: { userId: id },
    });
    await prisma.user.delete({ where: { cuid: id } });
    res.status(200).json({ msg: "Usuário excluído com sucesso" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

export default router;
