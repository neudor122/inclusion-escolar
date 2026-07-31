/*==================================================
                STORAGE.JS
        Banco de dados local - Inclusão Escolar
==================================================*/


const Storage = {


/*==================================================
                    CHAVES
==================================================*/


chaves:{


    TURMAS:"turmas",

    ALUNOS:"alunos",

    ATENDIMENTOS:"atendimentos",

    AVISOS:"avisos"


},





/*==================================================
                    AUXILIARES
==================================================*/


salvar(chave,dados){


    localStorage.setItem(

        chave,

        JSON.stringify(dados)

    );


},





buscar(chave){


    try{


        const dados =

            localStorage.getItem(chave);



        if(!dados){

            return [];

        }



        const resultado =

            JSON.parse(dados);



        return resultado;



    }
    catch(erro){


        console.error(

            "Erro ao buscar",

            chave,

            erro

        );


        return [];


    }


},





gerarId(){


    return Date.now();


},







/*==================================================
                    TURMAS
==================================================*/


getTurmas(){


    const lista =

        this.buscar(

            this.chaves.TURMAS

        );



    return Array.isArray(lista)

        ?

        lista

        :

        [];


},





addTurma(turma){


    const lista =

        this.getTurmas();



    lista.push(turma);



    this.salvar(

        this.chaves.TURMAS,

        lista

    );


},





removeTurma(id){


    let lista =

        this.getTurmas();



    lista = lista.filter(turma =>


        Number(turma.id)

        !==

        Number(id)


    );



    this.salvar(

        this.chaves.TURMAS,

        lista

    );


},





getTurma(id){


    return this.getTurmas()

    .find(turma =>


        Number(turma.id)

        ===

        Number(id)


    );


},







/*==================================================
                    ALUNOS
==================================================*/


getAlunos(){


    const lista =

        this.buscar(

            this.chaves.ALUNOS

        );



    return Array.isArray(lista)

        ?

        lista

        :

        [];


},





addAluno(aluno){


    const lista =

        this.getAlunos();



    lista.push(aluno);



    this.salvar(

        this.chaves.ALUNOS,

        lista

    );


},





updateAluno(alunoAtualizado){


    let lista =

        this.getAlunos();



    lista = lista.map(aluno =>


        Number(aluno.id)

        ===

        Number(alunoAtualizado.id)


        ?


        alunoAtualizado


        :


        aluno


    );



    this.salvar(

        this.chaves.ALUNOS,

        lista

    );


},





removeAluno(id){


    let lista =

        this.getAlunos();



    lista = lista.filter(aluno =>


        Number(aluno.id)

        !==

        Number(id)


    );



    this.salvar(

        this.chaves.ALUNOS,

        lista

    );


},





getAluno(id){


    return this.getAlunos()

    .find(aluno =>


        Number(aluno.id)

        ===

        Number(id)


    );


},





getAlunosDaTurma(idTurma){


    return this.getAlunos()

    .filter(aluno =>


        Number(aluno.turmaId)

        ===

        Number(idTurma)


    );


},





contarAlunosTurma(idTurma){


    return this.getAlunosDaTurma(idTurma)

    .length;
/*==================================================
            NORMALIZAR ALUNOS IMPORTADOS
==================================================*/


normalizarAlunos(lista){


    if(!Array.isArray(lista)){


        return [];


    }





    return lista.map(aluno => ({


        id:

            Number(aluno.id)

            ||

            this.gerarId(),





        nome:

            aluno.nome

            ||

            "",





        dataNascimento:

            aluno.dataNascimento

            ||

            aluno.nascimento

            ||

            "",





        responsavel:

            aluno.responsavel

            ||

            "",





        necessidade:

            aluno.necessidade

            ||

            "",





        observacao:

            aluno.observacao

            ||

            "",





        turmaId:

            aluno.turmaId

            ?

            Number(aluno.turmaId)

            :

            null,





        foto:

            aluno.foto

            ||

            "",





        dataCadastro:

            aluno.dataCadastro

            ||

            ""


    }));



},







/*==================================================
                ATENDIMENTOS
==================================================*/


getAtendimentos(){


    const lista =

        this.buscar(

            this.chaves.ATENDIMENTOS

        );



    return Array.isArray(lista)

        ?

        lista

        :

        [];


},





addAtendimento(item){


    const lista =

        this.getAtendimentos();



    lista.push(item);



    this.salvar(

        this.chaves.ATENDIMENTOS,

        lista

    );


},





removeAtendimento(id){


    let lista =

        this.getAtendimentos();



    lista = lista.filter(item =>


        Number(item.id)

        !==

        Number(id)


    );



    this.salvar(

        this.chaves.ATENDIMENTOS,

        lista

    );


},







/*==================================================
                    AVISOS
==================================================*/


getAvisos(){


    const lista =

        this.buscar(

            this.chaves.AVISOS

        );



    return Array.isArray(lista)

        ?

        lista

        :

        [];


},





salvarAvisos(lista){


    if(!Array.isArray(lista)){


        lista = [];


    }



    this.salvar(

        this.chaves.AVISOS,

        lista

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





    const blob = new Blob(


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





    const link =

        document.createElement("a");





    link.href =

        URL.createObjectURL(blob);





    link.download =

        "backup-inclusao-escolar.json";





    document.body.appendChild(link);





    link.click();





    setTimeout(()=>{


        document.body.removeChild(link);


        URL.revokeObjectURL(link.href);


    },100);



},

  /*==================================================
                IMPORTAR DADOS
==================================================*/


importarDados(event){


    const arquivo =

        event.target.files[0];



    if(!arquivo){


        return;


    }





    const leitor =

        new FileReader();





    leitor.onload = (e)=>{


        try{


            let dados =

                JSON.parse(

                    e.target.result

                );





            // Aceita backup antigo somente com array de alunos

            if(Array.isArray(dados)){


                dados = {


                    alunos:dados


                };


            }






            if(!dados || typeof dados !== "object"){


                throw new Error(

                    "Formato inválido"

                );


            }







            if(Array.isArray(dados.turmas)){



                this.salvar(


                    this.chaves.TURMAS,


                    dados.turmas


                );


            }








            if(Array.isArray(dados.alunos)){



                this.salvar(


                    this.chaves.ALUNOS,


                    this.normalizarAlunos(

                        dados.alunos

                    )


                );


            }








            if(Array.isArray(dados.atendimentos)){



                this.salvar(


                    this.chaves.ATENDIMENTOS,


                    dados.atendimentos


                );


            }








            if(Array.isArray(dados.avisos)){



                this.salvarAvisos(


                    dados.avisos


                );


            }







            alert(

                "Dados importados com sucesso!"

            );



            location.reload();




        }

        catch(erro){



            console.error(

                erro

            );



            alert(

                "Arquivo JSON inválido."

            );



        }



    };





    leitor.readAsText(

        arquivo

    );



},







/*==================================================
                LIMPAR TUDO
==================================================*/


limparTudo(){



    Object.values(

        this.chaves

    )

    .forEach(chave=>{



        localStorage.removeItem(

            chave

        );



    });



}



};









/*==================================================
        CRIAR BANCO AUTOMÁTICO
==================================================*/


Object.values(Storage.chaves)

.forEach(chave=>{



    if(!localStorage.getItem(chave)){



        localStorage.setItem(


            chave,


            JSON.stringify([])


        );



    }



});

},
