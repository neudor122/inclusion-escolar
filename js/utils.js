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

        const partes = dataNascimento.split("-");

        if (partes.length !== 3) return "";

        const nascimento = new Date(
            Number(partes[0]),
            Number(partes[1]) - 1,
            Number(partes[2])
        );

        const hoje = new Date();

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

        // Data vinda do input type="date"
        if (typeof data === "string" && data.includes("-")) {

            const partes = data.split("-");

            if (partes.length === 3) {

                return `${partes[2]}/${partes[1]}/${partes[0]}`;

            }

        }

        // ISO DateTime
        const d = new Date(data);

        if (!isNaN(d.getTime())) {

            return d.toLocaleDateString("pt-BR");

        }

        return data;
    },

    /*=========================================
            DATA E HORA
    =========================================*/
    formatarDataHora(data) {

        if (!data) return "";

        const d = new Date(data);

        if (isNaN(d.getTime())) return "";

        return d.toLocaleString("pt-BR");

    },

    /*=========================================
            CPF
    =========================================*/
    formatarCPF(cpf) {

        if (!cpf) return "";

        cpf = cpf.replace(/\D/g, "");

        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");

        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");

        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        return cpf;

    },

    /*=========================================
            TELEFONE
    =========================================*/
    formatarTelefone(numero) {

        if (!numero) return "";

        numero = numero.replace(/\D/g, "");

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

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

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
