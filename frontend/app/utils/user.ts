/**
 * Extrai o ID do usuário da URL fornecida.
 * @param {string} url URL para extrair o ID do usuário
 * @returns {string} O ID do usuário
 */

export function extractUserIDFromURL(url: string): string {
	return url.split('/')[url.split('/').length - 1]
}

/**
 * Extrai o nome de usuário da URL fornecida.
 * @param {string} url URL para extrair o nome de usuário
 * @returns {string} O nome de usuário
 */

export function extractUserNameFromURL(url: string): string {
	return extractUserIDFromURL(url)
}
