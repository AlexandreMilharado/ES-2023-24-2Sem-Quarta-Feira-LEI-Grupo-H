import Tabulator from "tabulator-tables";
import { CsvRow } from "./uploadCsv";
import { dateStringFormatCToDate } from "./dates";
import { customFilter, table } from "./table";

//Variaveis globais
let tableSala: Tabulator;
let tableSuggestSlot;
let tableSala2;
let tableSuggestSlots;
let filter: string[] = [];
let incrmenet: number = 0;
////

function createAndSetDataToTable(tabledata: CsvRow[]): void {
    tableSala = new Tabulator("#HorarioSala", {
        data: tabledata,
        layout: "fitDataFill",
        pagination: "local",
        paginationSize: 10,
        paginationSizeSelector: [5, 10, 20, 40],
        movableColumns: false,
        autoColumns: true,
    });
}

export function createHtmlElements(): void {
    const suggestSlotReplaceDiv: HTMLDivElement = document.querySelector("#SuggestSlotToReplacementClass") as HTMLDivElement;
    const suggestSlotUcDiv: HTMLDivElement = document.querySelector("#SuggestSlotToUcClass") as HTMLDivElement;

    const suggestSlotReplaceButton: HTMLButtonElement = document.createElement("button");
    suggestSlotReplaceButton.addEventListener("click", () => showCriteriaSuggestSlots(suggestSlotReplaceDiv));
    suggestSlotReplaceButton.textContent = "Sugerir slots para alocação da aula de substituição"
    suggestSlotReplaceDiv.appendChild(suggestSlotReplaceButton);

    const suggestSlotUcButton: HTMLButtonElement = document.createElement("button");
    suggestSlotUcButton.addEventListener("click", () => showCriteriaSuggestSlots(suggestSlotUcDiv));
    suggestSlotUcButton.textContent = "Sugerir slots para alocação das aulas UC"
    suggestSlotUcDiv.appendChild(suggestSlotUcButton);
}
/**
 * Cria um container com um criterio, e um botão de crirar novo container.
*/
function showCriteriaSuggestSlots(mainDiv: HTMLDivElement): void {
    const buttonAddNewCriteriaDiv: HTMLButtonElement = document.createElement("button");
    buttonAddNewCriteriaDiv.textContent = "Or"
    buttonAddNewCriteriaDiv.addEventListener("click", () => addNewCriteriaContainer(mainDiv, buttonAddNewCriteriaDiv));
    mainDiv.appendChild(buttonAddNewCriteriaDiv);

    createCriteriaContainer(mainDiv, buttonAddNewCriteriaDiv);

    const labelDiv: HTMLDivElement = document.createElement("div");
    labelDiv.className = "criteira-label-container"

    const textLabel: HTMLLabelElement = document.createElement("label");
    textLabel.className = "criteira-label";

    labelDiv.appendChild(textLabel);
    mainDiv.appendChild(textLabel);

    const buttonCreateTable: HTMLButtonElement = document.createElement("button");
    // buttonCreateTable.addEventListener("click", () => updateLabel(mainDiv, textLabel));
    // buttonCreateTable.addEventListener("click", () => getCriteriaInputs(mainDiv));
    //APAGAR ISTO!!!
    buttonCreateTable.addEventListener("click", () => generateDays(""));
    // buttonCreateTable.addEventListener("click", () => generteHoraInicioHoraFim("09:30:00", "21:00:00"));
    ///
    buttonCreateTable.textContent = "Gerar tabela"
    mainDiv.appendChild(buttonCreateTable);
}
/**
 * Cria um novo container com um criterio inserido adicionando tambem um botão de apagar o cotnainer e escolher
 * o tipo de filtro a ser aplicado ("and" ou "or").
*/
function addNewCriteriaContainer(mainDiv: HTMLDivElement, buttonAddNewCriteriaContainer: HTMLButtonElement): void {
    const criteriaContainer: HTMLDivElement = createCriteriaContainer(mainDiv, buttonAddNewCriteriaContainer);
    // criteriaContainer.prepend(createRadioToggleButton());
    criteriaContainer.appendChild(createRemoveCriteriaContainerButton(criteriaContainer));
}
/**
 * Cria um novo container com um criterio inserido.
*/
function createCriteriaContainer(mainDiv: HTMLDivElement, buttonAddNewCriteriaContainer: HTMLButtonElement): HTMLDivElement {
    const criteriaContainer: HTMLDivElement = document.createElement('div');
    criteriaContainer.className = "criteria-container";

    mainDiv.insertBefore(criteriaContainer, buttonAddNewCriteriaContainer);

    const buttonAddNewCriteria: HTMLButtonElement = createNewCriteriaButton(mainDiv, criteriaContainer);
    criteriaContainer.appendChild(buttonAddNewCriteria);

    const element: HTMLDivElement = addNewCriteriaOptionToSuggestSlots(mainDiv);
    criteriaContainer.insertBefore(element, buttonAddNewCriteria);

    mainDiv.querySelector(".criteira-label")
    // criteriaContainer.prepend(createRadioToggleButton());
    return criteriaContainer;
}
/**
 * Cria um botão que permite criar um novo criterio ao respetivo container.
*/
function createNewCriteriaButton(mainDiv: HTMLDivElement, container: HTMLDivElement): HTMLButtonElement {
    const buttonAddNewCriteria: HTMLButtonElement = document.createElement("button");
    buttonAddNewCriteria.textContent = "And"
    buttonAddNewCriteria.addEventListener("click", () => {
        const element: HTMLDivElement = addNewCriteriaOptionToSuggestSlots(mainDiv);
        // element.prepend(createRadioToggleButton());
        element.appendChild(createRemoveCriteriaButton(element));
        container.insertBefore(element, buttonAddNewCriteria);
    });
    return buttonAddNewCriteria;
}
/**
 * Cria um criterio.
*/
/**
 * 
 * @returns {HTMLDivElement} HTMLDivElement
 */
function addNewCriteriaOptionToSuggestSlots(mainDiv: HTMLDivElement): HTMLDivElement {
    let columnOption: string = ''

    const columns: NodeListOf<Element> = document.querySelectorAll(".tabulator-col");
    for (let i = 0; i < 4; i++) {
        const title: string = columns[i].querySelector(".tabulator-col-title")?.textContent as string;
        columnOption += `<option value="${title}">${title}</option>`
    }
    const criteriaContainerElements: string =
        `
            <div class="criteria-column-container">
                <select class="criteria-column-selector">
                    ${columnOption}
                </select>
            </div>

            <div class="criteria-filter-option-container">
            <select class="criteria-filter-option-selector">
                <option selected value="==">Incluir</option>
                <option value="!=">Excluir</option>
                <option value=">="> >= </option>
                <option value="<="> <= </option>
            </select>
            </div>

            <div class="criteria-input-container">
                <input class="criteria-input" type="text">
            </div>
      `
    const criteriaContainerComponents: HTMLDivElement = document.createElement('div');
    criteriaContainerComponents.className = "criteria-container-components";
    criteriaContainerComponents.innerHTML = criteriaContainerElements;
    criteriaContainerComponents.querySelector("input")?.addEventListener("focusout", () => {
        updateLabel(mainDiv, mainDiv.querySelector(".criteira-label") as HTMLLabelElement);
    });
    return criteriaContainerComponents;
}
/**
 * Cria um botão que permite remover o criterio assocaido ao mesmo.
*/
function createRemoveCriteriaButton(criteriaContainer: HTMLDivElement): HTMLButtonElement {
    const removeButton: HTMLButtonElement = document.createElement("button");
    removeButton.className = "criteira-remove-button";
    removeButton.addEventListener("click", () => {
        criteriaContainer.remove();
    });
    removeButton.textContent = "X"
    return removeButton;
}
/**
 * Cria um botão que permite remover o container assocaido ao mesmo.
*/
function createRemoveCriteriaContainerButton(criteriaContainer: HTMLDivElement): HTMLButtonElement {
    const removeButton: HTMLButtonElement = document.createElement("button");
    removeButton.className = "criteira-container-remove-button";
    removeButton.addEventListener("click", () => {
        criteriaContainer.remove();
    });
    removeButton.textContent = "X"
    return removeButton;
}
/**
 * Cria um radioToggle para escolher o tipo de filtro ("and" ou "or").
*/
function createRadioToggleButton(): HTMLDivElement {
    const radioOption: string =
        `
            <input type="radio" id="radio-option-and-${incrmenet}" name="radio-option-${incrmenet}" value="and" checked/>
            <label for="radio-option-and-${incrmenet}">and</label>
            <input type="radio" id="radio-option-or-${incrmenet}" name="radio-option-${incrmenet}" value="or" />
            <label for="radio-option-or-${incrmenet}">or</label>
        `
    incrmenet++;
    const div: HTMLDivElement = document.createElement('div');
    div.className = "criteria-radioToggle-container";
    div.innerHTML = radioOption;
    return div;
}
/**
 * Pega nos criterios do utilizador.
 * 
 * 
*/

export interface criteria {
    field: string;
    type: string;
    value: string;
}
function getCriteriaInputs(mainDiv: HTMLDivElement): string {
    let finalFilter: string = "";
    const temp = table.getHeaderFilters();
    const filter: NodeListOf<Element> = mainDiv.querySelectorAll(".criteria-container");
    for (let i = 0; i != filter.length; i++) {
        let criteriaString: string = "";
        const criteriaContainerComponents = filter[i].querySelectorAll(".criteria-container-components");
        for (let i = 0; i != criteriaContainerComponents.length; i++) {
            const column: HTMLSelectElement = criteriaContainerComponents[i].querySelector(".criteria-column-selector") as HTMLSelectElement;
            const filter: HTMLSelectElement = criteriaContainerComponents[i].querySelector(".criteria-filter-option-selector") as HTMLSelectElement;
            const inputValue: HTMLInputElement = criteriaContainerComponents[i].querySelector(".criteria-input") as HTMLInputElement;
            if (i != criteriaContainerComponents.length - 1) criteriaString += `${column.value} ${filter.value} ${inputValue.value.trim()} && `;
            else criteriaString += `${column.value} ${filter.value} ${inputValue.value.trim()}`;
        }
        if (i != filter.length - 1) finalFilter += "( " + criteriaString + " )" + " || "
        else finalFilter += "( " + criteriaString + " )";
    }
    console.log(finalFilter);
    console.log(temp);
    table.setFilter(customFilter, finalFilter);
    return finalFilter;
}

function updateLabel(mainDiv: HTMLDivElement, label: HTMLLabelElement) {
    let labelText: string = "";
    const filter: NodeListOf<Element> = mainDiv.querySelectorAll(".criteria-container");
    for (let i = 0; i != filter.length; i++) {
        let criteriaString: string = "";
        const criteriaContainerComponents = filter[i].querySelectorAll(".criteria-container-components");
        for (let i = 0; i != criteriaContainerComponents.length; i++) {
            const column: HTMLSelectElement = criteriaContainerComponents[i].querySelector(".criteria-column-selector") as HTMLSelectElement;
            const filter: HTMLSelectElement = criteriaContainerComponents[i].querySelector(".criteria-filter-option-selector") as HTMLSelectElement;
            const inputValue: HTMLInputElement = criteriaContainerComponents[i].querySelector(".criteria-input") as HTMLInputElement;
            if (i == 0) criteriaString += ` ${column.value} ${filter.options[filter.selectedIndex].text} ${inputValue.value.trim()}`
            else criteriaString += ` and ${column.value} ${filter.options[filter.selectedIndex].text} ${inputValue.value.trim()}`
            // const filterType: HTMLInputElement = criteria.querySelector(".criteria-radioToggle-container")?.querySelector('input:checked') as HTMLInputElement;
            // if (filterType) criteriaString += ` ${filterType.value} ${column.value} ${filter.options[filter.selectedIndex].text} ${inputValue.value.trim()}`
            // else criteriaString += `${column.value} ${filter.options[filter.selectedIndex].text} ${inputValue.value.trim()}`
        }
        // const radioToggle: HTMLInputElement = criteriaContainer.firstElementChild?.querySelector('input:checked') as HTMLInputElement;
        if (i % 2 == 0) labelText += `(${criteriaString})`;
        else labelText += ` or (${criteriaString})`
        // if (radioToggle) labelText += ` ${radioToggle.value} (${criteriaString})`;
        // else labelText += `(${criteriaString})`;
    }
    label.textContent = labelText;
}
/**
 * Pega em todos os criterios, e aplica os na tabela.
*/
function getCriteriaAndSubmit(mainDiv: HTMLDivElement, table: Tabulator): void {
    const criterias: NodeListOf<Element> = mainDiv.querySelectorAll(".criteria-container") as NodeListOf<Element>;
    let listFilters: any = [];
    criterias.forEach((criteria) => {
        const column: string = criteria.querySelector(".criteria-column-selector")?.innerHTML as string;
        const filter: string = criteria.querySelector(".criteria-filter-option-selector")?.innerHTML as string;
        const filterType: string = criteria.querySelector(".criteria-filter-option-type")?.innerHTML as string;
        const inputValue: string = criteria.querySelector(".criteria-input")?.innerHTML.trim() as string;
        if (inputValue.length > 0) {
            listFilters.push({
                field: column,
                type: filter,
                value: inputValue,
            });
        }
    });
    // console.log(listFilters);
    table.setFilter(listFilters);
}

function filterCurso(table: CsvRow[], curso: string): CsvRow[] {
    return table.filter((row) => {
        return Object.entries(row).filter((entry) => entry[0] == "Curso")[0][1] == curso;
    })
}

function generateSugestions() {
    let sugestions: { horaInicio: string, horaFim: string, data: string, sala: string }[] = [];
    const miHoraInicial = "08:00:00";
    const maxHoraInicial = "21:00:00";


}

function generateDays(initalDate: string) {
    let list: String[] = [];
    let date: Date;
    date = (initalDate == null || initalDate == "") ? new Date() : dateStringFormatCToDate(initalDate) as Date;
    const year = date.getFullYear();
    let initalDay = date.getDate();
    for (let month = date.getMonth() + 1; month < 12; month++) {
        for (let day = initalDay; day != new Date(year, month, 0).getDate(); day++) {
            list.push(fixFormat((day + "/" + month + "/" + year), "/"));
        }
        initalDay = 1;
    }
    console.log(list);
    return list;
}

function generteHoraInicioHoraFim(miHoraInicial: string, maxHoraInicial: string) {
    let list: string[] = [];
    if (miHoraInicial == null || !(Number(miHoraInicial.slice(0, 2)) > 8 && Number(miHoraInicial.slice(3, 5)) % 30 == 0)) {
        miHoraInicial = "08:00:00";
    }
    if (maxHoraInicial == null || !(Number(miHoraInicial.slice(0, 2)) > 21 && Number(miHoraInicial.slice(3, 5)) % 30 == 0)) {
        maxHoraInicial = "22:30:00";
    }
    let minutes = Number(miHoraInicial.charAt(3));
    const starTime = Number(miHoraInicial.slice(0, 2));
    const endTime = Number(maxHoraInicial.slice(0, 2));

    for (let hour = starTime; hour <= 13; hour++) {
        list.push(fixFormat((hour + ":" + minutes + "0:00"), ":"));
        minutes += 3;
        if (minutes > 3) {
            hour++;
            minutes = 0;
        }
    }
    for (let hour = Math.max(13, starTime); hour <= endTime; hour++) {
        list.push(hour + ":" + minutes + "0:00");
        minutes += 3;
        if (minutes > 3) {
            hour++;
            minutes = 0;
        }
    }
    console.log(list);
    return list;
}

function fixFormat(time: string, seperator: string) {
    let list: string[] = time.split(seperator);
    for (let i = 0; i != list.length; i++) {
        if (list[i].length < 2) {
            list[i] = "0" + list[i];
        }
    }
    return list[0] + seperator + list[1] + seperator + list[2];
}
