import { emailVerificationInstance } from "@/app/utils/email";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const cuid = url.searchParams.get('u');
    const code = req.headers.get('X-Code-Verification');

    if (!cuid || !code) {
        return NextResponse.json({ msg: 'Código de verificação ou ID do usuário nao fornecido' }, { status: 400 });
    }
    
    const isValid = await emailVerificationInstance.verifyCode(cuid, code)

    if (isValid) {
        console.log(isValid)
        return NextResponse.json({ success: true, msg: 'Conta ativada com sucesso' }, { status: 200 });
    }

    return NextResponse.json({ success: false, msg: 'Código de verificação expirado ou inválido' }, { status: 401 });
}