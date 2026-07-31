```javascript
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
        Storage.getTurmas() || [];





    select.innerHTML = "";






    if (turmas.length === 0) {



        select.innerHTML = `

        <option value="">

            Nenhuma turma cadastrada

        </option>

        `;



        select.disabled = true;



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


    const id = Number(

        localStorage.getItem(
            "alunoEditando"
        )

    );



    if (!id) {

        return;

    }






    alunoEditando = id;







    const aluno =
        Storage.getAluno(id);





    if (!aluno) {

        return;

    }








    const titulo =
        document.getElementById(
            "tituloFormulario"
        );



    if(titulo){


        titulo.textContent =
            "Editar aluno";


    }









    const descricao =
        document.getElementById(
            "descricaoFormulario"
        );



    if(descricao){


        descricao.textContent =
            "Atualize os dados do aluno.";


    }









    document.getElementById("nome").value =

        aluno.nome || "";





    document.getElementById("dataNascimento").value =

        aluno.dataNascimento ||

        aluno.nascimento ||

        "";






    document.getElementById("responsavel").value =

        aluno.responsavel || "";






    document.getElementById("necessidade").value =

        aluno.necessidade || "";






    document.getElementById("observacao").value =

        aluno.observacao || "";









    setTimeout(()=>{


        const turma =
            document.getElementById(
                "turma"
            );



        if(turma){


            turma.value =

                Number(aluno.turmaId);


        }



    },200);









    if(aluno.foto){



        fotoAluno =

            aluno.foto;





        const preview =

            document.getElementById(
                "previewFoto"
            );



        if(preview){


            preview.src =

                aluno.foto;


        }


    }



}









/*==================================================
                SALVAR ALUNO
==================================================*/


function salvarAluno(event) {


    event.preventDefault();






    const nome =

        document
        .getElementById("nome")
        .value
        .trim();







    const dataNascimento =

        document
        .getElementById("dataNascimento")
        .value;







    const responsavel =

        document
        .getElementById("responsavel")
        .value
        .trim();







    const necessidade =

        document
        .getElementById("necessidade")
        .value
        .trim();







    const observacao =

        document
        .getElementById("observacao")
        .value
        .trim();








    const turmaId =

        Number(

            document
            .getElementById("turma")
            .value

        );








    if(!nome){


        Utils.mensagem(

            "Informe o nome do aluno."

        );


        return;

    }









    const aluno = {




        id:


            alunoEditando ||


            Utils.gerarId(),





        nome,





        dataNascimento,





        responsavel,





        necessidade,





        observacao,





        turmaId,





        foto:

            fotoAluno,





        dataCadastro:


            Utils.dataAtual
            ?

            Utils.dataAtual()

            :

            new Date()
            .toISOString()
            .split("T")[0]



    };









    if(alunoEditando){



        Storage.updateAluno(aluno);





        Utils.mensagem(

            "Aluno atualizado com sucesso!"

        );



    }else{



        Storage.addAluno(aluno);





        Utils.mensagem(

            "Aluno cadastrado com sucesso!"

        );



    }









    localStorage.removeItem(

        "alunoEditando"

    );








    setTimeout(()=>{


        window.location.href =

            "alunos.html";



    },500);



}









/*==================================================
        HISTÓRICO DE ATENDIMENTOS
==================================================*/


function carregarHistorico(id) {


    const tabela =

        document.getElementById(

            "historicoAtendimentos"

        );



    if (!tabela) {

        return;

    }







    const atendimentos =

        Storage.getAtendimentos() || [];







    const registros =

        atendimentos.filter(item => {


            return Number(item.alunoId)

                ===

                Number(id);


        });







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
                    item.profissional || "-"

                }


            </td>





            <td>


                ${
                    item.descricao || "-"

                }


            </td>



        </tr>


        `;



    });



}









/*==================================================
                EDITAR ALUNO
==================================================*/


function editarAluno() {



    const id = Number(

        localStorage.getItem(

            "alunoSelecionado"

        )

    );





    if (!id) {



        Utils.mensagem(

            "Não foi possível editar este aluno."

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









/*==================================================
                VOLTAR
==================================================*/


function voltarAlunos(){


    window.location.href =

        "alunos.html";


}









/*==================================================
                CARREGAR FOTO
==================================================*/


function carregarFoto(event){


    const arquivo =

        event.target.files[0];



    if(!arquivo){

        return;

    }







    const leitor =

        new FileReader();







    leitor.onload = function(e){



        fotoAluno =

            e.target.result;







        const preview =

            document.getElementById(

                "previewFoto"

            );





        if(preview){



            preview.src =

                fotoAluno;



        }



    };







    leitor.readAsDataURL(

        arquivo

    );



}
```
