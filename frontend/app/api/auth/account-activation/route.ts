import { User } from "../../models";
import { emailVerificationInstance } from "../../../utils/email";
import { NextRequest, NextResponse } from "next/server";

/**
 * @todo Implementar a verificação do código de verificação.
 *
 * Verifica se o código de verificação enviado pelo usuário é válido,
 * e se sim, ativa a conta do usuário.
 *
 * @param {NextRequest} req
 * @returns {Promise<NextResponse>}
 *
 * @example
 * GET /api/auth/account-activation?u=a1b2c3d4e5f6g7h8
 * X-Code-Verification: 123456
 *
 * @example
 * GET /api/auth/account-activation?u=a1b2c3d4e5f6g7h8
 * X-Code-Verification: invalid-code
 *
 * @returns {Promise<NextResponse>}
 * { success: boolean, msg: string }
 *  - `success`: Se o código de verificação for válido, `true`, caso contrário, `false`.
 *  - `msg`: Mensagem de erro ou sucesso.
 * @status 200 | 401
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const cuid = url.searchParams.get("u");
  const code = req.headers.get("X-Code-Verification");

  if (!cuid || !code) {
    return NextResponse.json(
      { msg: "Código de verificação ou ID do usuário nao fornecido" },
      { status: 400 }
    );
  }

  const isValid = await emailVerificationInstance.verifyCode(cuid, code);

  if (isValid) {
    console.log(isValid);

    try {
      await User.update({ where: { cuid }, data: { isAuth: true } });
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { success: false, msg: "Erro ao ativar conta" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, msg: "Conta ativada com sucesso" },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { success: false, msg: "Código de verificação expirado ou inválido" },
    { status: 401 }
  );
}
