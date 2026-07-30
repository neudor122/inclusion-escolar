/*==================================================
                TURMAS.JS
        Gerenciamento de Turmas
==================================================*/


let turmas = [];



document.addEventListener("DOMContentLoaded", () => {


    carregarTurmas();

    configurarEventos();


});





/*==================================================
                EVENTOS
==================================================*/


function configurarEventos() {


    const btnNovaTurma =
        document.getElementById("btnNovaTurma");



    const btnSalvar =
        document.getElementById("salvarTurma");



    const pesquisa =
        document.getElementById("pesquisa");



    const modal =
        document.getElementById("modalTurma");





    if (btnNovaTurma) {

        btnNovaTurma.onclick =
            abrirModal;

    }




    if (btnSalvar) {

        btnSalvar.onclick =
            salvarTurma;

    }





    if (pesquisa) {

        pesquisa.addEventListener(
            "input",
            pesquisarTurma
        );

    }




    if (modal) {

        modal.addEventListener(
            "click",
            fecharModal
        );

    }


}









/*==================================================
                MODAL
==================================================*/


function abrirModal() {


    const modal =
        document.getElementById("modalTurma");



    if (modal) {

        modal.style.display = "flex";

    }


}





function fecharModal(event) {



    if (event.target.id === "modalTurma") {


        event.target.style.display =
            "none";


    }



}






function fechar() {


    const modal =
        document.getElementById("modalTurma");



    if (modal) {

        modal.style.display =
            "none";

    }



    limparFormulario();


}









/*==================================================
            CARREGAR TURMAS
==================================================*/


function carregarTurmas() {


    turmas =
        Storage.getTurmas();



    renderizarTurmas(
        turmas
    );


}









/*==================================================
            SALVAR TURMA
==================================================*/


function salvarTurma() {



    const nome =
        document
        .getElementById("nomeTurma")
        .value
        .trim();



    const sala =
        document
        .getElementById("salaTurma")
        .value
        .trim();



    const professor =
        document
        .getElementById("professorTurma")
        .value
        .trim();



    const turno =
        document
        .getElementById("turnoTurma")
        .value;







    if (!nome) {


        Utils.mensagem(
            "Informe o nome da turma."
        );


        return;


    }







    const turma = {


        id:

            Utils.gerarId(),



        nome,


        sala,


        professor,


        turno,



        dataCriacao:

            new Date().toISOString()



    };






    Storage.addTurma(turma);





    carregarTurmas();



    fechar();





    Utils.mensagem(

        "Turma criada com sucesso!"

    );



}









/*==================================================
            MOSTRAR TURMAS
==================================================*/


function renderizarTurmas(lista) {



    const container =
        document.getElementById(
            "listaTurmas"
        );



    if (!container) {

        return;

    }






    container.innerHTML = "";





    const alunos =
        Storage.getAlunos();







    if (lista.length === 0) {



        container.innerHTML = `


        <div class="painel">


            <p class="vazio">

                Nenhuma turma cadastrada.

            </p>


        </div>



        `;



        return;


    }









    lista.forEach(turma => {



        const quantidade =

            alunos.filter(aluno =>

                aluno.turmaId === turma.id

            ).length;







        container.innerHTML += `



        <div class="card">



            <h2>

                ${turma.nome}

            </h2>



            <p>

                🏫 Sala:
                ${turma.sala || "-"}

            </p>



            <p>

                👨‍🏫 Professor:
                ${turma.professor || "-"}

            </p>



            <p>

                🌞 Turno:
                ${turma.turno}

            </p>



            <p>

                👨‍🎓
                ${quantidade}
                aluno(s)

            </p>




            <button

            class="btn btn-primary"

            onclick="abrirTurma(${turma.id})">


            Ver alunos


            </button>





            <button

            class="btn btn-danger"

            onclick="removerTurma(${turma.id})">


            Excluir


            </button>



        </div>



        `;



    });



}









/*==================================================
                EXCLUIR
==================================================*/


function removerTurma(id) {



    if (!confirm(

            "Deseja excluir esta turma?"

        )) {


        return;


    }





    Storage.removeTurma(id);



    carregarTurmas();



}









/*==================================================
                PESQUISA
==================================================*/


function pesquisarTurma() {



    const texto =

        document
        .getElementById("pesquisa")
        .value
        .toLowerCase();







    const resultado =

        turmas.filter(turma =>



            turma.nome
            .toLowerCase()
            .includes(texto)



        );






    renderizarTurmas(
        resultado
    );



}









/*==================================================
            ABRIR TURMA
==================================================*/


function abrirTurma(id) {



    localStorage.setItem(

        "turmaSelecionada",

        id

    );





    window.location.href =

        "alunos.html";



}









/*==================================================
            LIMPAR FORMULÁRIO
==================================================*/


function limparFormulario() {



    const campos = [


        "nomeTurma",

        "salaTurma",

        "professorTurma"



    ];





    campos.forEach(id => {


        const campo =
            document.getElementById(id);



        if (campo) {

            campo.value = "";

        }


    });






    const turno =
        document.getElementById(
            "turnoTurma"
        );



    if (turno) {

        turno.selectedIndex = 0;

    }



}