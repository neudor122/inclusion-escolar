/*==================================================
                APP.JS
        Dashboard - Inclusão Escolar
==================================================*/


document.addEventListener("DOMContentLoaded", () => {


    carregarDashboard();


});






/*==================================================
            CARREGAR DASHBOARD
==================================================*/


function carregarDashboard(){


    atualizarCards();


    carregarUltimosAtendimentos();


}







/*==================================================
            ATUALIZAR CARDS
==================================================*/


function atualizarCards(){



    const turmas =
        Storage.getTurmas();



    const alunos =
        Storage.getAlunos();



    const atendimentos =
        Storage.getAtendimentos();






    const totalTurmas =
        document.getElementById(
            "totalTurmas"
        );



    const totalAlunos =
        document.getElementById(
            "totalAlunos"
        );



    const totalAtendimentos =
        document.getElementById(
            "totalAtendimentos"
        );








    if(totalTurmas){


        totalTurmas.textContent =
            turmas.length;


    }







    if(totalAlunos){


        totalAlunos.textContent =
            alunos.length;


    }







    if(totalAtendimentos){


        totalAtendimentos.textContent =
            atendimentos.length;


    }



}









/*==================================================
        ÚLTIMOS ATENDIMENTOS
==================================================*/


function carregarUltimosAtendimentos(){



    const container =
        document.getElementById(
            "ultimosAtendimentos"
        );



    if(!container){

        return;

    }







    const atendimentos =
        Storage.getAtendimentos();





    const alunos =
        Storage.getAlunos();








    if(atendimentos.length === 0){



        container.innerHTML = `


        <p class="vazio">

            Nenhum atendimento registrado.

        </p>


        `;


        return;


    }







    atendimentos.sort((a,b)=>{


        return new Date(b.data)
        -
        new Date(a.data);


    });







    const lista =
        atendimentos.slice(0,5);







    container.innerHTML = "";







    lista.forEach(atendimento=>{





        const aluno =

            alunos.find(item =>

                Number(item.id)
                ===
                Number(atendimento.alunoId)

            );








        container.innerHTML += `



        <div class="painel">


            <h3>


                ${
                    aluno
                    ?
                    aluno.nome
                    :
                    "Aluno"

                }


            </h3>



            <p>


                📅

                ${
                    Utils.formatarData(
                        atendimento.data
                    )

                }


            </p>



            <p>

                ${
                    atendimento.descricao
                    ||
                    "-"
                }


            </p>


        </div>



        `;



    });



}
