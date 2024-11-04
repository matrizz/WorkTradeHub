import express from "express";
import Service from "../models/Service.js";
import authMiddleware from "../middleware/auth.js";
import { PrismaClient } from "@prisma/client";

const  prisma = new PrismaClient();
const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { description, price, category, status, images, location } = req.body;
  try {
    const service = await Service.create({
      data: {
        providerId: req.user,
        description,
        price,
        category,
        status,
        images,
        location,
      },
    });
    res.status(201).json(service);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

router.get("/", async (req, res) => {
  try {
    const services = await Service.findMany();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { description, price, category, status, images, location } = req.body;
  try {
    const service = await Service.update({
      where: { id: parseInt(id, 10) },
      data: { description, price, category, status, images, location },
    });
    res.status(200).json(service);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.transaction.deleteMany({
      where: { serviceId: parseInt(id, 10) },
    });
    await prisma.service.delete({ where: { id: parseInt(id, 10) } });
    res.status(200).json({ msg: "Serviço excluído com sucesso" });
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

export default router;