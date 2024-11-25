import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

/**
 * Verifica se o token de autenticação foi fornecido na requisição e,
 * se sim, verifica se ele é válido. Se o token for válido, a requisição
 * prossegue normalmente. Caso contrário, retorna uma resposta com status 401
 * e uma mensagem de erro apropriada.
 *
 * @param {NextRequest} request - A requisição que está sendo feita.
 * @returns {NextResponse} A resposta para a requisição, que pode ser
 *                        uma resposta de erro ou a requisição original.
 */
export async function middleware(
	request: NextRequest
): Promise<NextResponse<unknown>> {
	const token = request.headers.get('X-Authorization')

	const path = new URL(request.url).pathname
	const skipPaths = [
		'/api/auth/login',
		'/api/auth/register',
		'/api/auth/account-activation'
	]

	if (skipPaths.includes(path)) {
		return NextResponse.next()
	}

	if (path.includes('/api/auth/user/u/')) return NextResponse.next()
	if (path.includes('/api/auth/user/services?')) return NextResponse.next()

	if (!token) {
		return NextResponse.json(
			{ success: false, msg: 'Acesso negado, token não fornecido' },
			{ status: 401 }
		)
	}

	try {
		const decoded = await JWTVerify(token)
		if (!decoded)
			return NextResponse.json(
				{ success: false, msg: 'Acesso negado, token expirado ou inválido' },
				{ status: 401 }
			)
	} catch (err) {
		return NextResponse.json(
			{ success: false, msg: 'Erro ao verificar o token' },
			{ status: 401 }
		)
	}

	return NextResponse.next()
}

async function JWTVerify(token: string): Promise<boolean> {
	try {
		const secret = new TextEncoder().encode(process.env.JWT_SECRET)
		const { payload } = await jwtVerify(token, secret)

		console.log('JWT payload:', payload)
		return true
	} catch (error) {
		console.error('Erro na verificação do JWT:', error)
		return false
	}
}

export const config = {
	excludedRoutes: ['/api/auth/user'],
	matcher: '/api/auth/:path*'
}
