/**
 * Gera um template de conteúdo de email para verificação de conta.
 *
 * @param {string[]} strings - Um array de strings usadas em templates literais.
 * @param {...string[]} values - Os valores dinâmicos a serem inseridos no template.
 * @returns {string} Uma string formatada de conteúdo de email incluindo uma saudação, instruções de verificação, e informações de contato para suporte.
 */

export default function EmailContent(strings: string[], ...values: string[]) {
	return `Olá ${values[0].split(' ').slice(0, 2).join(' ')}

Bem-vindo(a) ao Work Trade Hub!

Para concluir o processo de criação de sua conta, é necessário confirmar seu endereço de e-mail. Por favor, use o codigo de verificação abaixo no website para validar a sua conta: ${values[1]}

Caso não tenha solicitado uma conta conosco, ignore este e-mail.

Se precisar de ajuda ou tiver dúvidas, entre em contato com nossa equipe de suporte em worktradehub@gmail.com.

Obrigado(a) e bem-vindo(a)!

Atenciosamente,
Equipe WorkTradeHub

`
}
