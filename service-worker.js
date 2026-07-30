/*==================================================
        SERVICE WORKER
        Inclusão Escolar PWA
==================================================*/


const CACHE_NAME = "inclusao-escolar-v2";



const arquivosCache = [



    "./",

    "./index.html",

    "./manifest.json",



    /* CSS */

    "./css/style.css",

    "./css/responsive.css",



    /* JS PRINCIPAIS */

    "./js/storage.js",

    "./js/utils.js",

    "./js/ui.js",

    "./js/app.js",



    /* TURMAS */

    "./pages/turmas.html",

    "./js/turmas.js",



    /* ALUNOS */

    "./pages/alunos.html",

    "./pages/aluno.html",

    "./js/alunos.js",

    "./js/aluno.js",



    /* ATENDIMENTOS */

    "./pages/atendimento.html",

    "./js/atendimento.js",



    /* RELATÓRIOS */

    "./pages/relatorios.html",

    "./js/relatorios.js"



];







/*==================================================
                INSTALAÇÃO
==================================================*/


self.addEventListener(
    "install",
    event => {


        event.waitUntil(


            caches.open(CACHE_NAME)

            .then(cache => {


                return cache.addAll(
                    arquivosCache
                );


            })


        );


        self.skipWaiting();


    }

);









/*==================================================
                ATIVAÇÃO
==================================================*/


self.addEventListener(
    "activate",
    event => {


        event.waitUntil(


            caches.keys()

            .then(chaves => {


                return Promise.all(


                    chaves.map(chave => {


                        if (
                            chave !== CACHE_NAME
                        ) {


                            return caches.delete(
                                chave
                            );


                        }


                    })


                );


            })


        );


        self.clients.claim();


    }

);









/*==================================================
                FETCH
==================================================*/


self.addEventListener(
    "fetch",
    event => {



        event.respondWith(


            caches.match(
                event.request
            )

            .then(resposta => {


                return resposta ||

                    fetch(
                        event.request
                    );


            })


        );



    }

);