/*==================================================
            FICHA DO ALUNO
==================================================*/


document.addEventListener("DOMContentLoaded", () => {

    carregarFicha();

});






function carregarFicha() {


    const id =
        Number(
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
        alunos.find(
            item => item.id == id
        );





    if (!aluno) {


        alert("Aluno não encontrado.");

        window.location.href =
            "alunos.html";

        return;

    }







    const turmas =
        Storage.getTurmas();





    const turmaAluno =
        turmas.find(
            turma =>
            turma.id == aluno.turmaId
        );









    document.getElementById("nomeAluno")
        .textContent =
        aluno.nome || "-";







    document.getElementById("turmaAluno")
        .textContent =
        "Turma: " +
        (
            turmaAluno
            ?
            turmaAluno.nome
            :
            "-"
        );







    document.getElementById("necessidadeAluno")
        .textContent =
        "Necessidade: " +
        (
            aluno.necessidade
            ||
            "-"
        );








    document.getElementById("dataNascimento")
        .textContent =
        aluno.dataNascimento
        ?
        Utils.formatarData(
            aluno.dataNascimento
        )
        :
        "-";








    document.getElementById("idadeAluno")
        .textContent =
        aluno.dataNascimento
        ?
        Utils.calcularIdade(
            aluno.dataNascimento
        )
        +
        " anos"
        :
        "-";








    document.getElementById("responsavelAluno")
        .textContent =
        aluno.responsavel
        ||
        "-";








    document.getElementById("observacaoAluno")
        .textContent =
        aluno.observacao
        ||
        "-";









    const foto =
        document.getElementById(
            "fotoAluno"
        );



    if(foto && aluno.foto){


        foto.src =
            aluno.foto;


    }






    carregarHistorico(id);



}









/*==================================================
        HISTÓRICO
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
        atendimentos.filter(
            item =>
            item.alunoId == id
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

                ${Utils.formatarData(item.data)}

            </td>


            <td>

                ${item.profissional || "-"}

            </td>


            <td>

                ${item.descricao || "-"}

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
                EDITAR
==================================================*/


function editarAluno(){



    const id =
        Number(
            localStorage.getItem(
                "alunoSelecionado"
            )
        );



    if(!id){

        alert(
            "Aluno inválido."
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
