import { Candidate, Service } from "../../../../models";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    const id = req.url.split('/')[req.url.split('/').length - 2];
    const body = await req.json()
    console.log("7", body)
    try {

        const cuid = body.cuid

        const updatedService = await Service.update({
            where: { id },
            data: {
                Candidate: {
                    create: {
                        status: "pending",
                        clientName: body.clientName,
                        client: {
                            connect: {
                                cuid
                            }
                        }
                    }
                },
            },
        });

        return NextResponse.json(
            { success: true, data: updatedService },
            { status: 200 }
        );
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            { success: false, msg: "Erro no servidor" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const candidates = await Candidate.findMany({
            where: {
                serviceId: req.url.split('/')[req.url.split('/').length - 2]
            }
        })

        return NextResponse.json({ success: true, data: candidates }, { status: 200 })
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, msg: "Erro no servidor" }, { status: 500 })
    }
}