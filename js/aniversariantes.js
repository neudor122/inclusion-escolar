/*==================================================
        ANIVERSARIANTES DO MÊS
        Inclusão Escolar
==================================================*/


document.addEventListener(
    "DOMContentLoaded",
    () => {

        carregarAniversariantes();

    }
);







/*==================================================
        CARREGAR ANIVERSARIANTES
==================================================*/


function carregarAniversariantes(){



    const area =
        document.getElementById(
            "aniversariantes"
        );



    if(!area){

        return;

    }





    const alunos =
        Storage.getAlunos();



    const turmas =
        Storage.getTurmas();





    const hoje =
        new Date();



    const mesAtual =
        hoje.getMonth();






    const aniversariantes =

        alunos.filter(aluno => {



            if(!aluno.dataNascimento){

                return false;

            }



            const nascimento =
                new Date(
                    aluno.dataNascimento
                );



            return (

                nascimento.getMonth()
                ===
                mesAtual

            );


        });







    area.innerHTML = "";








    if(aniversariantes.length === 0){



        area.innerHTML = `


        <p class="vazio">

            Nenhum aniversariante neste mês.

        </p>


        `;



        return;


    }







    aniversariantes.forEach(aluno => {



        const turma =

            turmas.find(t =>

                Number(t.id)
                ===
                Number(aluno.turmaId)

            );








        area.innerHTML += `


        <div class="aniversariante-card">



            <img

            src="${
                aluno.foto
                ||
                'assets/avatar.png'
            }"


            alt="Foto do aluno">





            <div class="aniversariante-info">



                <h3>

                    ${aluno.nome || "-"}

                </h3>




                <p>

                    ${
                        turma
                        ?
                        turma.nome
                        :
                        "-"
                    }

                </p>



            </div>



        </div>


        `;




    });



}
