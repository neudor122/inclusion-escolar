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
 

removeAluno(id){



    const lista = this.getAlunos()

    .filter(


        aluno =>

        String(aluno.id) !== String(id)


    );



    this.saveAlunos(lista);



},







/*==================================================
        RELAÇÃO ALUNO / TURMA
==================================================*/


getAlunosDaTurma(turmaId){



    return this.getAlunos()

    .filter(



        aluno =>

        String(aluno.turmaId) === String(turmaId)



    );



},






contarAlunosTurma(turmaId){



    return this.getAlunosDaTurma(

        turmaId

    ).length;



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



    const lista = this.getAtendimentos();



    lista.push(atendimento);



    this.saveAtendimentos(lista);



},





getAtendimento(id){



    return this.getAtendimentos()

    .find(


        item =>

        String(item.id) === String(id)


    );



},





updateAtendimento(id,dados){



    const lista = this.getAtendimentos();



    const index = lista.findIndex(


        item =>

        String(item.id) === String(id)


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



    const lista = this.getAtendimentos()

    .filter(


        item =>

        String(item.id) !== String(id)


    );



    this.saveAtendimentos(lista);



},







/*==================================================
                EXPORTAÇÃO / IMPORTAÇÃO
        (preparação para botão no index)
==================================================*/


exportarDados(){


    return {


        turmas:this.getTurmas(),


        alunos:this.getAlunos(),


        atendimentos:this.getAtendimentos()



    };


},






importarDados(dados){



    if(dados.turmas){


        this.saveTurmas(

            dados.turmas

        );


    }




    if(dados.alunos){


        this.saveAlunos(

            dados.alunos

        );


    }




    if(dados.atendimentos){


        this.saveAtendimentos(

            dados.atendimentos

        );


    }



},







/*==================================================
                LIMPAR SISTEMA
==================================================*/


limparTudo(){



    localStorage.removeItem("turmas");


    localStorage.removeItem("alunos");


    localStorage.removeItem("atendimentos");



}



};

  
