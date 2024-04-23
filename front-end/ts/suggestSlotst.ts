import Tabulator from "tabulator-tables";
import { CsvRow } from "./uploadCsv";
import { formatDateToDDMMYYYY, getClassesStartingHours, getDaysFromRange } from "./dates";
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
    buttonCreateTable.addEventListener("click", () => getFilteredDateHourCombination(mainDiv));
    // buttonCreateTable.addEventListener("click", () => generteHoraInicioHoraFim("09:30:00", "21:00:00"));
    ///
    buttonCreateTable.textContent = "Gerar tabela"
    mainDiv.appendChild(buttonCreateTable);
}
/**
 * Cria um novo container com um criterio inserido adicionando tambem um botão de apagar o cotnainer e escolher
 * o tipo de filtro a ser aplicado ("and" ou "or").
*/
function addNewCriteriaContainer(mainDiv: HTMLDivElement, buttonAddNewCriteriaContainer: HTMLButtonElement) {
    const criteriaContainer: HTMLDivElement = createCriteriaContainer(mainDiv, buttonAddNewCriteriaContainer);
    criteriaContainer.appendChild(createRemoveButton(criteriaContainer, "criteira-container-remove-button"));
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
        element.appendChild(createRemoveButton(element, "criteira-remove-button"));
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
    const criteriaContainerElements: string =
        `
            <div class="criteria-column-container">
                
            </div>

            <div class="criteria-filter-option-container">
            <select class="criteria-filter-option-selector">
                <option selected value="==">Incluir</option>
                <option value="!=">Excluir</option>
                <option class="extra-options" value=">="> >= </option>
                <option class="extra-options" value="<="> <= </option>
            </select>
            </div>

            <div class="criteria-input-container">
                <input class="criteria-input" type="text">
            </div>
      `
    const criteriaContainerComponents: HTMLDivElement = document.createElement('div');
    criteriaContainerComponents.className = "criteria-container-components";
    criteriaContainerComponents.innerHTML = criteriaContainerElements;
    //Adciona no inicio uma select box com as colunas da tabela
    criteriaContainerComponents.querySelector(".criteria-column-container")?.appendChild(createSelectWithOptionsToColumns(criteriaContainerComponents, true));
    ///
    criteriaContainerComponents.querySelector("input")?.addEventListener("focusout", () => {
        updateLabel(mainDiv, mainDiv.querySelector(".criteira-label") as HTMLLabelElement);
    });
    return criteriaContainerComponents;
}
/**
 * Cria um select com ja as opçoes inseridas para as colunas da coluna.
*/
/**
 * 
 * @returns {HTMLSelectElement} HTMLSelectElement
 */
function createSelectWithOptionsToColumns(div: HTMLDivElement, isRooms: boolean): HTMLSelectElement {
    const select: HTMLSelectElement = document.createElement('select');
    select.className = "criteria-column-container";
    let options: string;
    if (isRooms) {
        options =
            `
                <select class="criteria-column-selector">
                    <option value="Dia da semana">Dia da semana</option>
                    <option value="Hora início da aula">Hora início da aula</option>
                    <option value="Data da aula">Data da aula</option>
                </select>
        `
    } else {
        options =
            `
                <select class="criteria-column-selector">
                    <option value="Edifício">Edifício</option>
                    <option value="Nome sala">Nome sala</option>
                    <option value="Capacidade Normal">Capacidade Normal</option>
                    <option value="Capacidade Exame">Capacidade Exame</option>
                    <option value="Características">Características</option>
                </select>
        `
    }

    select.innerHTML = options;
    select.addEventListener("change", () => showExtraOptions(div, select.value));
    return select;
}
/**
 * Dependendo qual é a opção escolhida pode ou não aparecer opções extra e pode ou não alterar o tipo do input
*/
function showExtraOptions(div: HTMLDivElement, column: string) {
    const extraOptions: NodeListOf<HTMLOptionElement> = div.querySelectorAll(".extra-options");
    let display: string;
    let type: string = "text";
    if (column == "Data da aula" || column == "Hora início da aula") {
        if (column == "Data da aula") type = "date";
        else type = "time";
    }

    div.querySelector("input")!.type = type;

    if (column == "Edifício" || column == "Nome sala" || column == "Características" || column == "Dia da semana") {
        display = "none";
    } else {
        display = "block";
    }

    extraOptions.forEach((option) => {
        option.style.display = display;
    });
}

/**
 * Cria um botão que permite remover o elemento associado.
*/
function createRemoveButton(criteriaContainer: HTMLDivElement, className: string): HTMLButtonElement {
    const removeButton: HTMLButtonElement = document.createElement("button");
    removeButton.className = className;
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

export interface criteria {
    field: string;
    type: string;
    value: string;
}
/**
 * Pega nos criterios do utilizador.
 * 
 * 
*/
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
        }
        if (i % 2 == 0) labelText += `(${criteriaString})`;
        else labelText += ` or (${criteriaString})`
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

function generateSugestions() {
    let sugestions: { horaInicio: string, horaFim: string, data: string, sala: string }[] = [];
    const miHoraInicial = "08:00:00";
    const maxHoraInicial = "21:00:00";


}

function daysBasedOnFilter(mainDiv: HTMLDivElement): Date[] {
    const daysToInclude: Date[] = [];

    const filter: NodeListOf<Element> = mainDiv.querySelectorAll(".criteria-container");
    for (let j = 0; j != filter.length; j++) {
        const criteriaContainerComponents = filter[j].querySelectorAll(".criteria-container-components");
        const daysToIncludeAux: Date[] = [];
        const daysToExclude: Date[] = [];
        let startDate: Date = new Date();
        let finishDate: Date = new Date();
        finishDate.setMonth(finishDate.getMonth() + 1);
        for (let i = 0; i != criteriaContainerComponents.length; i++) {
            const column: HTMLSelectElement = criteriaContainerComponents[i].querySelector(".criteria-column-selector") as HTMLSelectElement;
            const operator: HTMLSelectElement = criteriaContainerComponents[i].querySelector(".criteria-filter-option-selector") as HTMLSelectElement;
            const inputValue: HTMLInputElement = criteriaContainerComponents[i].querySelector(".criteria-input") as HTMLInputElement;
            if (column.value !== "Data da aula") continue;
            if (operator.value === "==") daysToIncludeAux.push(new Date(inputValue.value))
            else if (operator.value === "!=") daysToExclude.push(new Date(inputValue.value))
            else if (operator.value === "<=") finishDate = new Date(inputValue.value);
            else startDate = new Date(inputValue.value);
        }
        if (daysToIncludeAux.length < 1) {
            daysToIncludeAux.push(...getDaysFromRange(startDate, finishDate))
        }

        daysToExclude.length ?
            daysToInclude.push(...(
                daysToIncludeAux.filter((element) => daysToExclude.every((excludedDay) => excludedDay.getTime() !== element.getTime()))
            )) :
            daysToInclude.push(...daysToIncludeAux)
    }
    return [...(new Set(daysToInclude))];
}

function hoursBasedOnFilter(mainDiv: HTMLDivElement, classDuration: number = 90): string[] {
    const hours: string[] = [];
    const filter: NodeListOf<Element> = mainDiv.querySelectorAll(".criteria-container");
    for (let j = 0; j != filter.length; j++) {
        const criteriaContainerComponents = filter[j].querySelectorAll(".criteria-container-components");
        let initialHour = new Date("1 08:00");
        let finalHour = new Date("1 22:00");
        const hoursFromAnd: string[] = [];
        const hoursToExclude: string[] = [];
        for (let i = 0; i != criteriaContainerComponents.length; i++) {
            const column: HTMLSelectElement = criteriaContainerComponents[i].querySelector(".criteria-column-selector") as HTMLSelectElement;
            const operator: HTMLSelectElement = criteriaContainerComponents[i].querySelector(".criteria-filter-option-selector") as HTMLSelectElement;
            const inputValue: HTMLInputElement = criteriaContainerComponents[i].querySelector(".criteria-input") as HTMLInputElement;
            if (column.value !== "Hora início da aula" || new Date(`1 ${inputValue.value}`) > new Date("1 22:00") || new Date(`1 ${inputValue.value}`) < new Date("1 08:00")) continue;
            if (operator.value === "==") hoursFromAnd.push((inputValue.value))
            else if (operator.value === "!=") hoursToExclude.push(inputValue.value)
            else if (operator.value === "<=") finalHour = new Date(`1 ${inputValue.value}`);
            else initialHour = new Date(`1 ${inputValue.value}`);
        }

        if (hoursFromAnd.length < 1) {
            hoursFromAnd.push(...(getClassesStartingHours(initialHour, finalHour, classDuration)))
        }
        hours.push(...(hoursFromAnd.filter((hour) => hoursToExclude.indexOf(hour) < 0)))

    }
    return [...(new Set(hours))];
}


function getFilteredDateHourCombination(mainDiv: HTMLDivElement) {
    const combinations: { day: string, hour: string }[] = [];
    const hours = hoursBasedOnFilter(mainDiv);
    daysBasedOnFilter(mainDiv).forEach((day) => {
        hours.forEach((hour) => combinations.push({ day: formatDateToDDMMYYYY(day), hour: hour }))
    })
    console.log(combinations);
}
