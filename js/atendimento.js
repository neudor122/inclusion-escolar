/*==================================================
              ATENDIMENTO.JS
        Gerenciamento de atendimentos
==================================================*/


let atendimentos = [];





document.addEventListener("DOMContentLoaded", () => {


    carregarAlunos();


    carregarAtendimentos();


    eventos();


});









/*==================================================
                EVENTOS
==================================================*/


function eventos() {


    const formulario =
        document.getElementById(
            "formAtendimento"
        );



    if (formulario) {


        formulario.addEventListener(
            "submit",
            salvarAtendimento
        );


    }



}









/*==================================================
            CARREGAR ALUNOS
==================================================*/


function carregarAlunos() {



    const select =
        document.getElementById(
            "aluno"
        );



    if (!select) {

        return;

    }






    const alunos =
        Storage.getAlunos();





    select.innerHTML = "";







    if (alunos.length === 0) {



        select.innerHTML = `


        <option value="">


            Nenhum aluno cadastrado


        </option>



        `;



        select.disabled = true;



        return;


    }









    select.disabled = false;






    select.innerHTML = `


    <option value="">


        Selecione o aluno


    </option>



    `;











    alunos.forEach(aluno => {



        select.innerHTML += `


        <option value="${aluno.id}">


            ${aluno.nome}


        </option>



        `;



    });



}












/*==================================================
            SALVAR ATENDIMENTO
==================================================*/


function salvarAtendimento(event) {



    event.preventDefault();







    const alunoId = Number(

        document
        .getElementById("aluno")
        .value

    );







    if (!alunoId) {



        Utils.mensagem(

            "Selecione um aluno."

        );


        return;


    }









    const atendimento = {




        id:

            Utils.gerarId(),







        alunoId,







        data:

            document
            .getElementById("data")
            .value,








        profissional:

            document
            .getElementById("profissional")
            .value
            .trim(),








        descricao:

            document
            .getElementById("descricao")
            .value
            .trim(),








        criadoEm:

            new Date()
            .toISOString()




    };









    Storage.addAtendimento(

        atendimento

    );









    Utils.mensagem(

        "Atendimento registrado com sucesso!"

    );









    event.target.reset();







    carregarAtendimentos();





}












/*==================================================
        CARREGAR ATENDIMENTOS
==================================================*/


function carregarAtendimentos() {



    atendimentos =

        Storage.getAtendimentos();





    renderizarAtendimentos();





}













/*==================================================
            RENDERIZAR
==================================================*/


function renderizarAtendimentos() {



    const lista =

        document.getElementById(
            "listaAtendimentos"
        );



    if (!lista) {

        return;

    }







    lista.innerHTML = "";







    const alunos =

        Storage.getAlunos();








    if (atendimentos.length === 0) {



        lista.innerHTML = `


        <tr>


            <td colspan="5">


                Nenhum atendimento registrado.


            </td>



        </tr>



        `;



        return;


    }













    atendimentos.forEach(item => {





        const aluno =

            alunos.find(

                a =>

                a.id === item.alunoId

            );









        lista.innerHTML += `



        <tr>



            <td>

                ${
                    aluno

                    ?

                    aluno.nome

                    :

                    "Aluno removido"

                }

            </td>






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








            <td>



                <button

                class="btn btn-danger"

                onclick="removerAtendimento(${item.id})">



                    Excluir



                </button>



            </td>






        </tr>



        `;



    });





}













/*==================================================
                EXCLUIR
==================================================*/


function removerAtendimento(id) {



    if (!confirm(

            "Deseja excluir este atendimento?"

        )) {


        return;


    }







    Storage.removeAtendimento(id);





    carregarAtendimentos();




}