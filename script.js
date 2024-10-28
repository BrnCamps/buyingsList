// Principais elementos
const form = document.querySelector("form")
const newItem = document.querySelector("#newItem")
const addItem = document.getElementById("submit")
const uList = document.querySelector("ul")
const priceItem = document.querySelector(".priceItem")
const totalValue = document.querySelector("#totalValue")
const totalItens = document.querySelector("#totalItens")

function formatCurrencyBRL(value){
    // Formata o valor do padrão BRL (Real Brasileiro)
    value = value.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
    })
// Retorna o valor formatado.
    return value
}

// Elementos do aviso
const warningAlert = document.querySelector(".warningAlert")

// Capturar o evento de submit do formulário para obter o item.
form.onsubmit = (event) => {
    event.preventDefault();
    const newItemAdd = {
        id: new Date().getTime(),
        name: newItem.value,
    };
    listAdd(newItemAdd)
};

// Função que adiciona um novo item na lista.
function listAdd(newItemAdd) {
    try {
        const itemList = document.createElement("li")
        itemList.classList.add("item")

        const checkboxLabel = document.createElement("label")
        checkboxLabel.classList.add("custom-checkbox")

        const inputCheck = document.createElement("input")
        inputCheck.setAttribute("type", "checkbox")
        inputCheck.classList.add("myCheckBox")

        const span = document.createElement("span")
        span.classList.add("checkmark")

        checkboxLabel.append(inputCheck, span)

        const text = document.createElement("a")
        text.classList.add("item-text")
        text.setAttribute("id", "text2")
        text.textContent = newItemAdd.name

        const dollar = document.createElement("img")
        dollar.classList.add("dollarSign")
        dollar.setAttribute("src", "Img/dollar.svg")
        dollar.setAttribute("alt", "Incluir Preço")

        dollar.addEventListener("click", (event) => {
            if (event.target.classList.contains("dollarSign")) {
                const dollarRemove = event.target.closest(".dollarSign")
                dollarRemove.remove()
                dollarInput()
            }
        })

        function dollarInput() {
            try {
                const priceItem = document.createElement("input")
                priceItem.classList.add("priceItem")
                priceItem.setAttribute("type", "text")
                priceItem.setAttribute("alt", "Preço do item")
                priceItem.setAttribute("max", 6)
                priceItem.setAttribute("placeholder", "R$ 0,00")
                // Adiciona o evento oninput para formatar o valor.
                priceItem.oninput = () => {
                    let value = priceItem.value.replace(/\D/g, '')
                    value = Number(value) / 100
                    priceItem.value = formatCurrencyBRL(value)

                    updateTotals()
                }

                itemList.insertBefore(priceItem, remove)
            } catch (error) {
                alert("Não foi possível adicionar o valor deste item.")
            }
        }

        const remove = document.createElement("img")
        remove.classList.add("remove-icon")
        remove.setAttribute("src", "Img/icon delete.svg")
        remove.setAttribute("alt", "remover")

        itemList.append(checkboxLabel, text, dollar, remove)
        uList.append(itemList)

        inputCheck.addEventListener("change", () => {
            text.classList.toggle("strikethrough", inputCheck.checked)
        });

        // Limpa o input depois de adicionado.
        inputclear()

        // Adiciona a função total.
        updateTotals()

    } catch (error) {
        alert("Não foi possível atualizar a lista.")
    }
}

// Evento que captura o clique nos itens da lista para remover.
uList.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-icon")) {
        const remover = event.target.closest(".item");
        remover.remove();
        triggerWarning("Item removido.")
        updateTotals()
    }
});

// Função que cria o warning e remove após 3 segundos.
function triggerWarning(alerta) {
    try {
        // Limpa o conteúdo anterior do alerta.
        warningAlert.innerHTML = ""

        const placeWarning = document.createElement("p")
        placeWarning.setAttribute("id", "warning")

        const imgWarning = document.createElement("img")
        imgWarning.setAttribute("src", "Img/warning-circle-filled.svg")
        imgWarning.setAttribute("alt", "alert")

        placeWarning.innerText = alerta

        placeWarning.append(imgWarning)
        warningAlert.append(placeWarning)

        // Remove o aviso após 5 segundos
        // setTimeout(() => {
        //     warningAlert.innerHTML = "";
        // }, 1900)
    } catch (error) {
        alert("Não foi possível mostrar o Alerta.");
    }
}

function updateTotals() {
    try {
        // Recupera todos os itens (li) da lista (ul)
        const items = uList.children;

        // Atualiza as quantidades.
        totalItens.textContent = `${items.length} ${items.length > 1 ? "Items •" : "Item •"}`

        // Variável para incrementar o total.
        let total = 0;

        // Percorre cada item (li) da lista (ul)
        for (let item = 0; item < items.length; item++) {
            // Seleciona o campo de input .priceItem
            const itemAmount = items[item].querySelector(".priceItem");

            // Verifica se o elemento .priceItem existe
            if (itemAmount) {
                // Remove caracteres não numéricos e substitui a vírgula por ponto
                let value = itemAmount.value.replace(/[^\d,]/g, "").replace(",", ".");

                // Converte o valor para float
                value = parseFloat(value);

                // Verifica se é um número válido
                if (isNaN(value)) {
                    return alert("Não foi possível calcular o total. O valor não parece ser um número.");
                }

                // Incrementar o valor total
                total += value;
            }
        }

        // Cria a span para adicionar o R$ formatado
        const symbolBRL = document.createElement("small");
        symbolBRL.textContent = "Total: R$";

        // Formata o valor e remove o R$ que será exibido pela small com um estilo customizado
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");

        // Limpa o conteúdo do elemento totalValue antes de atualizar
        totalValue.innerHTML = "";

        symbolBRL.append(total)

        // Adiciona o símbolo da moeda e o valor formatado
        totalValue.append(symbolBRL);

    } catch (error) {
        console.log(error);
        alert("Não foi possível atualizar os totais.");
    }
}


// Função para limpar o input
function inputclear() {
    // Limpa os inputs.
    newItem.value = ""
    // Foca no campo de texto novamente.
    newItem.focus();
}