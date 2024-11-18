import { Service } from "@/app/api/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const offset = url.searchParams.get("offset") || 0;
  const limit = url.searchParams.get("limit") || 10;
  const userId = url.searchParams.get("u");
  
  if (!userId) {
    return NextResponse.json(
      { success: false, msg: "ID do usuário não fornecido" },
      { status: 400 }
    );
  }

  try {
    const userServices = await Service.findMany({
      where: {
        providerId: userId,
      },
      skip: Number(offset),
      take: Number(limit),
    });

    return NextResponse.json(
      { success: true, data: userServices },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, msg: "Erro ao buscar serviços" },
      {
        status: 500,
      }
    );
  }
}
