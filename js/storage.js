/*==================================================
                STORAGE.JS
        Sistema de persistência de dados
        Inclusão Escolar
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


    return this.getTurmas()

    .find(

        turma =>

        String(turma.id) === String(id)

    );


},





updateTurma(id,dados) {


    const lista = this.getTurmas();



    const index = lista.findIndex(

        turma =>

        String(turma.id) === String(id)

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



    const lista = this.getTurmas()

    .filter(

        turma =>

        String(turma.id) !== String(id)

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



    const lista = this.getAlunos();



    lista.push(aluno);



    this.saveAlunos(lista);



},





getAluno(id){



    return this.getAlunos()

    .find(

        aluno =>

        String(aluno.id) === String(id)

    );



},





updateAluno(id,dados){



    const lista = this.getAlunos();



    const index = lista.findIndex(


        aluno =>

        String(aluno.id) === String(id)


    );





    if(index !== -1){



        lista[index] = {



            ...lista[index],


            ...dados



        };




        this.saveAlunos(lista);



    }



},
