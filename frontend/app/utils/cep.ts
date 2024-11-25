class VerificarCep {
    cep = ''
    constructor(cep: string) {
        this.cep = cep.replace(/\D/g, '');
    }
    validarCep() {
        return this.cep.length === 8;
    }
    async buscarCep() {
        if (!this.validarCep()) {
            return console.log("Formato de CEP inválido.")
        }
        try {
            const response = await fetch(`https://viacep.com.br/ws/${this.cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                return console.log("Cep não encontrado.")
            }
            else {
                console.log("Cep válido");
                return {
                    logradouro: data.logradouro,
                    bairro: data.bairro,
                    cidade: data.localidade,
                    estado: data.estado
                }
            }
        }

        catch (e) {
            return "Erro ao buscar o CEP"
        }
    }
    //@ts-ignore
    async mostraEndereco(end) {
        const endereco: void | "Erro ao buscar o CEP" | { logradouro: any; bairro: any; cidade: any; estado: any; } = await this.buscarCep();
        //@ts-ignore
        endereco[end] ? console.log(endereco[end]): ''
    }

}


export default VerificarCep