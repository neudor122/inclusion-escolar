/*==================================================
                STORAGE.JS
        Banco de dados local - Inclusão Escolar
==================================================*/


const Storage = {


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



            return JSON.parse(dados);



        }
        catch(error){


            console.error(
                "Erro ao buscar:",
                chave,
                error
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


        let dados =
        this.buscar(
            this.chaves.TURMAS
        );


        return Array.isArray(dados)
            ?
            dados
            :
            [];


    },






    addTurma(turma){


        let lista =
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



        lista =
        lista.filter(turma =>


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


        let dados =
        this.buscar(
            this.chaves.ALUNOS
        );


        return Array.isArray(dados)
            ?
            dados
            :
            [];


    },







    addAluno(aluno){


        let lista =
        this.getAlunos();



        lista.push(aluno);



        this.salvar(

            this.chaves.ALUNOS,

            lista

        );


    },







    updateAluno(aluno){


        let lista =
        this.getAlunos();



        lista =
        lista.map(item =>


            Number(item.id)
            ===
            Number(aluno.id)

            ?

            aluno

            :

            item


        );



        this.salvar(

            this.chaves.ALUNOS,

            lista

        );


    },







    removeAluno(id){


        let lista =
        this.getAlunos();



        lista =
        lista.filter(aluno =>


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


        return this.getAlunosDaTurma(idTurma).length;


    },








/*==================================================
            NORMALIZAR ALUNOS IMPORTADOS
==================================================*/


    normalizarAlunos(lista){


        return lista.map(aluno => ({



            id:

            Number(aluno.id)
            ||
            this.gerarId(),



            nome:

            aluno.nome || "",



            dataNascimento:

            aluno.dataNascimento
            ||
            aluno.nascimento
            ||
            "",



            responsavel:

            aluno.responsavel || "",



            necessidade:

            aluno.necessidade || "",



            observacao:

            aluno.observacao || "",



            turmaId:

            aluno.turmaId
            ?
            Number(aluno.turmaId)
            :
            null,



            foto:

            aluno.foto || "",



            dataCadastro:

            aluno.dataCadastro || ""


        }));


    },









/*==================================================
                ATENDIMENTOS
==================================================*/


    getAtendimentos(){


        let dados =
        this.buscar(
            this.chaves.ATENDIMENTOS
        );


        return Array.isArray(dados)
            ?
            dados
            :
            [];


    },






    addAtendimento(item){


        let lista =
        this.getAtendimentos();



        lista.push(item);



        this.salvar(

            this.chaves.ATENDIMENTOS,

            lista

        );


    },








/*==================================================
                    AVISOS
==================================================*/


    getAvisos(){


        let avisos =
        this.buscar(
            this.chaves.AVISOS
        );



        if(typeof avisos === "string"){


            try{

                avisos =
                JSON.parse(avisos);


            }
            catch{

                avisos = [];

            }


        }



        return Array.isArray(avisos)
            ?
            avisos
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





        const blob =
        new Blob(


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



        link.click();



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




        leitor.onload=function(e){


            try{



                let dados =
                JSON.parse(
                    e.target.result
                );





                if(Array.isArray(dados)){


                    dados = {

                        alunos:dados

                    };


                }






                if(dados.turmas){


                    Storage.salvar(

                        Storage.chaves.TURMAS,

                        dados.turmas

                    );


                }







                if(dados.alunos){


                    Storage.salvar(

                        Storage.chaves.ALUNOS,

                        Storage.normalizarAlunos(
                            dados.alunos
                        )

                    );


                }






                if(dados.atendimentos){


                    Storage.salvar(

                        Storage.chaves.ATENDIMENTOS,

                        dados.atendimentos

                    );


                }






                if(dados.avisos){


                    Storage.salvarAvisos(
                        dados.avisos
                    );


                }






                alert(
                    "Dados importados com sucesso!"
                );



                location.reload();



            }
            catch(error){


                console.error(error);


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
