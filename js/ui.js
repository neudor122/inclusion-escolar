/*==================================================
                    UI.JS
Componentes reutilizáveis da interface
==================================================*/

const UI = {

    /*=========================================
                TOAST
    =========================================*/

    toast(mensagem, tipo = "success") {

        let toast = document.createElement("div");

        toast.className = `toast ${tipo}`;

        toast.innerHTML = `

            <span>${mensagem}</span>

        `;

        document.body.appendChild(toast);

        setTimeout(() => {

            toast.classList.add("show");

        }, 100);

        setTimeout(() => {

            toast.classList.remove("show");

            setTimeout(() => {

                toast.remove();

            }, 300);

        }, 3000);

    },

    /*=========================================
            LOADER
    =========================================*/

    mostrarLoader(texto = "Carregando...") {

        const loader = document.createElement("div");

        loader.id = "loader";

        loader.innerHTML = `

            <div class="loader-box">

                <div class="spinner"></div>

                <p>${texto}</p>

            </div>

        `;

        document.body.appendChild(loader);

    },

    esconderLoader() {

        const loader = document.getElementById("loader");

        if (loader) {

            loader.remove();

        }

    },

    /*=========================================
            MODAL
    =========================================*/

    abrirModal(id) {

        document
            .getElementById(id)
            .style.display = "flex";

    },

    fecharModal(id) {

        document
            .getElementById(id)
            .style.display = "none";

    },

    /*=========================================
        CONFIRMAÇÃO
    =========================================*/

    confirmar(titulo, mensagem, callback) {

        const modal = document.createElement("div");

        modal.className = "modal";

        modal.style.display = "flex";

        modal.innerHTML = `

            <div class="modal-content">

                <h2>${titulo}</h2>

                <br>

                <p>${mensagem}</p>

                <br>

                <div style="display:flex;gap:10px;justify-content:flex-end;">

                    <button

                        class="btn btn-secondary"

                        id="cancelarConfirm">

                        Cancelar

                    </button>

                    <button

                        class="btn btn-danger"

                        id="okConfirm">

                        Excluir

                    </button>

                </div>

            </div>

        `;

        document.body.appendChild(modal);

        document
            .getElementById("cancelarConfirm")
            .onclick = () => {

                modal.remove();

            };

        document
            .getElementById("okConfirm")
            .onclick = () => {

                callback();

                modal.remove();

            };

    }

};