/*==================================================
            RELATÓRIOS.JS
      Painel de informações do sistema
==================================================*/


document.addEventListener("DOMContentLoaded", () => {


    carregarResumo();


    carregarNecessidades();


    carregarTurmas();



});





/*==================================================
                RESUMO
==================================================*/


function carregarResumo(){


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
        ALUNOS POR NECESSIDADE
==================================================*/


function carregarNecessidades(){


    const div =
        document.getElementById(
            "relatorioNecessidades"
        );



    if(!div){

        return;

    }





    const alunos =
        Storage.getAlunos();





    if(alunos.length === 0){


        div.innerHTML = `

        <p class="vazio">

        Nenhum aluno cadastrado.

        </p>

        `;


        return;

    }






    let lista = {};





    alunos.forEach(aluno => {



        let necessidade =
            aluno.necessidade ||
            "Sem necessidade informada";



        if(!lista[necessidade]){


            lista[necessidade] = 0;


        }



        lista[necessidade]++;



    });






    div.innerHTML = "";






    Object.keys(lista).forEach(item => {



        div.innerHTML += `


        <p>

        🔹 ${item}: 
        <strong>${lista[item]}</strong>

        aluno(s)

        </p>


        `;


    });




}









/*==================================================
            ALUNOS POR TURMA
==================================================*/


function carregarTurmas(){



    const div =
        document.getElementById(
            "relatorioTurmas"
        );



    if(!div){

        return;

    }





    const turmas =
        Storage.getTurmas();



    const alunos =
        Storage.getAlunos();






    if(turmas.length === 0){


        div.innerHTML = `


        <p class="vazio">

        Nenhuma turma cadastrada.

        </p>


        `;


        return;


    }







    div.innerHTML = "";






    turmas.forEach(turma => {



        const quantidade =

            alunos.filter(aluno =>

                aluno.turmaId == turma.id

            ).length;







        div.innerHTML += `


        <p>


        📚 ${turma.nome}

        -

        <strong>

        ${quantidade}

        </strong>

        aluno(s)


        </p>


        `;




    });





}
