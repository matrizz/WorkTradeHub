import { Service } from "../../../models";
import { PrismaClient } from "prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server.js";

const prisma = new PrismaClient();

/**
 * Lida com a criação de um novo serviço.
 *
 * Esta função espera uma requisição POST contendo os detalhes do serviço em formato JSON.
 * Ela extrai a localização do corpo da requisição, junto com outros detalhes,
 * e cria uma nova entrada de serviço no banco de dados com o status padrão de "pendente".
 * Uma imagem padrão também é atribuída ao serviço.
 *
 * @param {NextRequest} req - O objeto de requisição recebida contendo os dados do serviço.
 * @returns {Promise<NextResponse>} Um objeto de resposta indicando sucesso ou falha.
 *
 * @throws Retornará uma resposta com status 500 se houver um erro durante a criação do serviço.
 */

export async function POST(req: NextRequest): Promise<NextResponse> {
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

  const id = req.url.split("/")[req.url.split("/").length - 1];
  console.log("URL:",req.url)
  try {
    const service = await Service.findFirst({
      where: {
        id
      }
    });
    console.log(service)

    return NextResponse.json(
      { success: true, data: service },
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
  console.log('fui acessado')
  const { ...rest } = await req.json();

  try {
    const service = await Service.update({
      where: { id },
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
    await prisma.candidate.deleteMany({
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
