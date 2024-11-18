import { User } from "@/app/api/models";
import { extractUserIDFromURL } from "@/app/utils/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function GET(req: NextRequest) {
  const id = extractUserIDFromURL(req.url);

  try {
    const user = await User.findUnique({
      where: { cuid: id },
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
 
export async function DELETE(req: NextRequest) {
  const id = extractUserIDFromURL(req.url);
  try {
    await User.delete({
      where: { cuid: id },
    });
    return NextResponse.json({ success: true, msg: "Usuário deletado" });
  } catch (err) {
    return NextResponse.json(
      { success: false, msg: "Erro no servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {

    const id = extractUserIDFromURL(req.url)

    const { name, email, password, role } = await req.json();

    try {
      let updateData = { name, email, role };
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        //@ts-ignore
        updateData.password = hashedPassword;
      }
      const user = await User.update({
        where: { cuid: id },
        data: updateData,
      });

      const { password: pass, ...rest } = user;

      return NextResponse.json({ success: true, data: rest }, { status: 200 })
    } catch (err) {
      console.log(err);
      return NextResponse.json({ success: false, msg: "Erro no servidor" }, { status: 500 });
    }
}