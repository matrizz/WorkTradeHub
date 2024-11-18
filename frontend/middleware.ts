import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.headers.get("X-Authorization");

  const path = new URL(request.url).pathname;
  const skipPaths = [
    "/api/auth/login",
    "/api/auth/register",
    "/api/auth/account-activation",
  ];

  if (skipPaths.includes(path)) {
    console.log("ata", request.nextUrl);
    return NextResponse.next();
  }
  if (path.includes("/api/auth/user/u/")) return NextResponse.next();

  console.log(token);
  if (!token) {
    return NextResponse.json(
      { success: false, msg: "Acesso negado, token não fornecido" },
      {
        status: 401,
      }
    );
  }

  try {
    const decoded = await JWTVerify(token);
    if (!decoded)
      return NextResponse.json(
        { success: false, msg: "Acesso negado, token expirado ou inválido" },
        { status: 401 }
      );
  } catch (err) {
    return NextResponse.json(
      { success: false, msg: "Erro ao verificar o token" },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

async function JWTVerify(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    console.log("JWT payload:", payload);
    return true;
  } catch (error) {
    console.error("Erro na verificação do JWT:", error);
    return false;
  }
}

export const config = {
  excludedRoutes: ["/api/auth/user"],
  matcher: "/api/auth/:path*",
};
