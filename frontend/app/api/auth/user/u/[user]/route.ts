import { User } from "../../../../models";
import { extractUserNameFromURL } from "../../../../../utils/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const name = extractUserNameFromURL(req.url).replaceAll("%20", " ");
  console.log(name);

  try {
    const user = await User.findFirst({
      where: { name },
    });
    if (!user)
      return NextResponse.json(
        { success: false, msg: "Usuário não encontrado" },
        { status: 404 }
      );
    const { password, ...rest } = user;

    return NextResponse.json({ success: true, data: rest });
  } catch (err) {
    return NextResponse.json(
      { success: false, msg: "Erro no servidor" },
      { status: 500 }
    );
  }
}
