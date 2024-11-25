import { NextRequest, NextResponse } from "next/server";
import { Service } from "../../models";

/**
 * GET /api/auth/services
 *
 * @param {NextRequest} req
 *
 * @returns {Promise<NextResponse>}
 *
 * @description
 * Retorna uma lista de servi os filtrados por descrição ou sem
 * filtro, dependendo do valor da query string `search`.
 *
 * @queryParam {string} [search] - Descrição do serviço para filtrar
 * @queryParam {string} [offset] - Número de resultados a serem pulados
 * @queryParam {string} [limit] - Número de resultados a serem retornados
 *
 * @example
 * GET /api/auth/services?search=editor%20de%20video&offset=0&limit=50
 * Retorna uma lista com 50 serviços onde a descriço contém as palavras
 * `editor de video`, pulando 0 resultados.
 *
 * @example
 * GET /api/auth/services?offset=50&limit=50
 * Retorna uma lista com 50 serviços sem filtro algum, pulando 50 resultados.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url);
  const query = url.searchParams.get("search");
  const offset = url.searchParams.get("offset") || 0;
  const limit = url.searchParams.get("limit") || 50;

  console.clear();
  console.log(`Search: ${query}, Offset: ${offset}, Limit: ${limit}`);

  if (query) {
    try {
      const services = await Service.findMany({
        skip: Number(offset),
        take: Number(limit),
        where: {
          description: {
            contains: query,
          },
          AND: {
            status: {
              not: "completed",
            },
          },
        },
      });

      return NextResponse.json(
        { success: true, data: services },
        { status: 200 }
      );
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { success: false, msg: "Erro no servidor" },
        { status: 500 }
      );
    }
  } else {
    try {
      const services = await Service.findMany({
        skip: Number(offset),
        take: Number(limit),
        where: {
          status: {
            not: "completed",
          },
        },
      });

      return NextResponse.json(
        { success: true, data: services },
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
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { location, ...rest } = await req.json();
  const id = req.url.split('/')[req.url.split('/').length - 1];
  
  const service = await Service.findUnique({ where: { id } });
  if (!service) {
    return NextResponse.json(
      { success: false, msg: "Serviço não encontrado" },
      { status: 404 }
    );
  }
  if (service.status === "completed") {
    return NextResponse.json(
      { success: false, msg: "Serviço já foi concluído" },
      { status: 400 }
    );
  }
  try {
    await Service.update({
      where: { id },
      data: { location, ...rest }
    });
    return NextResponse.json(
      { success: true, msg: "Serviço atualizado" },
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