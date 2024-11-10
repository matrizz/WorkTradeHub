import nodemailer from "nodemailer";

//Função de validação do código, está como setTmeOut somente para testes ////////////////IMPLEMENTAR//////////////////

// function val(){
//     validade = true    função para teste
// }
// val()

class EmailVerification {
  codigoGerado = "";
  validate = true;

  sendEmailVerification(dest, username) {
    this.codigoGerado = this.getCode();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "Equipe Work Trade Hub <worktradehub@gmail.com>",
      to: `${dest}`,
      subject: `Verificação de ativação da conta`,
      text: `Olá ${username}

Bem-vindo(a) ao Work Trade Hub!

Para concluir o processo de criação de sua conta, é necessário confirmar seu endereço de e-mail. Por favor, use o codigo de verificação abaixo no website para validar a sua conta: ${this.codigoGerado}

Caso não tenha solicitado uma conta conosco, ignore este e-mail.

Se precisar de ajuda ou tiver dúvidas, entre em contato com nossa equipe de suporte em worktradehub@gmail.com.

Obrigado(a) e bem-vindo(a)!

Atenciosamente,
Equipe Work Trade Hub

`,
    };

    transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        setTimeout(this.timeOutCode, 300000); //ativar o tempo de desativação do código
        console.log("success");
      }
    });
  }

  verifyCode(code) {
    const message =
      code == this.codigoGerado
        ? this.validate
          ? "aprovado"
          : "código expirado"
        : "código errado";

    console.log(message);
    return message == "aprovado" ? true : false;
  }

  getCode() {
    let cd = "";
    this.validate = true;
    for (let i = 0; i < 6; i++) {
      const min = Math.ceil(1);
      const max = Math.floor(9);
      const n = Math.floor(Math.random() * (max - min) + min);
      cd += n.toString();
    }
    return cd;
  }

  timeOutCode() {
    this.validate = false;
  }
}

const emailVerificationInstance = new EmailVerification

export { EmailVerification, emailVerificationInstance };
