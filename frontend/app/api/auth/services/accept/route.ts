import { Candidate, Service } from "../../../models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { clientId, serviceId } = await req.json()

    try {
        await Candidate.updateMany({
            where: { clientId, serviceId }, data: { status: 'accepted' }
        })
        await Candidate.updateMany({
            where: {
                clientId: { not: clientId },
                serviceId: serviceId
            },
            data: { status: 'rejected' }
        })
        await Service.update({
            where: { id: serviceId },
            data: { status: 'inProgress' }
        })
        return NextResponse.json({ success: true, msg: 'Candidatura e serviço atualizados com sucesso.' });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, msg: 'Erro ao atualizar candidatura e serviço.' }, { status: 500 })
    }
}