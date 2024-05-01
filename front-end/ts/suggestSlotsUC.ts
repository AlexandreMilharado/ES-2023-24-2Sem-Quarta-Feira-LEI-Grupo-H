import { showCriteriaSuggestSlots } from "./suggestSlotst";
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
    showCriteriaSuggestSlots(suggestSlotUcDiv, document.getElementById("UcClassCharacteristicsTable") as HTMLDivElement, document.getElementById("UcClassTimeTable") as HTMLDivElement);
    ucClassContainer.style.display = "none";
    document.getElementById("SuggestSlots")?.prepend(suggestSlotUcButton);
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
                <input type="text">
            </label>
        `
    UcClassInformation.innerHTML = element;
}