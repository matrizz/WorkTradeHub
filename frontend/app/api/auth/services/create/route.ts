import { Service } from "../../../models";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const { id, ...rest } = await req.json();

    console.log("OBJ RECEBIDO:", rest)
    try {
        await Service.create({
            data: {
                provider: {
                    connect: {
                        cuid: id
                    }
                },
                status: 'pending',
                ...rest,
                images: 'https://media.istockphoto.com/id/1226966972/vector/insurance-hand-icon-risk-coverage-sign-vector.jpg?s=612x612&w=0&k=20&c=kZbtM0rOo5y0pxVzkBJF35IOZZz1UJIwQjBP9JuiIxs=',
            }
        })

        return NextResponse.json({ success: true, msg: "Serviço criado com sucesso" }, { status: 201 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, msg: "Erro ao criar serviço" }, { status: 500 })
    }
}