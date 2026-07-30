/*==================================================
                UTILS.JS
Funções auxiliares do sistema
==================================================*/

const Utils = {

    /*=========================================
                GERAR ID
    =========================================*/

    gerarId() {

        return Date.now();

    },

    /*=========================================
            CALCULAR IDADE
    =========================================*/

    calcularIdade(dataNascimento) {

        if (!dataNascimento) return "";

        const hoje = new Date();

        const nascimento = new Date(dataNascimento);

        let idade = hoje.getFullYear() - nascimento.getFullYear();

        const mes = hoje.getMonth() - nascimento.getMonth();

        if (

            mes < 0 ||

            (mes === 0 && hoje.getDate() < nascimento.getDate())

        ) {

            idade--;

        }

        return idade;

    },

    /*=========================================
            DATA BRASILEIRA
    =========================================*/

    formatarData(data) {

        if (!data) return "";

        return new Date(data)
            .toLocaleDateString("pt-BR");

    },

    /*=========================================
            DATA E HORA
    =========================================*/

    formatarDataHora(data) {

        if (!data) return "";

        return new Date(data)
            .toLocaleString("pt-BR");

    },

    /*=========================================
            CPF
    =========================================*/

    formatarCPF(cpf) {

        cpf = cpf.replace(/\D/g, '');

        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");

        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");

        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        return cpf;

    },

    /*=========================================
            TELEFONE
    =========================================*/

    formatarTelefone(numero) {

        numero = numero.replace(/\D/g, '');

        numero = numero.replace(

            /^(\d{2})(\d)/,

            "($1) $2"

        );

        numero = numero.replace(

            /(\d{5})(\d)/,

            "$1-$2"

        );

        return numero;

    },

    /*=========================================
            FOTO
    =========================================*/

    imagemBase64(file, callback) {

        const reader = new FileReader();

        reader.onload = e => {

            callback(e.target.result);

        };

        reader.readAsDataURL(file);

    },

    /*=========================================
            SAUDAÇÃO
    =========================================*/

    saudacao() {

        const hora = new Date().getHours();

        if (hora < 12) {

            return "Bom dia";

        }

        if (hora < 18) {

            return "Boa tarde";

        }

        return "Boa noite";

    },

    /*=========================================
            MENSAGEM
    =========================================*/

    mensagem(texto) {

        alert(texto);

    }

};