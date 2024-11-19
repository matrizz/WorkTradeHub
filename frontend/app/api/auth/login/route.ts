import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "../../models";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { success: false, msg: "Email e/ou senha nao fornecidos" },
      { status: 400 }
    );
  }

  try {
    const user = await User.findUnique({
      where: { email },
    });
    if (!user) {
      return NextResponse.json(
        { success: false, msg: "Usuário nao encontrado" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, msg: "Senha invalida" },
        { status: 401 }
      );
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ userId: user.cuid })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(secret);

    return NextResponse.json(
      { success: true, token, cuid: user.cuid },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, msg: "Erro no servidor" },
      { status: 500 }
    );
  }
}
