//Sistema de verificação de veracidade do cpf

/**
 * Valida se um CPF
 *
 * @param {string} cpf - CPF que ser  verificado
 * @returns {boolean} - true se o CPF for válido, e false caso contrario
 */
export function ValidarCpf(cpf: string) {
	cpf = cpf.replace(/[.-]/g, '')

	let cpfinc = cpf

	cpfinc = cpfinc.slice(0, -2)

	function CalculoDigitos(cpfcalc: any) {
		let dig = 0
		let column = cpfcalc.length + 1

		for (let i = 0; i < cpfcalc.length; i++) {
			dig += parseInt(cpfcalc[i]) * column
			column--
		}

		dig = dig % 11 < 2 ? 0 : 11 - (dig % 11)

		return dig
	}

	cpfinc += CalculoDigitos(cpfinc)

	cpfinc += CalculoDigitos(cpfinc)

	if (cpfinc == cpf) return true
	else return false
}
