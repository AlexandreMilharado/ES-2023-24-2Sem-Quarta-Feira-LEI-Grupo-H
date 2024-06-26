import Tabulator from "tabulator-tables";
import { TableRow } from "./interfaces";
import { dateComparator, dateStringFormatCToDate, formatDateToDDMMYYYY, getClassesStartingHours, getDayOfWeek, getDayOfWeekFromDate, getDaysFromRange, getSemesterStarts, getSemesterWeekNumber, getWeekNumber } from "./dates";
import { customFilter, setData } from "./table";
import { GetCarateristicas, GetHorario, sortFiles } from "./variables";
import { stringToHTMLElement } from "../tests/utilities";

//Variaveis globais
let table: Tabulator;

//
createHtmlElements();

/**
 * Cria os botões que mostram a UI para sugerir slots das aulas de substituição.
 */
export function createHtmlElements(): void {
  sortFiles();//Para garantir que a ordem dos ficheiros encontra-se coerente.
  const replacementClassCriteriaContainer: HTMLDivElement = document.querySelector("#ReplacementClassCriteria") as HTMLDivElement;
  const replacementClassContainer = document.getElementById("ReplacementClass") as HTMLDivElement;
  addformManualSugestion(replacementClassContainer, "ReplacementClassTimeTable");
  //Criação do botão para sugerir slots as aulas de substituição
  const suggestSlotReplaceButton: HTMLButtonElement = document.createElement("button");
  suggestSlotReplaceButton.textContent = "Sugerir slots para alocação da aula de substituição";
  suggestSlotReplaceButton.classList.add("styled-button");
  suggestSlotReplaceButton.addEventListener("click", () => {
    if (suggestSlotReplaceButton.value == "On") {
      suggestSlotReplaceButton.value = "Off"
      if (replacementClassContainer != null)
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
  const replacementClassTimeTable = document.getElementById("ReplacementClassTimeTable") as HTMLDivElement;
  const buttonAddSuggestions = document.createElement("button");
  buttonAddSuggestions.classList.add("styled-button");
  buttonAddSuggestions.textContent = "Alocar slot";
  buttonAddSuggestions.addEventListener("click", () => addSuggestion(buttonAddSuggestions));

  showCriteriaSuggestSlots(replacementClassCriteriaContainer, replacementClassTimeTable);
  if (replacementClassContainer != null)
    replacementClassContainer.style.display = "none";
  document.getElementById("SuggestSlots")?.insertBefore(suggestSlotReplaceButton,
    document.getElementById("ReplacementClass") as HTMLDivElement);
  replacementClassTimeTable?.parentElement?.querySelector(".flex-centered")?.appendChild(buttonAddSuggestions);
  //

}

/**
 * Cria formulário para adicionar sugestão manual na tabela previamente gerada de sugetões.
 * @param {HTMLDivElement} replacementClassTimeTable - Div a inserir formulário
 * @param {string} addToTable - Nome da classe Tabulator a adicionar sugestão manual
 */
export function addformManualSugestion(replacementClassTimeTable: HTMLDivElement, addToTable: string) {
  function isValidForms(inicio: string, fim: string, sala: string) {
    const init = inicio.split(":");
    const end = fim.split(":");
    const tempTable = setData(document.getElementById("tempTable") as HTMLDivElement, GetCarateristicas(), false);
    tempTable.setFilter("Nome sala", "=", sala);
    return Number(init[0] + init[1]) < Number(end[0] + end[1]) && Number(init[1]) % 30 == 0 && Number(end[1]) % 30 == 0 && tempTable.getRows(true).length > 0;
  }
  function updateSugestion(event: SubmitEvent) {
    if (!event) return;

    event.preventDefault();

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    if (!isValidForms(formData.get("inicio-add-sugestion") as string, formData.get("fim-add-sugestion") as string, formData.get("sala-add-sugestion") as string)) {
      window.alert("Não existem salas com esse nome ou a hora de inicio e fim são inválidas");
      (event.currentTarget as HTMLFormElement).reset();
    }

    const updatedData = {
      "Sala atribuída à aula": formData.get("sala-add-sugestion") as string,
      "Data da aula": formatDateToDDMMYYYY(new Date(formData.get("data-add-sugestion") as string)),
      "Dia da semana": getDayOfWeekFromDate(new Date(formData.get("data-add-sugestion") as string)),
      "Hora início da aula": formData.get("inicio-add-sugestion") as string + ":00",
      "Hora fim da aula": formData.get("fim-add-sugestion") as string + ":00"
    }
    table.addRow(updatedData, true);
    (event.currentTarget as HTMLFormElement).reset();
  }

  replacementClassTimeTable?.parentElement?.querySelector(".flex-centered")?.append(stringToHTMLElement(`<h3>Adicionar uma sugestão manualmente!</h3>`) as HTMLElement)
  const addManualSugestion: HTMLDivElement = document.createElement("div");
  addManualSugestion.innerHTML = `<form id="add-sugestion-form-${addToTable}" method="post">
                <label for="sala-add-sugestion">Nome da Sala
                  <input class="styled-input" id="sala-add-sugestion" name="sala-add-sugestion" type="text" required>
                </label>
                <label for="data-add-sugestion">Data
                  <input class="styled-input" id="data-add-sugestion" name="data-add-sugestion" type="date" required>
                </label>
                <label for="inicio-add-sugestion">Hora de Inicio
                  <input class="styled-input" id="inicio-add-sugestion" name="inicio-add-sugestion" type="time" required>
                </label>
                <label for="fim-add-sugestion">Hora de Fim
                  <input class="styled-input" id="fim-add-sugestion" name="fim-add-sugestion" type="time" required>
                </label>   
                <input class="styled-button" type="submit" value="Adicionar sugestão">
              </form>`;
  addManualSugestion.classList.add("add-suggestion-div");
  replacementClassTimeTable?.parentElement?.querySelector(".flex-centered")?.append(addManualSugestion);
  document.getElementById(`add-sugestion-form-${addToTable}`)?.addEventListener("submit", updateSugestion);
}
/**
 * Cria um container com um criterio, e um botão de crirar novo container.
 * @param {HTMLDivElement} mainDiv -Container principal
 * @param  {HTMLDivElement} timeTableElement --Container da tabela dos horarios
*/
export function showCriteriaSuggestSlots(mainDiv: HTMLDivElement, timeTableElement: HTMLDivElement): void {
  const buttonAddNewCriteriaDivTimeTable: HTMLButtonElement = document?.createElement("button");
  buttonAddNewCriteriaDivTimeTable.textContent = "Or"
  const timeTableContainer = mainDiv?.querySelector(".ContainerTimeTable") as HTMLDivElement;
  buttonAddNewCriteriaDivTimeTable.addEventListener("click", () => addNewCriteriaContainer(timeTableContainer, buttonAddNewCriteriaDivTimeTable, "timeTable"));


  timeTableContainer?.appendChild(buttonAddNewCriteriaDivTimeTable);

  createCriteriaContainer(timeTableContainer, buttonAddNewCriteriaDivTimeTable, "timeTable").prepend(createSelectWithOptionsToClassDuration(document));

  const buttonAddNewCriteriaDivCharacteristics: HTMLButtonElement = document?.createElement("button");
  buttonAddNewCriteriaDivCharacteristics.textContent = "Or"
  const characteristicsContainer = mainDiv?.querySelector(".ContainerCharacteristics") as HTMLDivElement;
  buttonAddNewCriteriaDivCharacteristics.addEventListener("click", () => addNewCriteriaContainer(characteristicsContainer, buttonAddNewCriteriaDivCharacteristics, "characteristics"));


  characteristicsContainer?.appendChild(buttonAddNewCriteriaDivCharacteristics);

  createCriteriaContainer(characteristicsContainer, buttonAddNewCriteriaDivCharacteristics, "characteristics");

  const buttonCreateTable: HTMLButtonElement = document.createElement("button");
  buttonCreateTable.textContent = "Gerar tabela"
  buttonCreateTable.addEventListener("click", () => {
    buttonCreateTable.parentElement?.parentElement?.querySelector(".flex-centered")?.classList.remove("hidden");
    generateSugestions(mainDiv, timeTableElement);
  });
  buttonCreateTable.classList.add("styled-button");
  mainDiv?.appendChild(buttonCreateTable);
}
/**
 * Cria um novo container com um criterio inserido adicionando tambem um botão de apagar o cotnainer e
 * o filtro "and".
 * @param {HTMLDivElement} mainDiv -Container principal
 * @param  {HTMLButtonElement} buttonAddNewCriteriaContainer -Botão que permite criar um novo container de criterio 
 * @param  {string} typeOfOptions -Indica que tipo de opções vão ser inseridos no select
*/
export function addNewCriteriaContainer(mainDiv: HTMLDivElement, buttonAddNewCriteriaContainer: HTMLButtonElement, typeOfOptions: string): void {
  const criteriaContainer: HTMLDivElement = createCriteriaContainer(mainDiv, buttonAddNewCriteriaContainer, typeOfOptions);
  const label = document.createElement("label");
  label.textContent = "or";
  label.classList.add("line-border");
  mainDiv.insertBefore(label, criteriaContainer);
  criteriaContainer.appendChild(createRemoveButton(mainDiv, criteriaContainer, criteriaContainer.className.split(" ")[1],
    "criteria-container-remove-button", label));
}

/**
 * Cria um novo container (de "and") com um criterio inserido.
 * @param {HTMLDivElement} mainDiv -Container principal
 * @param  {HTMLButtonElement} buttonAddNewCriteriaContainer -Botão que permite criar um novo container de criterio 
 * @param  {string} typeOfOptions -Indica que tipo de opções vão ser inseridos no select
 * @returns {HTMLDivElement} -Retorna um container onde todos os criterios entre sí fazem "and"
*/
export function createCriteriaContainer(mainDiv: HTMLDivElement, buttonAddNewCriteriaContainer: HTMLButtonElement, typeOfOptions: string): HTMLDivElement {
  const criteriaContainer: HTMLDivElement = document.createElement('div');
  if (typeOfOptions == "timeTable") criteriaContainer.className = "criteria-container criteria-container-timeTable";
  else criteriaContainer.className = "criteria-container criteria-container-characteristics";

  //Cria uma Label, que é usada para devolver o feedback do input que o utilizador esta a escrever nos criterios
  const labelDiv: HTMLDivElement = document.createElement("div");
  labelDiv.className = "criteria-label-container";
  const textLabel: HTMLLabelElement = document.createElement("label");
  textLabel.className = "criteria-label";
  labelDiv.appendChild(textLabel);
  //

  mainDiv?.insertBefore(criteriaContainer, buttonAddNewCriteriaContainer);
  const buttonAddNewCriteria: HTMLButtonElement = createNewCriteriaButton(mainDiv, criteriaContainer, typeOfOptions);
  criteriaContainer.appendChild(buttonAddNewCriteria);
  const element: HTMLDivElement = addNewCriteriaOptionToSuggestSlots(typeOfOptions);
  criteriaContainer.insertBefore(element, buttonAddNewCriteria);
  criteriaContainer.appendChild(labelDiv);
  mainDiv?.querySelector(".criteria-label")

  return criteriaContainer;
}
/**
 * Cria um botão que permite criar um novo criterio ao respetivo container.
 * @param {HTMLDivElement} mainDiv -Container principal
 * @param  {HTMLDivElement} container -Container filho
 * @param  {string} typeOfOptions -Indica que tipo de opções vão ser inseridos no select
 * @returns {HTMLButtonElement} -Retorna um botão
 */
function createNewCriteriaButton(mainDiv: HTMLDivElement, container: HTMLDivElement, typeOfOptions: string): HTMLButtonElement {
  const buttonAddNewCriteria: HTMLButtonElement = document.createElement("button");
  buttonAddNewCriteria.textContent = "+And";
  buttonAddNewCriteria.addEventListener("click", () => {
    const label = document.createElement("label");
    label.textContent = "___________And___________";
    const criteriaContainerComponents: HTMLDivElement = addNewCriteriaOptionToSuggestSlots(typeOfOptions);
    criteriaContainerComponents.appendChild(createRemoveButton(mainDiv, criteriaContainerComponents,
      container.className.split(" ")[1], "criteria-remove-button", label));
    container.insertBefore(criteriaContainerComponents, buttonAddNewCriteria);
    // container.insertBefore(label, criteriaContainerComponents);
  });
  return buttonAddNewCriteria;
}
/**
 * Cria um criterio com as opções inseridas.
 * @param  {string} typeOfOptions -Indica que tipo de opções vão ser inseridos no select
 * @returns {HTMLDivElement} -Retorna um criterio
 */
function addNewCriteriaOptionToSuggestSlots(typeOfOptions: string): HTMLDivElement {
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
  criteriaContainerComponents.querySelector(".criteria-column-container")?.appendChild(createSelectWithOptionsToColumns(criteriaContainerComponents, typeOfOptions));
  //
  return criteriaContainerComponents;
}
/**
 * Cria um select com as opçoes inseridas para as colunas da tabela.
 * @param  {HTMLDivElement} criteriaContainerComponents -Container do criterio
 * @param  {string} typeOfOptions -Indica que tipo de opções vão ser inseridos no select
 * @returns {HTMLSelectElement} -Retorna um select
 */
function createSelectWithOptionsToColumns(criteriaContainerComponents: HTMLDivElement, typeOfOptions: string): HTMLSelectElement {
  const select: HTMLSelectElement = document.createElement('select');
  select.className = "criteria-column-selector";
  let options: string = "";
  switch (typeOfOptions) {
    case "timeTable":
      options =
        `
                        <option value="Dia da semana">Dia da semana</option>
                        <option value="Hora início da aula">Hora início da aula</option>
                        <option value="Data da aula">Data da aula</option>
                `
      break;
    case "characteristics":
      options =
        `
                        <option value="Edifício">Edifício</option>
                        <option value="Nome sala">Nome sala</option>
                        <option value="Capacidade Normal">Capacidade Normal</option>
                        <option value="Capacidade Exame">Capacidade Exame</option>
                        <option value="Características">Características</option>
                `
      break;
    default:
      Object.keys(GetHorario()[0]).forEach((column: string) => {
        options += `<option value="${column}">${column}</option>`
      });
  }

  select.innerHTML = options;
  select.addEventListener("change", () => showExtraOptions(criteriaContainerComponents, select.value));
  showExtraOptions(criteriaContainerComponents, select.value);
  return select;
}
/**
 * Cria uma label onde dentro dela se encontra um select com as opçoes inseridas da durção da aula.
 * @returns {HTMLLabelElement} -Retorna um label
 */
export function createSelectWithOptionsToClassDuration(documentElment: Document): HTMLLabelElement {
  const select: HTMLLabelElement = documentElment?.createElement("label");
  const options: string = `       Duração:
                <select class="criteria-duration-selector">
                    <option value="30">30m</option>
                    <option value="60">1h</option>
                    <option value="90">1h30m</option>
                    <option value="120">2h</option>
                    <option value="150">2h30m</option>
                    <option value="180">3h</option>
                </select>
        `;
  select.innerHTML = options;
  return select;
}

/**
 * Dependendo qual é a opção escolhida aparece as opções extra podendo alterar o tipo do input
 * @param  {HTMLDivElement} criteriaContainerComponents -Container do criterio
 * @param  {string} column -Coluna da tabela
 */
function showExtraOptions(criteriaContainerComponents: HTMLDivElement, column: string): void {
  const extraOptions: NodeListOf<HTMLOptionElement> = criteriaContainerComponents.querySelectorAll(".extra-options");
  let display: string;
  let type: string = "text";
  if (column == "Data da aula" || column == "Hora início da aula" || column == "Hora fim da aula") {
    if (column == "Data da aula") type = "date";
    else type = "time";
  }

  criteriaContainerComponents.querySelector("input")!.type = type;

  if (column == "Hora início da aula" || column == "Hora fim da aula" || column == "Data da aula" || column == "Capacidade Normal"
    || column == "Capacidade Exame") {
    display = "block";
  } else display = "none";

  extraOptions.forEach((option) => {
    option.style.display = display;
  });
}

/**
 * Cria um botão que permite remover o criterio associado.
 * @param {HTMLDivElement} mainDiv -Container principal
 * @param  {HTMLDivElement} criteriaContainer - Container
 * @param {string} criteriaContainerName -Nome do container, ao qual vai se buscar os criterios
 * @param  {string} className -Nome da classe do botão
 * @param  {HTMLLabelElement} label -Label
 * @returns {HTMLButtonElement} -Retorna um botão
*/
export function createRemoveButton(mainDiv: HTMLDivElement, criteriaContainer: HTMLDivElement, criteriaContainerName: string, className: string, label: HTMLLabelElement): HTMLButtonElement {
  const removeButton: HTMLButtonElement = document.createElement("button");
  removeButton.className = className;
  removeButton.addEventListener("click", () => {
    criteriaContainer.remove();
    label.remove();
  });
  removeButton.textContent = "X"
  return removeButton;
}

/**
 * Cria uma nova tabela que é utilizada para fazer operações sobre ela, desta forma tem menos features e não se encontra visivel
 * para o utilizador. São inseridos os dados e aplicados os filtros inseridos pelo utilizador, o resultado da aplicação
 * dos filtros sera então o retorno da função, o motivo de ser um any é que não se sabe qual vão ser os criterios
 * utilizados pelo utilizador.
 * @param {HTMLDivElement} mainDiv -Container principal
 * @param  {TableRow} tabledata -Dados do csv
 * @returns {any[]} -Retorna as linhas da tabela caracteristicas da sala, com o nome da sala e com os criterios que o utilizador
 * usou sobre a tabela
 */
export function getCharacteristics(mainDiv: HTMLDivElement, tabledata: TableRow[]): any[] {
  const table = new Tabulator("#tempTable", {
    data: tabledata,
    autoColumns: true,
  });
  const criteriaInputs = getCriteriaInputs(table, mainDiv, "criteria-container-characteristics");
  const usedColumns = criteriaInputs["usedColumns"];
  table.setFilter(customFilter, criteriaInputs["finalFilter"]);
  let filteredRow: any = {};
  table.getRows(true).forEach((row: any) => {
    const object: any = {};
    for (let i = 0; i < usedColumns.length; i++) {
      if (usedColumns[i] != "Nome sala") object[usedColumns[i]] = row.getData()[usedColumns[i]];
    }
    filteredRow[row.getData()["Nome sala"]] = object;
  });
  return filteredRow;
}

/**
 * Pega nos criterios do utilizador.
 * @param  {Tabulator} table -Tabela
 * @param {HTMLDivElement} mainDiv -Container principal
 * @param {string} criteriaContainerName -Nome do container, ao qual vai se buscar os criterios
 * @returns { usedColumns: string[]; finalFilter: string; } -Retorna um objeto onde o primeiro indice representa o nome das
 * colunas que foram usadas nos criterios, e no segundo indice o filtro que vai ser aplicado sobre a tabela
*/
export function getCriteriaInputs(table: Tabulator, mainDiv: HTMLDivElement, criteriaContainerName: string): { usedColumns: string[]; finalFilter: string; } {
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

      if (inputValue == "") continue;
      if (columnValue == "Características") {
        columnValue = inputValue;
        inputValue = "X";
      }
      usedColumns.push(columnValue);
      if (criteriaString == "") criteriaString += `data["${columnValue}"] ${operator.value} "${inputValue}"`;
      else criteriaString += ` && data["${columnValue}"] ${operator.value} "${inputValue}"`;
    }
    if (criteriaString == "") continue;
    if (i != filter.length - 1) finalFilter += "( " + criteriaString + " )" + " || "
    else finalFilter += "( " + criteriaString + " )";
  }
  return { usedColumns, finalFilter };
}

/**
 * Gera todas as possiveis suggestoes sem conflitos, aplicando os na tabela.
 * @param {HTMLDivElement} mainDiv -Container principal
 * @param {HTMLDivElement} timeTableElement -Container da tabela dos horarios
*/
function generateSugestions(mainDiv: HTMLDivElement, timeTableElement: HTMLDivElement): void {
  const characteristics: any = getCharacteristics(mainDiv, GetCarateristicas());
  if (!Object.keys(characteristics).length) {
    window.alert("Não existem salas com esses criterios");
    return;
  }
  table = setData(timeTableElement, GetHorario(), false);
  const timeTable = getFilteredDateHourCombination(mainDiv);
  const suggestions: any = {};
  Object.keys(characteristics).forEach((room: string) => {
    for (let j = 0; j != timeTable.length; j++) {
      const object = {
        "Sala atribuída à aula": room, "Data da aula": timeTable[j].day,
        "Dia da semana": timeTable[j].dayWeek, "Hora início da aula": timeTable[j].startHour + ":00",
        "Hora fim da aula": timeTable[j].endHour + ":00"
      }
      const finalObject = Object.assign(object, characteristics[room]);
      suggestions[room + timeTable[j].day + timeTable[j].endHour + ":00"] = finalObject;
    }
  });
  const filteredSugestions = removeConflicts(suggestions, table);
  table = setData(timeTableElement, filteredSugestions, false);
  return table;
}


/**
 * Remove os conflitos das sugestoes geradas.
 * @param {any} suggestions -Todas possiveis sugestões podendo ter conflitos
 * @param {Tabulator} table -Tabela ao qual vai se buscar as linhas que podem ter conflito com as sugestões
 * @returns { any } -Retorna sugestoes sem conflitos
 */
export function removeConflicts(suggestions: any, table: Tabulator): any {
  let conflitData: any = {};
  let hours: number;
  let minutes: number;
  let time: string;
  table.getRows(true).forEach((row: any) => {
    if (row.getData()["Sala atribuída à aula"] == "") return;
    hours = Number(row.getData()["Hora início da aula"].substring(0, 2));
    minutes = Number(row.getData()["Hora início da aula"].substring(3, 4));
    time = "";
    while (true) {
      if (minutes == 3) {
        minutes = 0;
        hours++;
      } else minutes = 3;
      if (hours < 10) time = `0${hours}:${minutes}0:00`;
      else time = `${hours}:${minutes}0:00`;
      const key = row.getData()["Sala atribuída à aula"] + row.getData()["Data da aula"] + time;
      if (row.getData()["Hora fim da aula"] == time) break;
      conflitData[key] = {};
    }
  });
  let rowsWithoutConflicts: any = [];
  Object.values(suggestions).forEach((data: any) => {
    if (data["Sala atribuída à aula"] == "") return;
    hours = Number(data["Hora início da aula"].substring(0, 2));
    minutes = Number(data["Hora início da aula"].substring(3, 4));
    time = "";
    let haveConflict: boolean = false;
    while (true) {
      if (hours < 10) time = `0${hours}:${minutes}0:00`;
      else time = `${hours}:${minutes}0:00`;
      const key = data["Sala atribuída à aula"] + data["Data da aula"] + time;
      if ((key in conflitData)) {
        haveConflict = true;
        break;
      }
      if (data["Hora fim da aula"] == time) break;
      if (minutes == 3) {
        minutes = 0;
        hours++;
      } else minutes = 3;
    }
    const key: string = data["Sala atribuída à aula"] + data["Data da aula"];
    if (!haveConflict) rowsWithoutConflicts.push(suggestions[key + data["Hora fim da aula"]]);
  });
  return rowsWithoutConflicts;
}

/**
 * Verifica e adiciona todas as sugestoes selecionadas do user
 * @param {HTMLButtonElement} button -Botão que permite adcionar as sugestoes selecionadas a main table
 */
export function addSuggestion(button: HTMLButtonElement) {
  const selectedRows: any = button.parentElement?.parentElement?.querySelectorAll(".row-selected");
  const mainTable = Tabulator.prototype.findTable("#HorarioPrincipal")[0];
  let data;
  if (button.parentElement?.parentElement?.id == "ReplacementClassTable") {
    data = JSON.parse(document.getElementById("ReplacementClassInformation")?.textContent as string);
  } else {
    const userSuggestion = button.parentElement?.querySelector("#ucData")?.querySelectorAll("input") as NodeListOf<HTMLInputElement>;
    for (let i = 0; i != userSuggestion?.length; i++)
      if (userSuggestion[i].value == "") return;
    data = {
      "Curso": userSuggestion[0].value, "Unidade Curricular": userSuggestion[1].value, "Turno": userSuggestion[2].value,
      "Turma": userSuggestion[3].value, "Inscritos no turno": userSuggestion[4].value, "Características da sala pedida": userSuggestion[5].value
    };
  }
  const suggestions: any = {};
  const startSemesterDates = getSemesterStarts(table.getData().map((row: any) => row['Data da aula'] as string));
  selectedRows.forEach((suggestion: any) => {
    const suggestionData = suggestion.querySelectorAll(".tabulator-cell");
    let suggestionObject: string = "";
    for (let i = 0; i != 5; i++) {
      if (i != 4) suggestionObject += `"${suggestionData[i].getAttribute("tabulator-field")}":"${suggestionData[i].textContent}",`;
      else suggestionObject += `"${suggestionData[i].getAttribute("tabulator-field")}":"${suggestionData[i].textContent}"`;
    }
    let updatedData = Object.assign(data, JSON.parse("{" + suggestionObject + "}"));
    const date: string = updatedData["Data da aula"];
    updatedData = Object.assign(updatedData, {
      "Semana do Ano": getWeekNumber(dateStringFormatCToDate(date) as Date),
      "Semana do Semestre": getSemesterWeekNumber(dateStringFormatCToDate(date) as Date, startSemesterDates)
    });
    suggestions[updatedData["Sala atribuída à aula"] + date + updatedData["Hora fim da aula"]] = updatedData;
    if (!Object.keys(removeConflicts(suggestions, mainTable)).length) {
      window.alert("O criterio inserido tem conflitos");
      return;
    }
    mainTable.addRow(updatedData, true);
  });
  table.getRows().forEach((row: any) => {
    if (row.getElement().classList.contains("row-selected")) row.delete();
  });
  mainTable.getRows().forEach((row: any) => {
    if (row.getElement().classList.contains("row-selected")) {
      row.delete();
    }
  });
}

/**
 * Gera sugestoes dos dias em base dos criterios inseridos pelo utilizador.
 * @param {HTMLDivElement} mainDiv -Container principal
 * @returns { Date[] } -Retorna uma lsita de sugestoes das datas
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
    let dayOfWeek: string | undefined = undefined;
    finishDate.setMonth(finishDate.getMonth() + 1);
    for (let i = 0; i != criteriaContainerComponents.length; i++) {
      const column: HTMLSelectElement = criteriaContainerComponents[i].querySelector(".criteria-column-selector") as HTMLSelectElement;
      const operator: HTMLSelectElement = criteriaContainerComponents[i].querySelector(".criteria-filter-option-selector") as HTMLSelectElement;
      const inputValue: HTMLInputElement = criteriaContainerComponents[i].querySelector(".criteria-input") as HTMLInputElement;
      if (column.value !== "Data da aula" && column.value !== "Dia da semana") continue;

      if (operator.value === "==")
        if (column.value === "Data da aula")
          daysToIncludeAux.push(new Date(inputValue.value))
        else
          dayOfWeek = inputValue.value;
      else if (operator.value === "!=")
        column.value === "Data da aula" ?
          daysToExclude.push(new Date(inputValue.value)) :
          daysToExclude.push(...getDaysFromRange(startDate, finishDate, inputValue.value));

      else if (operator.value === "<=") finishDate = new Date(inputValue.value);
      else startDate = new Date(inputValue.value);
    }

    if (daysToIncludeAux.length < 1)
      daysToIncludeAux.push(...getDaysFromRange(startDate, finishDate, dayOfWeek));

    daysToExclude.length ?
      daysToInclude.push(...(
        daysToIncludeAux.filter((element) => daysToExclude.every((excludedDay) => !dateComparator(excludedDay, element)))
      )) :
      daysToInclude.push(...daysToIncludeAux)
  }

  return [...(new Set(daysToInclude))];
}

/**
 * Gerar sugestoes de hórarios possiveis baseados nos criterios inseridos pelo utilziador
 * @returns {{startHour:string, endHour:string}[]} -Retorna uma lista de sugestoes constituida
 * pela hora inicial e hora final
 */
function hoursBasedOnFilter(mainDiv: HTMLDivElement): { startHour: string, endHour: string }[] {
  const hours: string[] = [];
  const filter: NodeListOf<Element> = mainDiv.querySelectorAll(".criteria-container-timeTable");
  const durationElement = mainDiv.querySelector(".criteria-duration-selector") as HTMLSelectElement;
  const classDuration: number = Number(durationElement.value);
  for (let j = 0; j != filter.length; j++) {
    const criteriaContainerComponents = filter[j].querySelectorAll(".criteria-container-components");
    let initialHour = new Date("1 08:00");
    let finalHour = new Date("1 22:30");
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
  return [...(new Set(hours))].map((startingHour) => {
    const endingHourDate = new Date(`1 ${startingHour}`)
    endingHourDate.setMinutes(endingHourDate.getMinutes() + classDuration);
    return { startHour: startingHour, endHour: `${String(endingHourDate.getHours()).padStart(2, '0')}:${String(endingHourDate.getMinutes()).padStart(2, '0')}` }
  });
}
/**
 * Faz merge das listas de  sugestoes de horas e das sugestoes de data
 * @param {HTMLDivElement} mainDiv -Container principal
 * @returns { {day: string, dayWeek: string, startHour: string, endHour: string}[] } -Retorna uma lista resultante
 * da combinação das sugestoes de horario e sugestoes das datas
 */
function getFilteredDateHourCombination(mainDiv: HTMLDivElement): { day: string, dayWeek: string, startHour: string, endHour: string }[] {
  const combinations: { day: string, dayWeek: string, startHour: string, endHour: string }[] = [];
  const hours: { startHour: string, endHour: string }[] = hoursBasedOnFilter(mainDiv);
  daysBasedOnFilter(mainDiv).forEach((day) => {
    hours.forEach((hour) => combinations.push(Object.assign({ day: formatDateToDDMMYYYY(day), dayWeek: getDayOfWeekFromDate(day) }, hour)))
  })
  return combinations;
}
