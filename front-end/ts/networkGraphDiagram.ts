import anychart from 'anychart';
import { GetHorario } from './variables';
import { customFilter, setData } from './table';
import { createCriteriaContainer, createRemoveButton } from './suggestSlotst';

let table: any;
interface aula {
  "Unidade Curricular": string;
  "Turno": string;
  "Sala": string;
  "Dia": string
  "Hora Inicio": string;
  "Hora Fim": string;
}
createHtmlElements()

/**
 * Cria o botão que mostra a UI para criar um um grafo.
 */
function createHtmlElements(): void {
  const mainDiv: HTMLDivElement = document.getElementById("NetworkDiagram") as HTMLDivElement;
  const criteriaDiv: HTMLDivElement = document.getElementById("NetworkDiagramCriteria") as HTMLDivElement;

  const showConflitButton: HTMLButtonElement = document.createElement("button");
  showConflitButton.textContent = "Network conflit Graph";
  showConflitButton.classList.add("styled-button");
  showConflitButton.addEventListener("click", () => {
    if (showConflitButton.value == "On") {
      showConflitButton.value = "Off"
      mainDiv.style.display = "none";
    } else {
      showConflitButton.value = "On";
      mainDiv.style.display = "block";
    }
  });
  showConflitButton.addEventListener("click", () => {
    table = setData(document.getElementById("tempTable") as HTMLDivElement, GetHorario(), false);
    criteria(criteriaDiv);
  }, { once: true });
  mainDiv.style.display = "none";
  document.getElementById("conflitsNetork")?.insertBefore(showConflitButton, mainDiv);
  const buttonCreateGraph: HTMLButtonElement = document.createElement("button");

  buttonCreateGraph.addEventListener("click", () => {
    table = setData(document.getElementById("tempTable") as HTMLDivElement, GetHorario(), false);
    table.setFilter(customFilter, getCriteriaInputs(criteriaDiv));
    createGraph();
  });
  buttonCreateGraph.textContent = "Gerar grafo"
  buttonCreateGraph.classList.add("styled-button");
  criteriaDiv.appendChild(buttonCreateGraph);
}

/**
 * Cria um novo container (de "and") com um criterio inserido.
 * @param {HTMLDivElement} criteriaDiv -Container dos criterios.
*/
function criteria(criteriaDiv: HTMLDivElement) {
  const buttonAddNewCriteriaDivTimeTable: HTMLButtonElement = document.createElement("button");
  buttonAddNewCriteriaDivTimeTable.textContent = "Or"
  buttonAddNewCriteriaDivTimeTable.addEventListener("click", () => addNewCriteriaContainer(criteriaDiv, buttonAddNewCriteriaDivTimeTable));
  criteriaDiv.appendChild(buttonAddNewCriteriaDivTimeTable);
  createCriteriaContainer(criteriaDiv, buttonAddNewCriteriaDivTimeTable, "fullTimeTable");
}

/**
 * Cria um grafo onde o nó representa a aula e a aresta representa o conflito
*/
function createGraph() {
  const nodes: { "id": string }[] = [];
  const edges: { "from": string, "to": string }[] = [];
  const aulas: any = {};
  table.getRows(true).forEach((row: any) => {
    if (row.getData()["Sala atribuída à aula"] == "") return;
    const aula: aula = {
      "Unidade Curricular": row.getData()["Unidade Curricular"], "Turno": row.getData()["Turno"],
      "Sala": row.getData()["Sala atribuída à aula"], "Dia": row.getData()["Data da aula"],
      "Hora Inicio": row.getData()["Hora início da aula"], "Hora Fim": row.getData()["Hora fim da aula"]
    };
    let hours = Number(row.getData()["Hora início da aula"].substring(0, 2));
    let minutes = Number(row.getData()["Hora início da aula"].substring(3, 4));
    let time = "";
    while (true) {
      if (hours < 10) time = `0${hours}:${minutes}0:00`;
      else time = `${hours}:${minutes}0:00`;
      const key: string = row.getData()["Sala atribuída à aula"] + row.getData()["Data da aula"] + time;
      if (row.getData()["Hora fim da aula"] == time) break;
      if ((key in aulas)) edges.push({ from: JSON.stringify(aula), to: aulas[key] });
      else aulas[key] = JSON.stringify(aula);
      if (minutes == 3) {
        minutes = 0;
        hours++;
      } else minutes = 3;
    }
    nodes.push({ "id": JSON.stringify(aula) });
  });
  const networkDiagramGraph: HTMLDivElement = document.getElementById("NetworkDiagramGraph") as HTMLDivElement;
  networkDiagramGraph.innerHTML = "";
  var chart = anychart.graph({ nodes: nodes, edges: edges });
  chart.title("Conflito com as aulas");
  chart.container("NetworkDiagramGraph").draw();
}

/**
 * Cria um novo container com um criterio inserido adicionando tambem um botão de apagar o cotnainer e 
 * o filtro "and".
 * @param {HTMLDivElement} mainDiv -Container principal
 * @param  {HTMLButtonElement} buttonAddNewCriteriaContainer -Botão que permite criar um novo container de criterio 
*/
function addNewCriteriaContainer(mainDiv: HTMLDivElement, buttonAddNewCriteriaContainer: HTMLButtonElement): void {
  const criteriaContainer: HTMLDivElement = createCriteriaContainer(mainDiv, buttonAddNewCriteriaContainer, "fullTimeTable");
  const label = document.createElement("label");
  label.textContent = "or";
  label.classList.add("line-border");
  mainDiv.insertBefore(label, criteriaContainer);
  criteriaContainer.appendChild(createRemoveButton(mainDiv, criteriaContainer, criteriaContainer.className.split(" ")[1],
    "criteria-container-remove-button", label));
  criteriaContainer.querySelectorAll(".criteria-column-selector").forEach((select) => {
    select.innerHTML = allOptions();
  });
}

/**
 * Pega em todas as colunas da tabela e cria um select para cada essa coluna.
*/
function allOptions() {
  let options = "";
  table.getColumns().forEach((column: any) => {
    options += `<option value="${column.getField()}">${column.getField()}</option>`
  });
  return options;
}

/**
 * Pega nos criterios do utilizador.
 * @param {HTMLDivElement} mainDiv -Container principal
 * @returns {string} -Retorna o filtro que vai ser aplicado sobre a tabela
*/
function getCriteriaInputs(mainDiv: HTMLDivElement): string {
  let finalFilter: string = "";
  table.clearFilter();
  const filter: NodeListOf<Element> = mainDiv.querySelectorAll(".criteria-container-characteristics");
  for (let i = 0; i != filter.length; i++) {
    let criteriaString: string = "";
    const criteriaContainerComponents = filter[i].querySelectorAll(".criteria-container-components");
    for (let i = 0; i != criteriaContainerComponents.length; i++) {
      const column: HTMLSelectElement = criteriaContainerComponents[i].querySelector(".criteria-column-selector") as HTMLSelectElement;
      const operator: HTMLSelectElement = criteriaContainerComponents[i].querySelector(".criteria-filter-option-selector") as HTMLSelectElement;
      const input: HTMLInputElement = criteriaContainerComponents[i].querySelector(".criteria-input") as HTMLInputElement;
      let columnValue: string = column.value;
      let inputValue: string = input.value.trim();
      let typeData: string = "";
      console.log("inputValue " + inputValue)
      if (inputValue == "") continue;
      if (columnValue == "Características") {
        columnValue = inputValue;
        inputValue = "X";
      } else if (input.type == "time") {
        inputValue = new Date("1970-01-01T" + (inputValue)).getTime().toString();
        typeData = `new Date("1970-01-01T"+(data["${columnValue}"])).getTime()`;
      } else if (input.type == "date") {
        typeData = `new Date(formatStringToMMDDYYY(data["${columnValue}"])).getTime()`;
        inputValue = new Date(inputValue).getTime().toString();
      }
      if (typeData == "") typeData = `data["${columnValue}"]`;
      if (criteriaString == "") criteriaString += `${typeData} ${operator.value} "${inputValue}"`;
      else criteriaString += ` && ${typeData} ${operator.value} "${inputValue}"`;
    }
    if (i != filter.length - 1) finalFilter += "( " + criteriaString + " )" + " || "
    else finalFilter += "( " + criteriaString + " )";
  }
  console.log("finalFilter: " + finalFilter);
  if (finalFilter == "(  )") finalFilter = "";
  return finalFilter;
}