/*==================================================
            FICHA DO ALUNO
==================================================*/


document.addEventListener("DOMContentLoaded", function() {

    carregarFicha();

});







function carregarFicha() {


    const id = Number(
        localStorage.getItem("alunoSelecionado")
    );



    if (!id) {


        alert("Nenhum aluno selecionado.");

        window.location.href =
            "alunos.html";

        return;

    }




    const alunos =
        Storage.getAlunos();





    const aluno =
        alunos.find(function(item) {


            return item.id === id;


        });





    if (!aluno) {


        alert("Aluno não encontrado.");

        window.location.href =
            "alunos.html";

        return;

    }






    // Buscar nome da turma

    const turmas =
        Storage.getTurmas();



    const turmaAluno =
        turmas.find(function(turma) {


            return turma.id === aluno.turmaId;


        });









    const nome =
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



    const dataNascimento =
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









    if (nome) {


        nome.textContent =
            aluno.nome || "-";


    }







    if (turma) {


        turma.textContent =
            "Turma: " +
            (
                turmaAluno ?
                turmaAluno.nome :
                "-"
            );


    }







    if (necessidade) {


        necessidade.textContent =
            "Necessidade: " +
            (
                aluno.necessidade ||
                "-"
            );


    }







    if (dataNascimento) {



        dataNascimento.textContent =

            aluno.dataNascimento

            ?

            Utils.formatarData(
                aluno.dataNascimento
            )

        :

        "-";



    }








    if (idade) {



        idade.textContent =

            aluno.dataNascimento

            ?

            Utils.calcularIdade(
                aluno.dataNascimento
            ) +
            " anos"

        :

        "-";



    }








    if (responsavel) {



        responsavel.textContent =
            aluno.responsavel || "-";



    }








    if (observacao) {



        observacao.textContent =
            aluno.observacao || "-";



    }








    if (foto && aluno.foto) {



        foto.src =
            aluno.foto;



    }






    carregarHistorico(id);



}









/*==================================================
        HISTÓRICO DE ATENDIMENTOS
==================================================*/


function carregarHistorico(id) {



    const tabela =
        document.getElementById(
            "historicoAtendimentos"
        );



    if (!tabela) {

        return;

    }







    const atendimentos =
        Storage.getAtendimentos();






    const registros =
        atendimentos.filter(function(item) {



            return item.alunoId === id;



        });








    tabela.innerHTML = "";







    if (registros.length === 0) {



        tabela.innerHTML = `

        <tr>

            <td colspan="3">

                Nenhum atendimento registrado.

            </td>

        </tr>

        `;


        return;


    }









    registros.forEach(function(item) {



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


function voltarAlunos() {


    window.location.href =
        "alunos.html";


}









/*==================================================
                EDITAR ALUNO
==================================================*/


function editarAluno() {



    const id =
        Number(
            localStorage.getItem(
                "alunoSelecionado"
            )
        );





    if (!id) {


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