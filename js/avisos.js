/*==================================================
                AVISOS.JS
        Quadro de avisos editável
==================================================*/


document.addEventListener(
    "DOMContentLoaded",
    () => {

        carregarAviso();

    }
);





/*==================================================
            CARREGAR AVISO
==================================================*/


function carregarAviso(){


    const quadro =
        document.getElementById(
            "quadroAvisos"
        );



    if(!quadro){

        return;

    }




    const aviso =
        localStorage.getItem(
            "avisos"
        );




    if(aviso){


        quadro.innerHTML =
            aviso.replace(
                /\n/g,
                "<br>"
            );


    }else{


        quadro.innerHTML =

        `
        Nenhum aviso cadastrado.
        `;


    }



}








/*==================================================
            EDITAR AVISO
==================================================*/


function editarAviso(){



    const atual =

        localStorage.getItem(
            "avisos"
        )
        ||
        "";






    const novoAviso =

        prompt(

            "Digite o novo aviso:",

            atual

        );







    if(novoAviso === null){

        return;

    }






    localStorage.setItem(

        "avisos",

        novoAviso

    );






    carregarAviso();





    Utils.mensagem(

        "Aviso atualizado com sucesso!"

    );



}
