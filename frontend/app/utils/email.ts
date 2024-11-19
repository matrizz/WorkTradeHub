//@ts-nocheck

//@prussianV
//@matrizz

import nodemailer from 'nodemailer'
import { Redis } from '@upstash/redis'
import EmailContent from './emailContent'

const redis = Redis.fromEnv()
//Função de validação do código, está como setTmeOut somente para testes ////////////////IMPLEMENTAR//////////////////

// function val(){
//     validade = true    função para teste
// }
// val()

interface EmailVerificationOptions {
	dest: string
	cuid: string
	username: string
}

class EmailVerification {
	codigoGerado = ''
	private readonly config = {
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		secure: true,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD
		}
	}

	/**
	 * Envia um e-mail de verificação de conta para o e-mail especificado.
	 * O e-mail contém um código de verificação que precisa ser digitado pelo
	 * usuário para ativar a conta.
	 *
	 * @param {EmailVerificationOptions} options
	 * @property {string} options.dest - E-mail do destinatário.
	 * @property {string} options.cuid - Código único do usuário.
	 * @property {string} options.username - Nome do usuário.
	 */
	sendEmailVerification({ dest, cuid, username }: EmailVerificationOptions) {
		this.codigoGerado = this.getCode()
			; (async () => {
				await redis.setex(`tempCode:${cuid}`, 300, this.codigoGerado)

				const transporter = nodemailer.createTransport(this.config)


				const mailOptions = {
					from: 'Equipe Work Trade Hub <worktradehub@gmail.com>',
					to: `${dest}`,
					subject: `Verificação e ativação da conta`,
					text: EmailContent`${username}${this.codigoGerado}`
				}

				transporter.sendMail({
					host: process.env.SMTP_HOST,
					port: process.env.SMTP_PORT,
					secure: true,
					auth: {
						user: process.env.SMTP_USER,
						pass: process.env.SMTP_PASSWORD
					}
				}, console.log)

			})()
	}

	/**
	 * Verifica se o código de verificação fornecido é válido e não expirou.
	 *
	 * @param {string} cuid - Código único do usuário.
	 * @param {string} code - Código de verificação fornecido pelo usuário.
	 * @returns {Promise<boolean>} - `true` se o código for válido, `false` caso contrário.
	 */
	verifyCode(cuid: string, code: string): Promise<boolean> {
		return (async () => {
			try {
				const tempCode = await redis.get(`tempCode:${cuid}`)
				console.log('[REDIS]:', tempCode)
				if (tempCode) {
					console.log(`Código válido: ${tempCode}`)
					return true
				} else {
					console.log('Código expirado ou inválido')
					return false
				}
			} catch (err) { }
		})()
	}

	/**
	 * Gera um código de verificação aleatório de 6 dígitos.
	 *
	 * @returns {string} - Código de verificação gerado.
	 */
	getCode(): string {
		let cd = ''
		for (let i = 0; i < 6; i++) {
			const min = Math.ceil(1)
			const max = Math.floor(9)
			const n = Math.floor(Math.random() * (max - min) + min)
			cd += n.toString()
		}
		return cd
	}
}

const emailVerificationInstance = new EmailVerification()

export { EmailVerification, emailVerificationInstance }
