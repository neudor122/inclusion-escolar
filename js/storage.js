/*==================================================
                STORAGE.JS
        Banco de dados local - Inclusão Escolar
==================================================*/


const Storage = {



/*==================================================
                CHAVES
==================================================*/


chaves:{


    TURMAS:
        "turmas",


    ALUNOS:
        "alunos",


    ATENDIMENTOS:
        "atendimentos",


    AVISOS:
        "avisos"



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


    const dados =

        localStorage.getItem(chave);



    return dados

        ?

        JSON.parse(dados)

        :

        [];



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



    const turmas =

        this.getTurmas();



    turmas.push(turma);



    this.salvar(

        this.chaves.TURMAS,

        turmas

    );


},








removeTurma(id){



    let turmas =

        this.getTurmas();



    turmas = turmas.filter(turma =>

        Number(turma.id) !== Number(id)

    );



    this.salvar(

        this.chaves.TURMAS,

        turmas

    );



},







getTurma(id){



    const turmas =

        this.getTurmas();



    return turmas.find(turma =>

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



    const alunos =

        this.getAlunos();



    alunos.push(aluno);



    this.salvar(

        this.chaves.ALUNOS,

        alunos

    );



},







updateAluno(alunoAtualizado){



    let alunos =

        this.getAlunos();



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



    let alunos =

        this.getAlunos();



    alunos = alunos.filter(aluno =>


        Number(aluno.id) !== Number(id)


    );



    this.salvar(

        this.chaves.ALUNOS,

        alunos

    );


},







getAluno(id){



    const alunos =

        this.getAlunos();



    return alunos.find(aluno =>


        Number(aluno.id) === Number(id)


    );


},







/*==================================================
        ALUNOS POR TURMA
==================================================*/


getAlunosDaTurma(idTurma){



    const alunos =

        this.getAlunos();



    return alunos.filter(aluno =>



        Number(aluno.turmaId) === Number(idTurma)



    );



},







contarAlunosTurma(idTurma){



    return this.getAlunosDaTurma(

        idTurma

    ).length;

/*==================================================
                ATENDIMENTOS
==================================================*/


getAtendimentos(){


    return this.buscar(

        this.chaves.ATENDIMENTOS

    );


},







addAtendimento(atendimento){



    const atendimentos =

        this.getAtendimentos();



    atendimentos.push(atendimento);



    this.salvar(

        this.chaves.ATENDIMENTOS,

        atendimentos

    );



},







removeAtendimento(id){



    let atendimentos =

        this.getAtendimentos();



    atendimentos = atendimentos.filter(item =>


        Number(item.id) !== Number(id)


    );



    this.salvar(

        this.chaves.ATENDIMENTOS,

        atendimentos

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





    const arquivo =

        JSON.stringify(

            dados,

            null,

            2

        );





    const blob =

        new Blob(

            [arquivo],

            {

                type:
                "application/json"

            }

        );





    const link =

        document.createElement(
            "a"
        );





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






    leitor.onload = function(e){



        try{



            const dados =

                JSON.parse(
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

                    dados.alunos

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



            alert(

                "Arquivo inválido."

            );



        }



    };





    leitor.readAsText(arquivo);



}







/*==================================================
                LIMPAR BANCO
==================================================*/


limparTudo(){



    localStorage.removeItem(

        this.chaves.TURMAS

    );



    localStorage.removeItem(

        this.chaves.ALUNOS

    );



    localStorage.removeItem(

        this.chaves.ATENDIMENTOS

    );



    localStorage.removeItem(

        this.chaves.AVISOS

    );



}




};





/*==================================================
        CRIAR BANCO VAZIO AUTOMÁTICO
==================================================*/


if(!localStorage.getItem(Storage.chaves.TURMAS)){


    localStorage.setItem(

        Storage.chaves.TURMAS,

        JSON.stringify([])

    );


}



if(!localStorage.getItem(Storage.chaves.ALUNOS)){


    localStorage.setItem(

        Storage.chaves.ALUNOS,

        JSON.stringify([])

    );


}



if(!localStorage.getItem(Storage.chaves.ATENDIMENTOS)){


    localStorage.setItem(

        Storage.chaves.ATENDIMENTOS,

        JSON.stringify([])

    );


}



if(!localStorage.getItem(Storage.chaves.AVISOS)){


    localStorage.setItem(

        Storage.chaves.AVISOS,

        JSON.stringify([])

    );


}

},
