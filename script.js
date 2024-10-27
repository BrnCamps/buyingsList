// Principais elementos
const form = document.querySelector("form")
const newItem = document.querySelector("#newItem")
const addItem = document.getElementById("submit")
const uList = document.querySelector("ul")

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

        const remove = document.createElement("img")
        remove.classList.add("remove-icon")
        remove.setAttribute("src", "Img/icon delete.svg")
        remove.setAttribute("alt", "remover")

        itemList.append(checkboxLabel, text, remove)
        uList.append(itemList)

        inputCheck.addEventListener("change", () => {
            text.classList.toggle("strikethrough", inputCheck.checked)
        });

        // Clear input after adding the item
        inputclear()
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
        setTimeout(() => {
            warningAlert.innerHTML = "";
        }, 1900)
    } catch (error) {
        alert("Não foi possível mostrar o Alerta.");
    }
}

// Função para limpar o input
function inputclear() {
    // Limpa os inputs.
    newItem.value = ""
    // Foca no campo de texto novamente.
    newItem.focus();
}

