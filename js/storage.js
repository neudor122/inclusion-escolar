/*==================================================
            STORAGE.JS
Sistema de persistência de dados
Versão: Inclusão Escolar
==================================================*/


const Storage = {


    /*==================================================
                    TURMAS
    ==================================================*/


    getTurmas() {

        return JSON.parse(

            localStorage.getItem("turmas")

        ) || [];

    },


    saveTurmas(lista) {

        localStorage.setItem(

            "turmas",

            JSON.stringify(lista)

        );

    },


    addTurma(turma) {


        const lista = this.getTurmas();


        lista.push(turma);


        this.saveTurmas(lista);


    },


    getTurma(id) {


        return this

            .getTurmas()

        .find(turma => turma.id == id);


    },


    removeTurma(id) {


        const lista = this

            .getTurmas()

        .filter(turma => turma.id != id);



        this.saveTurmas(lista);


    },


    updateTurma(id, dados) {


        const lista = this.getTurmas();



        const index = lista.findIndex(

            turma => turma.id == id

        );



        if (index !== -1) {


            lista[index] = {


                ...lista[index],

                ...dados


            };


            this.saveTurmas(lista);


        }


    },






    /*==================================================
                    ALUNOS
    ==================================================*/


    getAlunos() {


        return JSON.parse(

            localStorage.getItem("alunos")

        ) || [];


    },



    saveAlunos(lista) {


        localStorage.setItem(

            "alunos",

            JSON.stringify(lista)

        );


    },



    addAluno(aluno) {



        const lista = this.getAlunos();



        lista.push(aluno);



        this.saveAlunos(lista);



    },



    getAluno(id) {



        return this

            .getAlunos()

        .find(aluno => aluno.id == id);



    },



    updateAluno(id, dados) {



        const lista = this.getAlunos();



        const index = lista.findIndex(


            aluno => aluno.id == id


        );



        if (index !== -1) {



            lista[index] = {



                ...lista[index],


                ...dados



            };



            this.saveAlunos(lista);



        }



    },




    removeAluno(id) {



        const lista = this

            .getAlunos()

        .filter(aluno => aluno.id != id);



        this.saveAlunos(lista);



    },







    /*==================================================
                RELAÇÃO ALUNO / TURMA
    ==================================================*/


    getAlunosDaTurma(turmaId) {



        return this

            .getAlunos()

        .filter(

            aluno => aluno.turmaId == turmaId

        );



    },






    contarAlunosTurma(turmaId) {



        return this

            .getAlunosDaTurma(turmaId)

        .length;



    },







    /*==================================================
                ATENDIMENTOS
    ==================================================*/


    getAtendimentos() {



        return JSON.parse(

            localStorage.getItem("atendimentos")

        ) || [];



    },



    saveAtendimentos(lista) {



        localStorage.setItem(

            "atendimentos",

            JSON.stringify(lista)

        );



    },



    addAtendimento(atendimento) {



        const lista = this.getAtendimentos();



        lista.push(atendimento);



        this.saveAtendimentos(lista);



    },



    getAtendimento(id) {



        return this

            .getAtendimentos()

        .find(

            item => item.id == id

        );



    },




    updateAtendimento(id, dados) {



        const lista = this.getAtendimentos();



        const index = lista.findIndex(


            item => item.id == id


        );



        if (index !== -1) {



            lista[index] = {



                ...lista[index],


                ...dados



            };



            this.saveAtendimentos(lista);



        }



    },




    removeAtendimento(id) {



        const lista = this

            .getAtendimentos()

        .filter(

            item => item.id != id

        );



        this.saveAtendimentos(lista);



    },







    /*==================================================
                    LIMPAR SISTEMA
    ==================================================*/


    limparTudo() {


        localStorage.removeItem("turmas");

        localStorage.removeItem("alunos");

        localStorage.removeItem("atendimentos");


    }



};