/*==================================================
                STORAGE.JS
        Banco de dados local - Inclusão Escolar
==================================================*/


const Storage = {


    chaves:{


        TURMAS: "turmas",

        ALUNOS: "alunos",

        ATENDIMENTOS: "atendimentos",

        AVISOS: "avisos"


    },




    /*==================================================
                    AUXILIARES
    ==================================================*/



    salvar(chave, dados){


        localStorage.setItem(

            chave,

            JSON.stringify(dados)

        );


    },





    buscar(chave){


        const dados = localStorage.getItem(chave);



        return dados

            ? JSON.parse(dados)

            : [];


    },





    /*==================================================
                    TURMAS
    ==================================================*/



    getTurmas(){


        return this.buscar(

            this.chaves.TURMAS

        );


    },





    addTurma(turma){


        const turmas = this.getTurmas();


        turmas.push(turma);


        this.salvar(

            this.chaves.TURMAS,

            turmas

        );


    },





    removeTurma(id){


        let turmas = this.getTurmas();



        turmas = turmas.filter(turma =>


            Number(turma.id) !== Number(id)


        );



        this.salvar(

            this.chaves.TURMAS,

            turmas

        );


    },





    getTurma(id){


        return this.getTurmas().find(turma =>


            Number(turma.id) === Number(id)


        );


    },









    /*==================================================
                    ALUNOS
    ==================================================*/



    getAlunos(){


        return this.buscar(

            this.chaves.ALUNOS

        );


    },





    addAluno(aluno){


        const alunos = this.getAlunos();



        alunos.push(aluno);



        this.salvar(

            this.chaves.ALUNOS,

            alunos

        );


    },





    updateAluno(alunoAtualizado){


        let alunos = this.getAlunos();



        alunos = alunos.map(aluno =>


            Number(aluno.id) === Number(alunoAtualizado.id)


            ?

            alunoAtualizado


            :

            aluno


        );



        this.salvar(

            this.chaves.ALUNOS,

            alunos

        );


    },





    removeAluno(id){


        let alunos = this.getAlunos();



        alunos = alunos.filter(aluno =>


            Number(aluno.id) !== Number(id)


        );



        this.salvar(

            this.chaves.ALUNOS,

            alunos

        );


    },





    getAluno(id){


        return this.getAlunos().find(aluno =>


            Number(aluno.id) === Number(id)


        );


    },









    /*==================================================
                ALUNOS POR TURMA
    ==================================================*/



    getAlunosDaTurma(idTurma){


        return this.getAlunos().filter(aluno =>


            Number(aluno.turmaId) === Number(idTurma)


        );


    },





    contarAlunosTurma(idTurma){


        return this.getAlunosDaTurma(idTurma).length;


    },









    /*==================================================
                ATENDIMENTOS
    ==================================================*/



    getAtendimentos(){


        return this.buscar(

            this.chaves.ATENDIMENTOS

        );


    },





    addAtendimento(atendimento){


        const lista = this.getAtendimentos();


        lista.push(atendimento);


        this.salvar(

            this.chaves.ATENDIMENTOS,

            lista

        );


    },









    /*==================================================
                    AVISOS
    ==================================================*/



    getAvisos(){


        return this.buscar(

            this.chaves.AVISOS

        );


    },





    salvarAvisos(lista){


        this.salvar(

            this.chaves.AVISOS,

            lista

        );


    },









    /*==================================================
            NORMALIZAR ALUNOS IMPORTADOS
    ==================================================*/



    normalizarAlunos(alunos){


        return alunos.map(aluno => ({


            id:

                Number(aluno.id)

                ||

                Utils.gerarId(),




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

                Number(aluno.turmaId)

                ||

                null,





            foto:

                aluno.foto || "",





            dataCadastro:

                aluno.dataCadastro || ""



        }));



    },









    /*==================================================
                EXPORTAR DADOS
    ==================================================*/



    exportarDados(){


        const dados = {


            turmas:this.getTurmas(),


            alunos:this.getAlunos(),


            atendimentos:this.getAtendimentos(),


            avisos:this.getAvisos()


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

                type:"application/json"

            }

        );



        const link = document.createElement("a");


        link.href = URL.createObjectURL(blob);



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





        const leitor = new FileReader();





        leitor.onload = function(e){



            try{



                const dados = JSON.parse(

                    e.target.result

                );





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


                    Storage.salvar(

                        Storage.chaves.AVISOS,

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

                    "Arquivo inválido."

                );


            }


        };





        leitor.readAsText(arquivo);



    },









    /*==================================================
                LIMPAR BANCO
    ==================================================*/



    limparTudo(){


        Object.values(this.chaves)

        .forEach(chave =>{


            localStorage.removeItem(chave);


        });


    }



};









Object.values(Storage.chaves)

.forEach(chave =>{


    if(!localStorage.getItem(chave)){


        localStorage.setItem(

            chave,

            JSON.stringify([])

        );


    }


});
