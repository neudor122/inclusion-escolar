/*==================================================
            BACKUP DO SISTEMA
==================================================*/


function exportarDados(){


    const dados = {


        turmas:
            Storage.getTurmas(),


        alunos:
            Storage.getAlunos(),


        atendimentos:
            Storage.getAtendimentos(),


        avisos:
            localStorage.getItem("avisos") || ""



    };




    const arquivo = new Blob(

        [
            JSON.stringify(
                dados,
                null,
                2
            )
        ],

        {
            type:
            "application/json"
        }

    );




    const url =
        URL.createObjectURL(
            arquivo
        );



    const link =
        document.createElement(
            "a"
        );



    link.href = url;


    link.download =
        "backup_inclusao_escolar.json";



    link.click();



    URL.revokeObjectURL(url);



    Utils.mensagem(
        "Backup exportado com sucesso!"
    );


}








function importarDados(event){



    const arquivo =
        event.target.files[0];



    if(!arquivo){

        return;

    }





    const leitor =
        new FileReader();





    leitor.onload =
    function(e){



        try {



            const dados =
                JSON.parse(
                    e.target.result
                );





            if(dados.turmas){

                Storage.saveTurmas(
                    dados.turmas
                );

            }



            if(dados.alunos){

                Storage.saveAlunos(
                    dados.alunos
                );

            }




            if(dados.atendimentos){

                Storage.saveAtendimentos(
                    dados.atendimentos
                );

            }




            if(dados.avisos){

                localStorage.setItem(
                    "avisos",
                    dados.avisos
                );

            }





            Utils.mensagem(
                "Dados importados com sucesso!"
            );



            location.reload();





        }catch(erro){



            Utils.mensagem(
                "Arquivo inválido."
            );



        }



    };





    leitor.readAsText(
        arquivo
    );


}
