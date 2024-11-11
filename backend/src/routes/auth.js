import express from "express";
import prisma from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { emailVerificationInstance as emailVerification } from "../utils/email/email.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, cpf, role = "user" } = req.body;
  try {
    let user = await prisma.findUnique({ where: { email } });
    if (user) return res.status(400).json({ msg: "Usuário já registrado" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await prisma.create({
      data: { name, cpf, email, password: hashedPassword, role, isAuth: false },
    });
    emailVerification.sendEmailVerification(email, String(name).split(" ").slice(0, 2).join(" "));

    const payload = { userId: user.cuid };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(user);
    res.status(201).json({ token, cuid: user.cuid });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Erro no servidor", err });
  }
});

router.get("/account-activation", async (req, res) => {
  const { code } = req.body;
  const params = new URLSearchParams(req.url.split("?")[1]);
  const cuid = params.get("cuid");
  if (!cuid) return res.status(400).json({ msg: "ID não especificado"})
  if (!code) return res.status(400).json({ msg: "Código não fornecido"})

  try {
    emailVerification.verifyCode(code);
    console.log({ isValid: emailVerification.validate, code: emailVerification.codigoGerado})
    if (!emailVerification.validate) {
      return res.status(401).json({ msg: "Código de verificação expirado ou inválido" });
    }
    await prisma.update({
      where: {
        cuid,
      },
      data: {
        isAuth: true,
      },
    });

    return res.status(200).json({ msg: "Conta ativada com sucesso" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Erro no servidor", err });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ msg: "Usuário não encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Credenciais inválidas" });

    const payload = { userId: user.cuid };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log(token);
    res.status(200).json({ token, cuid: user.cuid });
  } catch (err) {
    res.status(500).json({ msg: "Erro no servidor" });
  }
});

export default router;
