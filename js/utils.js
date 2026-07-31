```javascript
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



        let idade =

            hoje.getFullYear() -

            nascimento.getFullYear();




        const mes =

            hoje.getMonth() -

            nascimento.getMonth();




        if (

            mes < 0 ||

            (

                mes === 0 &&

                hoje.getDate() < nascimento.getDate()

            )

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





        /*
            Data do input type="date"

            Exemplo:
            2020-05-10

            Retorno:
            10/05/2020
        */

        if (

            typeof data === "string" &&

            /^\d{4}-\d{2}-\d{2}$/.test(data)

        ) {



            const [ano, mes, dia] =

                data.split("-");



            return `${dia}/${mes}/${ano}`;


        }








        /*
            Data ISO

            Exemplo:
            2020-05-10T03:00:00.000Z

            Evita erro de fuso horário
        */


        if (

            typeof data === "string" &&

            data.includes("T")

        ) {



            const somenteData =

                data.split("T")[0];



            const [ano, mes, dia] =

                somenteData.split("-");



            return `${dia}/${mes}/${ano}`;


        }








        /*
            Outros formatos
        */


        const d = new Date(data);



        if (!isNaN(d.getTime())) {


            return d.toLocaleDateString(

                "pt-BR"

            );


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



        return d.toLocaleString(

            "pt-BR"

        );


    },









    /*=========================================
            DATA ATUAL
    =========================================*/

    dataAtual() {


        const hoje = new Date();



        const ano =

            hoje.getFullYear();



        const mes =

            String(

                hoje.getMonth() + 1

            )

            .padStart(2,"0");



        const dia =

            String(

                hoje.getDate()

            )

            .padStart(2,"0");



        return `${ano}-${mes}-${dia}`;


    },









    /*=========================================
            CPF
    =========================================*/

    formatarCPF(cpf) {


        if (!cpf) return "";



        cpf = cpf.replace(/\D/g,"");



        cpf = cpf.replace(

            /(\d{3})(\d)/,

            "$1.$2"

        );



        cpf = cpf.replace(

            /(\d{3})(\d)/,

            "$1.$2"

        );



        cpf = cpf.replace(

            /(\d{3})(\d{1,2})$/,

            "$1-$2"

        );



        return cpf;


    },









    /*=========================================
            TELEFONE
    =========================================*/

    formatarTelefone(numero) {


        if (!numero) return "";



        numero = numero.replace(

            /\D/g,

            ""

        );



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



        const reader =

            new FileReader();




        reader.onload = function(e){



            callback(

                e.target.result

            );


        };



        reader.readAsDataURL(file);


    },









    /*=========================================
            SAUDAÇÃO
    =========================================*/

    saudacao() {


        const hora =

            new Date().getHours();



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
```
