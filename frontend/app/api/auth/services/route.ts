import { NextRequest, NextResponse } from "next/server";
import { Service } from "../../models";

export async function GET(req: NextRequest) {
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
