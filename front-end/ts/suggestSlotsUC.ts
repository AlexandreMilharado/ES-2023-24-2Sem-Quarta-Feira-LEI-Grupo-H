// import { Tabulator } from "tabulator-tables";
import { addSuggestion, removeConflicts, showCriteriaSuggestSlots } from "./suggestSlotst";
import { sortFiles } from "./variables";
createHtmlElements();
/**
 * Cria os botões que mostram a UI para sugerir slots das aulas de UC.
 */
function createHtmlElements(): void {
    sortFiles();//Para garantir que a ordem dos ficheiros encontra-se coerente.
    const suggestSlotUcDiv: HTMLDivElement = document.querySelector("#UcClassCriteria") as HTMLDivElement;
    const ucClassContainer = document.getElementById("UcClass") as HTMLDivElement;

    //Criação do botão para sugerir slots das aulas de UC
    const suggestSlotUcButton: HTMLButtonElement = document.createElement("button");
    suggestSlotUcButton.textContent = "Sugerir slots para alocação das aulas UC";
    suggestSlotUcButton.classList.add("styled-button");
    suggestSlotUcButton.addEventListener("click", () => {
        if (suggestSlotUcButton.value == "On") {
            suggestSlotUcButton.value = "Off"
            ucClassContainer.style.display = "none";
        } else {
            suggestSlotUcButton.value = "On";
            ucClassContainer.style.display = "block";
        }
    });
    //
    /**Cria um container para se puder inserir os criteiros para sugerir slots das aulas de UC, mas enquanto não for clicado 
    *no botão esse container vai se encontrar invisivel
    */
    const ucClassTimeTable = document.getElementById("UcClassTimeTable") as HTMLDivElement;

    const buttonAddSuggestions = document.createElement("button");
    buttonAddSuggestions.classList.add("styled-button");
    buttonAddSuggestions.textContent = "Marcar aula";
    buttonAddSuggestions.addEventListener("click", () => addSuggestion(buttonAddSuggestions));

    showCriteriaSuggestSlots(suggestSlotUcDiv, ucClassTimeTable);
    ucClassContainer.style.display = "none";
    document.getElementById("SuggestSlots")?.insertBefore(suggestSlotUcButton, document.getElementById("UcClass") as HTMLDivElement);
    ucClassTimeTable.parentElement?.querySelector(".flex-centered")?.appendChild(buttonAddSuggestions);
    extraElements();
    //
}
/**
 * Acrecenta uma label com um input sobre quantas aulas se pretende marcar
*/
function extraElements() {
    const UcClassInformation = document.getElementById("UcClassInformation") as HTMLDivElement;
    const element =
        `
            <label>
                Quantas aulas pretende marcar:
                <input type="text" value=0>
            </label>
        `
    UcClassInformation.innerHTML = element;
}

// function addSuggestion(button: HTMLButtonElement) {
//     const selectedRows: any = button.parentElement?.parentElement?.querySelectorAll(".row-selected");
//     const data = JSON.parse(document.getElementById("ReplacementClassInformation")?.textContent as string);
//     const suggestions: any = {};
//     console.log(selectedRows);
//     selectedRows.forEach((suggestion: any) => {
//         const suggestionData = suggestion.querySelectorAll(".tabulator-cell");
//         let suggestionObject: string = "";
//         for (let i = 0; i != 5; i++) {
//             if (i != 4) suggestionObject += `"${suggestionData[i].getAttribute("tabulator-field")}":"${suggestionData[i].textContent}",`;
//             else suggestionObject += `"${suggestionData[i].getAttribute("tabulator-field")}":"${suggestionData[i].textContent}"`;
//         }
//         const updatedData = Object.assign(data, JSON.parse("{" + suggestionObject + "}"));
//         console.log(updatedData);
//         suggestions[updatedData["Sala atribuída à aula"] + updatedData["Data da aula"] + updatedData["Hora fim da aula"]] = updatedData;
//         // let table2 = Tabulator.prototype.findTable("#HorarioPrincipal")[0];
//         // console.log(table.getData());
//         // console.log(table2.getData());
//         // if (!removeConflicts(suggestions, table2)) {
//         //     window.alert("O criterio inserido tem conflitos");
//         //     return;
//         // }
//         // selectedRows.forEach((row: any) => {
//         //     row.remove();
//         // });
//         // table2.addRow(updatedData, true);
//     });
// }