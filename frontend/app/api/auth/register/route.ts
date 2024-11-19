import { NextRequest, NextResponse } from "next/server";
import { User } from "../../models";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { emailVerificationInstance as emailVerification } from "../../../utils/email";

/**
 * @description Registra um novo usuário e envia uma verificação por email.
 * @param {NextRequest} req - O objeto de requisição contendo os dados do usuário.
 * @returns {NextResponse} O objeto de resposta com o status de registro e os dados do usuário.
 * @throws {Error} Se houver um erro durante o processo de registro.
 *
 * Esta função realiza os seguintes passos:
 * 1. Analisa o corpo da requisição para extrair os detalhes do usuário.
 * 2. Verifica se um usuário com o email fornecido já existe.
 * 3. Faz o hash da senha do usuário e cria um novo usuário no banco de dados.
 * 4. Envia uma verificação por email para o endereço de email do usuário.
 * 5. Gera um token JWT para o usuário recém-criado.
 * 6. Retorna uma resposta com o status de registro e os dados do usuário, ou uma mensagem de erro.
 */

export async function POST(req: NextRequest): Promise<NextResponse<unknown>> {
  try {
    const { password, id, name, email, ...rest } = await req.json();
    const foundedUser = await User.findUnique({
      where: { email },
    });

    if (foundedUser)
      return NextResponse.json(
        { success: false, msg: "Usuário ja cadastrado" },
        { status: 400 }
      );

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      data: {
        ...rest,
        name,
        email,
        password: hashedPassword,
        isAuth: false,
        role: "user",
      },
    });
    emailVerification.sendEmailVerification({
      dest: email,
      cuid: user.cuid,
      username: name,
    });

    const { password: pass, ...restProps } = user;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ userId: user.cuid })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(secret);

    return NextResponse.json(
      { success: true, data: restProps, cuid: user.cuid, token },
      { status: 200 }
    );
  } catch (err) {
    console.log("erro ao cadastrar:", err);
    return NextResponse.json(
      { success: false, msg: "Erro no ao cadastrar" },
      { status: 500 }
    );
  }
}
