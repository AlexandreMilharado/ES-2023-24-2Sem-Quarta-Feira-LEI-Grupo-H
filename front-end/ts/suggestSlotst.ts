import Tabulator from "tabulator-tables";
import { TableRow } from "./uploadCsv";
import { formatDateToDDMMYYYY, getClassesStartingHours, getDayOfWeek, getDaysFromRange } from "./dates";
import { customFilter, setData } from "./table";
import { GetCarateristicas, GetHorario, sortFiles } from "./variables";

createHtmlElements();
/**
 * Cria uma nova tabela, com menos features, com os dados inseridos, aplica sobre a tablea os filtros inseridos
 * pelo utilizador, o resultado da aplicação dos filtros sera então o retorno da função, o motivo de ser um any
 * é que não se sabe qual vao ser os criterios utilizados pelo utilizador.
*/
function getCharacteristics(mainDiv: HTMLDivElement, characteristicsTableElement: HTMLDivElement, tabledata: TableRow[]): any[] {
    const table = new Tabulator("#" + characteristicsTableElement.id, {
        data: tabledata,
        autoColumns: true,
    });
    const criteriaInputs = getCriteriaInputs(table, mainDiv, "criteria-container-characteristics");
    const usedColumns = criteriaInputs["usedColumns"];
    table.setFilter(customFilter, criteriaInputs["finalFilter"]);
    let filteredRow: any[] = [];
    table.getRows(true).forEach((row: any) => {
        const object: any = {};
        object["Nome sala"] = row.getData()["Nome sala"];
        for (let i = 0; i != usedColumns.length; i++) {
            object[usedColumns[i]] = row.getData()[usedColumns[i]];
        }
        filteredRow.push(object);
    });
    console.log(filteredRow);
    return filteredRow;
}
/**
 * Cria os botões que mostram a UI para sugerir slots das aulas de substituição e de UC.
 */
export function createHtmlElements(): void {
    sortFiles();//Para garantir que a ordem dos ficheiros encontra-se coerente.
    const replacementClassCriteriaContainer: HTMLDivElement = document.querySelector("#ReplacementClassCriteria") as HTMLDivElement;
    const replacementClassContainer = document.getElementById("ReplacementClass") as HTMLDivElement;

    //Criação do botão para sugerir slots as aulas de substituição
    const suggestSlotReplaceButton: HTMLButtonElement = document.createElement("button");
    suggestSlotReplaceButton.textContent = "Sugerir slots para alocação da aula de substituição";
    suggestSlotReplaceButton.addEventListener("click", () => {
        if (suggestSlotReplaceButton.value == "On") {
            suggestSlotReplaceButton.value = "Off"
            replacementClassContainer.style.display = "none";
        } else {
            suggestSlotReplaceButton.value = "On";
            replacementClassContainer.style.display = "block";
        }
    });
    //
    /**Cria um container para se puder inserir os criteiros para sugerir slots as aulas de substituição, mas enquanto não for clicado 
    *no botão esse container vai se encontrar invisivel
    */
    showCriteriaSuggestSlots(replacementClassCriteriaContainer,
        document.getElementById("ReplacementClassCharacteristicsTable") as HTMLDivElement,
        document.getElementById("ReplacementClassTimeTable") as HTMLDivElement);
    replacementClassContainer.style.display = "none";
    document.getElementById("SuggestSlots")?.prepend(suggestSlotReplaceButton);
    //

}
/**
 * Cria um container com um criterio, e um botão de crirar novo container.
*/
export function showCriteriaSuggestSlots(mainDiv: HTMLDivElement, characteristicsTableElement: HTMLDivElement, timeTableElement: HTMLDivElement): void {
    const buttonAddNewCriteriaDivTimeTable: HTMLButtonElement = document.createElement("button");
    buttonAddNewCriteriaDivTimeTable.textContent = "Or"
    buttonAddNewCriteriaDivTimeTable.addEventListener("click", () => addNewCriteriaContainer(mainDiv, buttonAddNewCriteriaDivTimeTable, true));
    mainDiv.appendChild(buttonAddNewCriteriaDivTimeTable);

    createCriteriaContainer(mainDiv, buttonAddNewCriteriaDivTimeTable, true);

    const buttonAddNewCriteriaDivCharacteristics: HTMLButtonElement = document.createElement("button");
    buttonAddNewCriteriaDivCharacteristics.textContent = "Or"
    buttonAddNewCriteriaDivCharacteristics.addEventListener("click", () => addNewCriteriaContainer(mainDiv, buttonAddNewCriteriaDivCharacteristics, false));
    mainDiv.appendChild(buttonAddNewCriteriaDivCharacteristics);

    createCriteriaContainer(mainDiv, buttonAddNewCriteriaDivCharacteristics, false);

    // const labelDiv: HTMLDivElement = document.createElement("div");
    // labelDiv.className = "criteria-label-container"

    // const textLabel: HTMLLabelElement = document.createElement("label");
    // textLabel.className = "criteria-label";

    // labelDiv.appendChild(textLabel);
    // mainDiv.appendChild(labelDiv);

    const buttonCreateTable: HTMLButtonElement = document.createElement("button");
    buttonCreateTable.addEventListener("click", () => {
        generateSugestions(mainDiv, timeTableElement, characteristicsTableElement);
    });
    buttonCreateTable.textContent = "Gerar tabela"
    mainDiv.appendChild(buttonCreateTable);
}
/**
 * Cria um novo container com um criterio inserido adicionando tambem um botão de apagar o cotnainer e escolher
 * o tipo de filtro a ser aplicado ("and" ou "or").
*/
function addNewCriteriaContainer(mainDiv: HTMLDivElement, buttonAddNewCriteriaContainer: HTMLButtonElement, isRooms: boolean) {
    const criteriaContainer: HTMLDivElement = createCriteriaContainer(mainDiv, buttonAddNewCriteriaContainer, isRooms);
    criteriaContainer.appendChild(createRemoveButton(criteriaContainer, "criteria-container-remove-button"));
}
/**
 * Cria um novo container com um criterio inserido.
*/
function createCriteriaContainer(mainDiv: HTMLDivElement, buttonAddNewCriteriaContainer: HTMLButtonElement, isRooms: boolean): HTMLDivElement {
    const criteriaContainer: HTMLDivElement = document.createElement('div');
    if (isRooms) criteriaContainer.className = "criteria-container criteria-container-timeTable";
    else criteriaContainer.className = "criteria-container criteria-container-characteristics"

    const labelDiv: HTMLDivElement = document.createElement("div");
    labelDiv.className = "criteria-label-container"
    const textLabel: HTMLLabelElement = document.createElement("label");
    textLabel.className = "criteria-label";
    labelDiv.appendChild(textLabel);

    mainDiv.insertBefore(criteriaContainer, buttonAddNewCriteriaContainer);
    const buttonAddNewCriteria: HTMLButtonElement = createNewCriteriaButton(mainDiv, criteriaContainer, isRooms);
    criteriaContainer.appendChild(buttonAddNewCriteria);
    if (!isRooms) criteriaContainer.prepend(createSelectWithOptionsToClassDuration());
    const element: HTMLDivElement = addNewCriteriaOptionToSuggestSlots(mainDiv, criteriaContainer.className.split(" ")[1], isRooms);
    criteriaContainer.insertBefore(element, buttonAddNewCriteria);
    criteriaContainer.appendChild(labelDiv);
    mainDiv.querySelector(".criteria-label")



    return criteriaContainer;
}
/**
 * Cria um botão que permite criar um novo criterio ao respetivo container.
*/
function createNewCriteriaButton(mainDiv: HTMLDivElement, container: HTMLDivElement, isRooms: boolean): HTMLButtonElement {
    const buttonAddNewCriteria: HTMLButtonElement = document.createElement("button");
    buttonAddNewCriteria.textContent = "And"
    buttonAddNewCriteria.addEventListener("click", () => {
        const element: HTMLDivElement = addNewCriteriaOptionToSuggestSlots(mainDiv, container.className.split(" ")[1], isRooms);
        element.appendChild(createRemoveButton(element, "criteria-remove-button"));
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
function addNewCriteriaOptionToSuggestSlots(mainDiv: HTMLDivElement, nameCriteia: string, isRooms: boolean): HTMLDivElement {
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
    criteriaContainerComponents.querySelector(".criteria-column-container")?.appendChild(createSelectWithOptionsToColumns(criteriaContainerComponents, isRooms));
    ///
    //Sempre que seja alterado o input ou o select vai ser atualizado o filtro de feedback
    criteriaContainerComponents.querySelector("input")?.addEventListener("focusout", () => {
        updateLabel(mainDiv, nameCriteia, mainDiv.querySelector(" ." + nameCriteia + " .criteria-label") as HTMLLabelElement);
    });

    criteriaContainerComponents.querySelectorAll("select")?.forEach((select) => {
        select.addEventListener("focusout", () => {
            updateLabel(mainDiv, nameCriteia, mainDiv.querySelector(" ." + nameCriteia + " .criteria-label") as HTMLLabelElement);
        });
    });
    //
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
    select.className = "criteria-column-selector";
    let options: string;
    if (isRooms) {
        options =
            `
                <select class="criteria-column-selector">
                    <option value="Hora início da aula">Hora início da aula</option>
                    <option value="Dia da semana">Dia da semana</option>
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
    showExtraOptions(div, select.value);
    return select;
}

function createSelectWithOptionsToClassDuration(): HTMLLabelElement {
    const select: HTMLLabelElement = document.createElement('label');
    const options: string =
        `       Duração:
                <select class="criteria-duration-selector">
                    <option value="30">30m</option>
                    <option value="60">1h</option>
                    <option value="90">1h30m</option>
                    <option value="120">2h</option>
                    <option value="150">2h30m</option>
                    <option value="180">3h</option>
                </select>
        `
    select.innerHTML = options;
    return select;
}

/**
 * Dependendo qual é a opção escolhida aparece as opções extra podendo alterar o tipo do input
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

export interface criteria {
    field: string;
    type: string;
    value: string;
}
/**
 * Pega nos criterios do utilizador, devolvendo no primeiro return quais foram as colunas usadas e no 
 * segundo return o filtro gerado.
*/
function getCriteriaInputs(table: Tabulator, mainDiv: HTMLDivElement, criteriaContainerName: string): { usedColumns: string[]; finalFilter: string; } {
    let finalFilter: string = "";
    let usedColumns: string[] = [];
    table.clearFilter();
    const filter: NodeListOf<Element> = mainDiv.querySelectorAll("." + criteriaContainerName);
    for (let i = 0; i != filter.length; i++) {
        let criteriaString: string = "";
        const criteriaContainerComponents = filter[i].querySelectorAll(".criteria-container-components");
        for (let i = 0; i != criteriaContainerComponents.length; i++) {
            const column: HTMLSelectElement = criteriaContainerComponents[i].querySelector(".criteria-column-selector") as HTMLSelectElement;
            const operator: HTMLSelectElement = criteriaContainerComponents[i].querySelector(".criteria-filter-option-selector") as HTMLSelectElement;
            const input: HTMLInputElement = criteriaContainerComponents[i].querySelector(".criteria-input") as HTMLInputElement;
            let columnValue: string = column.value;
            let inputValue: string = input.value.trim();

            console.log("inputValue " + inputValue)
            if (inputValue == "") continue;
            if (columnValue == "Características") {
                columnValue = inputValue;
                inputValue = "X";
            }

            usedColumns.push(columnValue);

            if (criteriaString == "") criteriaString += `data["${columnValue}"] ${operator.value} "${inputValue}"`;
            else criteriaString += ` && data["${columnValue}"] ${operator.value} "${inputValue}"`;
        }
        if (i != filter.length - 1) finalFilter += "( " + criteriaString + " )" + " || "
        else finalFilter += "( " + criteriaString + " )";
    }
    console.log(finalFilter);
    if (finalFilter == "(  )") finalFilter = "";
    return { usedColumns, finalFilter };
}

/**
 * Pega nos criterios do utilizador, devolendo uma menssagem como feedback, o que vai ser aplicado sobre a tabela. 
*/
function updateLabel(mainDiv: HTMLDivElement, nameCriteia: string, label: HTMLLabelElement) {
    console.log(mainDiv)
    console.log(nameCriteia)
    let labelText: string = "";
    const filter: NodeListOf<Element> = mainDiv.querySelectorAll("." + nameCriteia);
    for (let i = 0; i != filter.length; i++) {
        let criteriaString: string = "";
        const criteriaContainerComponents = filter[i].querySelectorAll(".criteria-container-components");
        for (let i = 0; i != criteriaContainerComponents.length; i++) {
            const column: HTMLSelectElement = criteriaContainerComponents[i].querySelector(".criteria-column-selector") as HTMLSelectElement;
            const operator: HTMLSelectElement = criteriaContainerComponents[i].querySelector(".criteria-filter-option-selector") as HTMLSelectElement;
            const input: HTMLInputElement = criteriaContainerComponents[i].querySelector(".criteria-input") as HTMLInputElement;
            let inputValue: string = input.value.trim();
            if (inputValue == "") inputValue = "undefined";
            if (i == 0) criteriaString += ` ${column.value} ${operator.options[operator.selectedIndex].text} ${inputValue}`
            else criteriaString += ` and ${column.value} ${operator.options[operator.selectedIndex].text} ${inputValue}`
        }
        if (i % 2 == 0) labelText += `(${criteriaString})`;
        else labelText += ` or (${criteriaString})`
    }
    label.textContent = labelText;
}

/**
 * Gera todas as possiveis suggestoes sem conflitos, aplicando os na tabela.
*/
function generateSugestions(mainDiv: HTMLDivElement, timeTableElement: HTMLDivElement, characteristicsTableElement: HTMLDivElement) {
    const characteristics = getCharacteristics(mainDiv, characteristicsTableElement, GetCarateristicas());
    if (characteristics.length == 0) {
        window.alert("Não existem salas com esses criterios");
        return;
    }
    const table = setData(timeTableElement, GetHorario(), false);
    const timeTable = getFilteredDateHourCombination(mainDiv);
    let temp: any = {};
    for (let i = 0; i != characteristics.length; i++) {
        for (let j = 0; j != timeTable.length; j++) {
            const object = {
                "Nome sala": characteristics[i]["Nome sala"], "Data da aula": timeTable[j].day,
                "Dia da semana": timeTable[j].dayWeek, "Hora início da aula": timeTable[j].startHour,
                "Hora fim da aula": timeTable[j].endHour
            };
            const finalObject = Object.assign(object, characteristics[i]);
            temp[characteristics[i]["Nome sala"] + timeTable[j].day + timeTable[j].startHour] = finalObject;
        }
    }
    const filteredSugestions = removeConflicts(temp, table);
    table.setData(filteredSugestions);

}
/**
 * Remove os conflitos das sugestoes geradas, retornando sugestoes sem conflitos.
*/
function removeConflicts(temp: any, table: Tabulator): any {
    let conflitData: any = {};
    table.getRows(true).forEach((row: any) => {
        const s = row.getData()["Sala atribuída à aula"] + row.getData()["Data da aula"] + row.getData()["Hora início da aula"];
        conflitData[s] = {};
    });
    let rowsWithoutConflicts: any = [];
    Object.keys(temp).forEach((key: any) => {
        if (conflitData[key] === undefined) rowsWithoutConflicts.push(temp[key]);
    });

    return rowsWithoutConflicts;
}

/**
 * Gera sugestoes dos dias em base dos criterios inseridos pelo utilizador.
*/
function daysBasedOnFilter(mainDiv: HTMLDivElement): Date[] {
    const daysToInclude: Date[] = [];

    const filter: NodeListOf<Element> = mainDiv.querySelectorAll(".criteria-container-timeTable");
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



/**
 * Gerar hórarios possiveis baseados nos filtros aplicados
 *
 * @param {number} classDuration - Duração em minutos das aulas
 * @returns {{startHour:string, endHour:string}[]} - Lista de objetos que contêm hora inicial e hora final possivel do filtro
 */
function hoursBasedOnFilter(mainDiv: HTMLDivElement): { startHour: string, endHour: string }[] {
    const hours: string[] = [];
    const filter: NodeListOf<Element> = mainDiv.querySelectorAll(".criteria-container-timeTable");
    const durationElement = mainDiv.querySelector(".criteria-duration-selector") as HTMLSelectElement;
    const classDuration: number = Number(durationElement.value);
    for (let j = 0; j != filter.length; j++) {
        const criteriaContainerComponents = filter[j].querySelectorAll(".criteria-container-components");
        let initialHour = new Date("1 08:00");
        let finalHour = new Date("1 22:00");
        const hoursFromAnd: string[] = [];
        const hoursToExclude: string[] = [];
        console.log('oi')
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
            console.log('entrou')
            hoursFromAnd.push(...(getClassesStartingHours(initialHour, finalHour, classDuration)))
        }
        hours.push(...(hoursFromAnd.filter((hour) => hoursToExclude.indexOf(hour) < 0)))

    }
    return [...(new Set(hours))].map((startingHour) => {
        const endingHourDate = new Date(`1 ${startingHour}`)
        endingHourDate.setMinutes(endingHourDate.getMinutes() + classDuration);
        return { startHour: startingHour, endHour: `${String(endingHourDate.getHours()).padStart(2, '0')}:${String(endingHourDate.getMinutes()).padStart(2, '0')}` }
    });
}

/**
 * Faz merge das sguestoes de horas com as sugestoes de data
*/
function getFilteredDateHourCombination(mainDiv: HTMLDivElement) {
    const combinations: { day: string, dayWeek: string, startHour: string, endHour: string }[] = [];
    const hours: { startHour: string, endHour: string }[] = hoursBasedOnFilter(mainDiv);
    daysBasedOnFilter(mainDiv).forEach((day) => {
        hours.forEach((hour) => combinations.push(Object.assign({ day: formatDateToDDMMYYYY(day), dayWeek: getDayOfWeek(day) }, hour)))
    })
    console.log(combinations);
    return combinations;
}
