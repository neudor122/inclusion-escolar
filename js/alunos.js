/*==================================================
                ALUNOS.JS
        Gerenciamento de alunos
==================================================*/


let alunos = [];

let fotoBase64 = "";






document.addEventListener("DOMContentLoaded", () => {


    carregarAlunos();


    eventos();


});









/*==================================================
                EVENTOS
==================================================*/


function eventos() {


    const foto =
        document.getElementById(
            "fotoAluno"
        );



    if (foto) {


        foto.addEventListener(
            "change",
            carregarFoto
        );


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


        fotoBase64 =
            e.target.result;




        const preview =
            document.getElementById(
                "previewFoto"
            );



        if (preview) {


            preview.src =
                fotoBase64;


        }



    };






    leitor.readAsDataURL(arquivo);



}









/*==================================================
            CARREGAR ALUNOS
==================================================*/


function carregarAlunos() {



    alunos =
        Storage.getAlunos() || [];



    renderizarAlunos();



}









/*==================================================
            LISTAR ALUNOS
==================================================*/


function renderizarAlunos() {



    const lista =
        document.getElementById(
            "listaAlunos"
        );



    if (!lista) {

        return;

    }






    lista.innerHTML = "";






    const turmas =
        Storage.getTurmas() || [];









    if (alunos.length === 0) {



        lista.innerHTML = `


        <tr>


            <td colspan="5">


                Nenhum aluno cadastrado.


            </td>


        </tr>


        `;



        return;


    }









    alunos.forEach(aluno => {




        const turma = turmas.find(

            t =>
            Number(t.id) === Number(aluno.turmaId)

        );







        lista.innerHTML += `


        <tr>



            <td>


                ${
                    aluno.foto

                    ?

                    `

                    <img

                    src="${aluno.foto}"

                    width="50"

                    height="50"

                    style="
                    border-radius:50%;
                    object-fit:cover;
                    "

                    >

                    `

                    :

                    "📷"

                }


            </td>








            <td>

                ${aluno.nome || "-"}

            </td>








            <td>

                ${
                    turma

                    ?

                    turma.nome

                    :

                    "-"

                }

            </td>








            <td>

                ${
                    aluno.necessidade

                    ||

                    "-"

                }

            </td>









            <td>





                <button

                class="btn btn-primary"

                onclick="abrirFicha(${aluno.id})">


                    Ver ficha


                </button>









                <button

                class="btn btn-danger"

                onclick="removerAluno(${aluno.id})">


                    Excluir


                </button>







            </td>





        </tr>



        `;




    });




}









/*==================================================
                ABRIR FICHA
==================================================*/


function abrirFicha(id){



    localStorage.setItem(

        "alunoSelecionado",

        Number(id)

    );







    window.location.href =

        "ficha-aluno.html";



}









/*==================================================
                EXCLUIR
==================================================*/


function removerAluno(id){



    if(!confirm(

        "Deseja excluir este aluno?"

    )){


        return;


    }







    Storage.removeAluno(

        Number(id)

    );





    carregarAlunos();



}
