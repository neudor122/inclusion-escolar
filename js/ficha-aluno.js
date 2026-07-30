/*==================================================
            FICHA DO ALUNO.JS
        Visualização completa do aluno
==================================================*/


document.addEventListener("DOMContentLoaded", () => {

    carregarFicha();

});






/*==================================================
            CARREGAR FICHA
==================================================*/


function carregarFicha() {


    const id = Number(
        localStorage.getItem("alunoSelecionado")
    );



    if (!id) {


        alert("Nenhum aluno selecionado.");

        window.location.href = "alunos.html";

        return;

    }







    const alunos = Storage.getAlunos();




    const aluno = alunos.find(item =>

        Number(item.id) === id

    );






    if (!aluno) {


        alert("Aluno não encontrado.");

        window.location.href = "alunos.html";

        return;

    }








    const turmas = Storage.getTurmas();





    const turmaAluno = turmas.find(turma =>

        Number(turma.id) === Number(aluno.turmaId)

    );







    preencherDados(

        aluno,

        turmaAluno

    );





    carregarHistorico(id);



}









/*==================================================
            PREENCHER DADOS
==================================================*/


function preencherDados(aluno, turmaAluno) {



    const nomeAluno =
        document.getElementById(
            "nomeAluno"
        );



    const turma =
        document.getElementById(
            "turmaAluno"
        );



    const necessidade =
        document.getElementById(
            "necessidadeAluno"
        );



    const data =
        document.getElementById(
            "dataNascimento"
        );



    const idade =
        document.getElementById(
            "idadeAluno"
        );



    const responsavel =
        document.getElementById(
            "responsavelAluno"
        );



    const observacao =
        document.getElementById(
            "observacaoAluno"
        );



    const foto =
        document.getElementById(
            "fotoAluno"
        );







    if(nomeAluno){

        nomeAluno.textContent =
            aluno.nome || "-";

    }







    if(turma){


        turma.textContent =

            "Turma: " +

            (

                turmaAluno

                ?

                turmaAluno.nome

                :

                "Sem turma"

            );


    }







    if(necessidade){


        necessidade.textContent =

            "Necessidade: " +

            (

                aluno.necessidade

                ?

                aluno.necessidade

                :

                "-"

            );


    }







    if(data){


        data.textContent =

            aluno.dataNascimento

            ?

            Utils.formatarData(
                aluno.dataNascimento
            )

            :

            "-";


    }







    if(idade){


        idade.textContent =

            aluno.dataNascimento

            ?

            Utils.calcularIdade(
                aluno.dataNascimento
            )
            +
            " anos"

            :

            "-";


    }







    if(responsavel){


        responsavel.textContent =

            aluno.responsavel || "-";


    }







    if(observacao){


        observacao.textContent =

            aluno.observacao || "-";


    }







    if(foto){


        foto.src =

            aluno.foto

            ?

            aluno.foto

            :

            "assets/avatar.png";


    }



}









/*==================================================
        HISTÓRICO DE ATENDIMENTOS
==================================================*/


function carregarHistorico(id){



    const tabela =

        document.getElementById(
            "historicoAtendimentos"
        );



    if(!tabela){

        return;

    }







    const atendimentos =

        Storage.getAtendimentos();







    const registros =

        atendimentos.filter(item =>

            Number(item.alunoId) === Number(id)

        );








    tabela.innerHTML = "";







    if(registros.length === 0){


        tabela.innerHTML = `

        <tr>

            <td colspan="3">

                Nenhum atendimento registrado.

            </td>

        </tr>

        `;


        return;


    }








    registros.forEach(item => {



        tabela.innerHTML += `


        <tr>


            <td>

                ${
                    Utils.formatarData(
                        item.data
                    )
                }

            </td>



            <td>

                ${
                    item.profissional || "-"
                }

            </td>



            <td>

                ${
                    item.descricao || "-"
                }

            </td>



        </tr>


        `;



    });



}









/*==================================================
                VOLTAR
==================================================*/


function voltarAlunos(){


    window.location.href =

        "alunos.html";


}









/*==================================================
                EDITAR ALUNO
==================================================*/


function editarAluno(){



    const id = Number(

        localStorage.getItem(
            "alunoSelecionado"
        )

    );





    if(!id){


        alert(
            "Não foi possível editar este aluno."
        );


        return;


    }







    localStorage.setItem(

        "alunoEditando",

        id

    );







    window.location.href =

        "aluno.html";



}
