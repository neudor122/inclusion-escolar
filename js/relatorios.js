/*==================================================
                RELATORIOS.JS
        Relatórios do sistema
==================================================*/


document.addEventListener("DOMContentLoaded", () => {

    carregarRelatorios();

});



/*==================================================
            CARREGAR RELATÓRIOS
==================================================*/


function carregarRelatorios() {


    const turmas =
        Storage.getTurmas();


    const alunos =
        Storage.getAlunos();


    const atendimentos =
        Storage.getAtendimentos();




    document.getElementById("totalTurmas")
        .textContent =
        turmas.length;



    document.getElementById("totalAlunos")
        .textContent =
        alunos.length;



    document.getElementById("totalAtendimentos")
        .textContent =
        atendimentos.length;



    gerarRelatorioNecessidades(alunos);



    gerarRelatorioTurmas(
        turmas,
        alunos
    );


}






/*==================================================
        ALUNOS POR NECESSIDADE
==================================================*/


function gerarRelatorioNecessidades(alunos) {


    const container =
        document.getElementById(
            "relatorioNecessidades"
        );



    container.innerHTML = "";



    if (alunos.length === 0) {


        container.innerHTML = `

            <p class="vazio">

                Nenhum aluno cadastrado.

            </p>

        `;


        return;

    }




    const grupos = {};



    alunos.forEach(aluno => {


        const necessidade =
            aluno.necessidade || "Não informado";



        if (!grupos[necessidade]) {


            grupos[necessidade] = 0;


        }


        grupos[necessidade]++;



    });





    Object.keys(grupos).forEach(item => {


        container.innerHTML += `


            <p>

                <strong>
                    ${item}
                </strong>

                :
                
                ${grupos[item]} aluno(s)

            </p>


        `;


    });



}








/*==================================================
            ALUNOS POR TURMA
==================================================*/


function gerarRelatorioTurmas(
    turmas,
    alunos
) {


    const container =
        document.getElementById(
            "relatorioTurmas"
        );



    container.innerHTML = "";



    if (turmas.length === 0) {


        container.innerHTML = `

            <p class="vazio">

                Nenhuma turma cadastrada.

            </p>

        `;


        return;

    }






    turmas.forEach(turma => {



        const quantidade =

            alunos.filter(

                aluno =>

                aluno.turmaId == turma.id

            ).length;





        container.innerHTML += `


            <p>


                <strong>

                    ${turma.nome}

                </strong>


                :

                ${quantidade}
                aluno(s)


            </p>


        `;



    });



}