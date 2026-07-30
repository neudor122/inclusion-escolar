/*==================================================
                ALUNO.JS
        Cadastro e edição de aluno
==================================================*/


let fotoAluno = "";

let alunoEditando = null;





document.addEventListener("DOMContentLoaded", () => {


    carregarTurmas();


    verificarEdicao();


    eventos();


});








/*==================================================
                EVENTOS
==================================================*/


function eventos() {


    const formulario =
        document.getElementById("formAluno");



    const foto =
        document.getElementById("fotoAluno");



    if (formulario) {


        formulario.addEventListener(
            "submit",
            salvarAluno
        );


    }




    if (foto) {


        foto.addEventListener(
            "change",
            carregarFoto
        );


    }


}









/*==================================================
            CARREGAR TURMAS
==================================================*/


function carregarTurmas() {


    const select =
        document.getElementById("turma");



    if (!select) {

        return;

    }




    const turmas =
        Storage.getTurmas();




    select.innerHTML = "";





    if (turmas.length === 0) {


        select.innerHTML = `

            <option value="">

                Nenhuma turma cadastrada

            </option>

        `;



        select.disabled = true;



        Utils.mensagem(
            "Cadastre uma turma antes de adicionar alunos."
        );


        return;


    }






    select.disabled = false;




    select.innerHTML = `

        <option value="">

            Selecione uma turma

        </option>

    `;






    turmas.forEach(turma => {



        select.innerHTML += `

            <option value="${turma.id}">

                ${turma.nome}

            </option>

        `;



    });



}









/*==================================================
                VERIFICAR EDIÇÃO
==================================================*/


function verificarEdicao() {


    const id =

        Number(
            localStorage.getItem("alunoEditando")
        );



    if (!id) {

        return;

    }



    alunoEditando = id;



    const alunos =
        Storage.getAlunos();



    const aluno =
        alunos.find(
            item => item.id === id
        );



    if (!aluno) {

        return;

    }




    document.getElementById("tituloFormulario")
        .textContent =
        "Editar Aluno";



    document.getElementById("descricaoFormulario")
        .textContent =
        "Atualize os dados do aluno.";



    document.getElementById("botaoSalvar")
        .textContent =
        "Salvar alterações";





    document.getElementById("nome")
        .value =
        aluno.nome || "";



    document.getElementById("dataNascimento")
        .value =
        aluno.dataNascimento || "";



    document.getElementById("responsavel")
        .value =
        aluno.responsavel || "";



    document.getElementById("necessidade")
        .value =
        aluno.necessidade || "";



    document.getElementById("observacao")
        .value =
        aluno.observacao || "";





    setTimeout(() => {


        document.getElementById("turma")
            .value =
            aluno.turmaId;



    }, 100);






    if (aluno.foto) {


        fotoAluno =
            aluno.foto;



        const preview =
            document.getElementById(
                "previewFoto"
            );



        if (preview) {

            preview.src =
                aluno.foto;

        }


    }


}









/*==================================================
                FOTO
==================================================*/


function carregarFoto(event) {


    const arquivo =
        event.target.files[0];



    if (!arquivo) {

        return;

    }





    const leitor =
        new FileReader();





    leitor.onload = function(e) {


        fotoAluno =
            e.target.result;




        const preview =
            document.getElementById(
                "previewFoto"
            );



        if (preview) {


            preview.src =
                fotoAluno;


        }


    };





    leitor.readAsDataURL(arquivo);



}









/*==================================================
            SALVAR ALUNO
==================================================*/


function salvarAluno(event) {


    event.preventDefault();






    const turmaId =

        document
        .getElementById("turma")
        .value;





    if (!turmaId) {


        Utils.mensagem(
            "Selecione uma turma."
        );


        return;


    }







    const dados = {



        nome:

            document
            .getElementById("nome")
            .value
            .trim(),




        dataNascimento:

            document
            .getElementById("dataNascimento")
            .value,





        turmaId,





        responsavel:

            document
            .getElementById("responsavel")
            .value
            .trim(),





        necessidade:

            document
            .getElementById("necessidade")
            .value,





        observacao:

            document
            .getElementById("observacao")
            .value,





        foto:

            fotoAluno




    };









    // EDIÇÃO

    if (alunoEditando) {



        Storage.updateAluno(

            alunoEditando,

            dados

        );



        Utils.mensagem(

            "Aluno atualizado com sucesso!"

        );



        localStorage.removeItem(
            "alunoEditando"
        );



    }



    // NOVO CADASTRO
    else {



        const aluno = {


            id:

                Utils.gerarId(),



            ...dados



        };



        Storage.addAluno(aluno);



        Utils.mensagem(

            "Aluno cadastrado com sucesso!"

        );


    }







    event.target.reset();



    fotoAluno = "";





    setTimeout(() => {


        window.location.href =
            "alunos.html";


    }, 500);



}