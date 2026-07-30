/*==================================================
                STORAGE.JS
        Sistema de persistência de dados
        Inclusão Escolar
==================================================*/


const Storage = {



/*==================================================
                    TURMAS
==================================================*/


getTurmas(){


    return JSON.parse(

        localStorage.getItem("turmas")

    ) || [];


},





saveTurmas(lista){


    localStorage.setItem(

        "turmas",

        JSON.stringify(lista)

    );


},





addTurma(turma){


    const lista =
        this.getTurmas();



    lista.push(turma);



    this.saveTurmas(lista);



},





getTurma(id){


    return this
        .getTurmas()
        .find(
            turma =>
            Number(turma.id)
            ===
            Number(id)
        );


},





updateTurma(id,dados){


    const lista =
        this.getTurmas();



    const index =
        lista.findIndex(

            turma =>

            Number(turma.id)
            ===
            Number(id)

        );



    if(index !== -1){


        lista[index] = {


            ...lista[index],

            ...dados


        };



        this.saveTurmas(lista);


    }


},





removeTurma(id){


    const lista =

        this.getTurmas()
        .filter(

            turma =>

            Number(turma.id)
            !==
            Number(id)

        );



    this.saveTurmas(lista);



},







/*==================================================
                    ALUNOS
==================================================*/


getAlunos(){


    return JSON.parse(

        localStorage.getItem("alunos")

    ) || [];



},





saveAlunos(lista){


    localStorage.setItem(

        "alunos",

        JSON.stringify(lista)

    );


},





addAluno(aluno){



    const lista =
        this.getAlunos();



    lista.push(aluno);



    this.saveAlunos(lista);



},





getAluno(id){


    return this
        .getAlunos()
        .find(

            aluno =>

            Number(aluno.id)
            ===
            Number(id)

        );



},





updateAluno(id,dados){


    const lista =
        this.getAlunos();



    const index =

        lista.findIndex(

            aluno =>

            Number(aluno.id)
            ===
            Number(id)

        );



    if(index !== -1){



        lista[index] = {


            ...lista[index],

            ...dados


        };



        this.saveAlunos(lista);



    }



},





removeAluno(id){



    const lista =

        this.getAlunos()
        .filter(

            aluno =>

            Number(aluno.id)
            !==
            Number(id)

        );



    this.saveAlunos(lista);



},






/*==================================================
            RELAÇÃO TURMA / ALUNO
==================================================*/


getAlunosDaTurma(turmaId){



    return this
        .getAlunos()
        .filter(

            aluno =>

            Number(aluno.turmaId)
            ===
            Number(turmaId)

        );



},





contarAlunosTurma(turmaId){


    return this
        .getAlunosDaTurma(turmaId)
        .length;



},

  /*==================================================
                ATENDIMENTOS
==================================================*/


getAtendimentos(){


    return JSON.parse(

        localStorage.getItem("atendimentos")

    ) || [];



},





saveAtendimentos(lista){


    localStorage.setItem(

        "atendimentos",

        JSON.stringify(lista)

    );


},





addAtendimento(atendimento){


    const lista =
        this.getAtendimentos();



    lista.push(atendimento);



    this.saveAtendimentos(lista);



},





getAtendimento(id){


    return this
        .getAtendimentos()
        .find(

            item =>

            Number(item.id)
            ===
            Number(id)

        );


},





updateAtendimento(id,dados){


    const lista =
        this.getAtendimentos();



    const index =

        lista.findIndex(

            item =>

            Number(item.id)
            ===
            Number(id)

        );



    if(index !== -1){


        lista[index] = {


            ...lista[index],

            ...dados


        };



        this.saveAtendimentos(lista);



    }


},





removeAtendimento(id){



    const lista =

        this.getAtendimentos()
        .filter(

            item =>

            Number(item.id)
            !==
            Number(id)

        );



    this.saveAtendimentos(lista);



},







/*==================================================
                    AVISOS
==================================================*/


getAvisos(){


    return localStorage.getItem(
        "avisos"
    ) || "";



},





saveAvisos(texto){



    localStorage.setItem(

        "avisos",

        texto

    );



},







/*==================================================
                EXPORTAR DADOS
==================================================*/


exportarDados(){



    const dados = {



        turmas:
            this.getTurmas(),



        alunos:
            this.getAlunos(),



        atendimentos:
            this.getAtendimentos(),



        avisos:
            this.getAvisos()



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
        "backup-inclusao-escolar.json";





    link.click();





    URL.revokeObjectURL(url);



},







/*==================================================
                IMPORTAR DADOS
==================================================*/


importarDados(arquivo){



    const leitor =
        new FileReader();





    leitor.onload = function(e){



        try {



            const dados =
                JSON.parse(
                    e.target.result
                );





            if(dados.turmas){


                localStorage.setItem(

                    "turmas",

                    JSON.stringify(
                        dados.turmas
                    )

                );


            }





            if(dados.alunos){


                localStorage.setItem(

                    "alunos",

                    JSON.stringify(
                        dados.alunos
                    )

                );


            }






            if(dados.atendimentos){


                localStorage.setItem(

                    "atendimentos",

                    JSON.stringify(
                        dados.atendimentos
                    )

                );


            }






            if(dados.avisos !== undefined){


                localStorage.setItem(

                    "avisos",

                    dados.avisos

                );


            }






            alert(

                "Backup importado com sucesso!"

            );



            location.reload();





        } catch(error){



            alert(

                "Arquivo de backup inválido."

            );



        }




    };





    leitor.readAsText(
        arquivo
    );



},







/*==================================================
                LIMPAR SISTEMA
==================================================*/


limparTudo(){



    localStorage.removeItem(
        "turmas"
    );



    localStorage.removeItem(
        "alunos"
    );



    localStorage.removeItem(
        "atendimentos"
    );



    localStorage.removeItem(
        "avisos"
    );



}



};
  
