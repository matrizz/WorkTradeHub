import { NextRequest, NextResponse } from "next/server";
import { User } from "../../models";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { emailVerificationInstance as emailVerification } from "../../../utils/email";

export async function POST(req: NextRequest) {
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
