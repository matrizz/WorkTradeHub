import { Service } from "@/app/api/models";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server.js";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { location, ...rest } = await req.json();

  try {
    const service = await Service.create({
      data: {
        ...rest,
        status: "pending",
        images: [
          "https://banner2.cleanpng.com/20180821/px/17f16be5a391995fd119f726c0b508d6.webp",
        ],
        location: JSON.stringify(location),
      },
    });
    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, msg: "Erro no servidor" },
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest) {
  try {
    const services = await Service.findMany();
    return NextResponse.json(
      { success: true, data: services },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, msg: "Erro no servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const id = req.url.split("/")[req.url.split("/").length - 1];
  const { ...rest } = await req.json();

  try {
    const service = await Service.update({
      where: { id: id },
      data: { ...rest },
    });
    return NextResponse.json({ success: true, data: service }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, msg: "Erro ao atualizar serviço" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.url.split("/")[req.url.split("/").length - 1];

  try {
    await prisma.transaction.deleteMany({
      where: { serviceId: id },
    });
    await prisma.service.delete({ where: { id } });
    return NextResponse.json({
      success: true,
      msg: "Serviço excluído com sucesso",
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, msg: "Erro no servidor" },
      { status: 500 }
    );
  }
}
