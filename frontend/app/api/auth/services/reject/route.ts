import { Candidate } from "../../../models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { clientId, serviceId, candidatureId } = await req.json()

    try {
        await Candidate.update({
            where: {
                clientId,
                serviceId,
                id: candidatureId
             },
            data: { status: 'rejected' }
        })
        return NextResponse.json({ success: true, msg: 'Candidatura rejeitada com sucesso.' });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false, msg: 'Erro ao rejeitar candidatura.' }, { status: 500 })
    }
}