```javascript
/*==================================================
            FICHA DO ALUNO
==================================================*/


document.addEventListener("DOMContentLoaded", () => {


    carregarFicha();


});









function carregarFicha() {



    const id =

        Number(

            localStorage.getItem(

                "alunoSelecionado"

            )

        );





    if (!id) {



        alert(

            "Nenhum aluno selecionado."

        );



        window.location.href =

            "alunos.html";



        return;


    }









    const alunos =

        Storage.getAlunos() || [];








    const aluno =

        alumnosEncontrar(alunos, id);







    if (!aluno) {



        alert(

            "Aluno não encontrado."

        );



        window.location.href =

            "alunos.html";



        return;


    }









    const turmas =

        Storage.getTurmas() || [];







    const turmaAluno =

        turmas.find(

            turma =>

            Number(turma.id) ===

            Number(aluno.turmaId)

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









    const nascimento =

        aluno.dataNascimento ||

        aluno.nascimento ||

        "";







    document.getElementById("dataNascimento")

        .textContent =


        nascimento

        ?

        Utils.formatarData(

            nascimento

        )

        :

        "-";









    document.getElementById("idadeAluno")

        .textContent =


        nascimento

        ?

        Utils.calcularIdade(

            nascimento

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







    if (

        foto &&

        aluno.foto

    ) {



        foto.src =

            aluno.foto;



    }









    carregarHistorico(id);



}









/*==================================================
        BUSCAR ALUNO
==================================================*/


function alumnosEncontrar(lista, id){



    return lista.find(

        aluno =>

        Number(aluno.id) === Number(id)

    );



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

        Storage.getAtendimentos() || [];








    const registros =

        atendimentos.filter(

            item =>

            Number(item.alunoId) === Number(id)

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


                ${

                    Utils.formatarData(

                        item.data

                    )

                }


            </td>





            <td>


                ${

                    item.profissional ||

                    "-"

                }


            </td>





            <td>


                ${

                    item.descricao ||

                    "-"

                }


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
```
