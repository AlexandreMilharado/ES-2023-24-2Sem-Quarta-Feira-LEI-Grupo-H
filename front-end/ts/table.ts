import Tabulator from "tabulator-tables";
import ColumnDefinition from "tabulator-tables";
import {
  dateStringFormatCToDate,
  formatStringToMMDDYYY,
  getSemesterStarts,
  getSemesterWeekNumber,
  getWeekNumber,
} from "./dates";
import { TableRow } from "./interfaces";
import { togglePopUpSave } from "./popUp";
import { createHtmlElements } from "./suggestSlotst"
import { GetHorario, sortFiles } from "./variables";

/**
 * Funções da Tabela Module
 * @module Tabela
 */

/**
 * Dados provenientes do .CSV file
 *
 * See {@link TableRow}
 * @type {TableRow[]}
 */
export let tabledata: TableRow[] = [{ Message: "Dados ainda não inseridos" }];

/**
 * Tabela do Tabulator
 * @type {Tabulator}
 */
// export let table: Tabulator = new Tabulator("#HorarioPrincipal", {
//   data: tabledata,
//   layout: "fitDataFill",
//   pagination: "local",
//   paginationSize: 10,
//   paginationSizeSelector: [5, 10, 20, 40],
//   movableColumns: false,
//   autoColumns: true,
// });

/**
 * Footer da tabela relacionada à navegação da mesma.
 * @type {HTMLCollectionOf<Element>}
 */
// let paginators: HTMLCollectionOf<Element> = document.getElementsByClassName(
//   "tabulator-paginator"
// );

/**
 * Botão para aplicar a funcionalidade dos filtros.
 * @type {HTMLButtonElement}
 */
// let filterToggleButton: HTMLButtonElement;

/**
 * Botão para ativar/desativar o pop up de salvar a tabela.
 * @type {HTMLButtonElement}
 */
let savePopUpButton: HTMLButtonElement;

/**
 * Botão para editar/apagar colunas na tabela.
 * @type {HTMLButtonElement}
 */
// let editToggleButton: HTMLButtonElement;

/**
 * Lista para mostrar as colunas escondidas.
 * @type {HTMLUListElement}
 */
// let list: HTMLUListElement = document
//   .getElementById("HorarioPrincipalHiddenColumns")
//   ?.getElementsByTagName("ul")[0] as HTMLUListElement;

/**
 * Atualizar os dados no Tabulator consoante o ficheiro .CSV formatado
 * juntamente com as colunsa do número das semanas.
 * Também é adicionado à tabela os filtros personalizados e a opção de removoção de colunas.
 *
 * See {@link addSemanasColumns} | {@link addHiddenButtonsAndInputsToColumns} | {@link renderFilterProps} | {@link TableRow}.
 *
 * @param {TableRow[]} file - dados do ficheiro .CSV importado
 */
export function setData(tableElement: HTMLDivElement, file: TableRow[], addSemana = true): Tabulator {
  tabledata = file;
  if (addSemana) addSemanasColumns(file);
  sortFiles();
  const table = new Tabulator("#" + tableElement.id, {
    headerFilterPlaceholder: "Filtrar 'AND'",
    rowClick: function (e: any, row: any) {
      const tableElement: HTMLDivElement = row.getElement().parentElement.parentElement.parentElement;
      const size = row.getElement().parentElement.querySelectorAll(".row-selected").length;
      if (tableElement.querySelector(".tabulator-edit-toggle-button")?.getAttribute("toggled") == "on") {
        row.delete();
        return;
      }

      if (tableElement.id == "HorarioPrincipal") {
        formatText(row.getData());
        // const data = document.getElementById("ReplacementClassInformation") as HTMLDivElement;
        // data.innerHTML = JSON.stringify(row.getData());

      } else if (tableElement.id == "UcClassTimeTable") {
        if (size >= Number(document.getElementById("UcClassInformation")?.querySelector("label")?.querySelector("input")?.value as string)) {
          row.getElement().classList.remove("row-selected");
          return;
        }
      }
      if (size >= 1 && tableElement.id != "UcClassTimeTable") {
        row.getElement().classList.remove("row-selected");
        return;
      }

      if (row.getElement().classList.contains("row-selected")) row.getElement().classList.remove("row-selected");
      else row.getElement().classList.add("row-selected");

    },
    data: file,
    layout: "fitDataFill",
    pagination: "local",
    paginationSize: 10,
    paginationSizeSelector: [5, 10, 20, 40],
    movableColumns: false,
    autoColumns: true,
    autoColumnsDefinitions: function (definitions: ColumnDefinition[]) {
      // Adicionar Filtros no Tabulator
      definitions.forEach((column: ColumnDefinition) => {
        column.headerFilter = true;
      });
      return definitions;
    },
  });

  savePopUpButton = document.createElement("button");
  savePopUpButton.className = "tabulator-save-toggle-button";

  renderFilterProps(tableElement);
  addHiddenButtonsAndInputsToColumns(table, tableElement);
  return table;
}

/**
 * Formata a tabela para aplicar css.
 * @param {TableRow[]} data - tabela a colocar
 */
function formatText(data: TableRow[]) {
  const element = document.getElementById("ReplacementClassInformation") as HTMLDivElement;
  const dataString = JSON.stringify(data).replace(/["']/g, '').split(",");
  let string = ""
  const container = document.createElement("div");
  for (let i = 0; i != dataString.length; i++) {
    const column = dataString[i].split(":");
    string +=
      `
        <div>
          <span>
            ${column[0]}
          </span>
          ${column[1]}
        </div>
      `
  }
  element.innerHTML = string;
}

/**
 * Adiciona os filtros no tabela e desliga-os para não aparecerem no ecrã(aparecem por default).
 */
function renderFilterProps(tableElement: HTMLDivElement): void {
  const editToggleButton = document.createElement("button");
  editToggleButton.className = "tabulator-edit-toggle-button";
  editToggleButton.setAttribute("toggled", "off");

  const filterToggleButton = document.createElement("button");
  filterToggleButton.className = "tabulator-filter-toggle-button";

  const paginators: HTMLCollectionOf<Element> = tableElement.getElementsByClassName("tabulator-paginator");

  for (let i = 0; i < paginators.length; i++) {
    paginators.item(i)?.prepend(filterToggleButton);
    filterToggleButton.addEventListener("click", () => toggleFilter(tableElement));
    paginators.item(i)?.prepend(editToggleButton);
    editToggleButton.addEventListener("click", () => toggleEdit(tableElement, editToggleButton));
    paginators.item(i)?.prepend(savePopUpButton);
    savePopUpButton.addEventListener("click", () => togglePopUpSave(true, document));
  }

  // let horario: HTMLElement = document.getElementById(
  //   "HorarioPrincipal"
  // ) as HTMLElement;
  ///Ciriei esta funcao
  // createHtmlElements();
  tableElement.setAttribute("filters", "off");
}

/**
 * Adiciona em todas as linhas os atributos "Semana do Ano" e "Semana do Semestre".
 * Se a tabledata não tiver o atributo "Data da aula" a função é completamente ignorada.
 * Se já existir pelo menos uma semana do ano ou semana do semestre, esta função é ignorada.
 *
 * See {@link dateStringFormatCToDate} | {@link getWeekNumber} | {@link getSemesterWeekNumber}.
 */
export function addSemanasColumns(tabledata: TableRow[]): void {
  if (!tabledata.some(row => row.hasOwnProperty('Data da aula'))) return;

  const startSemesterDates = getSemesterStarts(tabledata.map((row) => row['Data da aula'] as string));
  tabledata.forEach((row) => {
    let dateObject: Date;
    try {
      dateObject = dateStringFormatCToDate(
        row["Data da aula"] as string
      ) as Date;
    } catch (error) {
      return;
    }
    row["Semana do Ano"] = getWeekNumber(dateObject);
    row["Semana do Semestre"] = getSemesterWeekNumber(dateObject, startSemesterDates);
  });
}

/**
 * Função que liga/desliga os filtros.
 * Os filtros têm três estados: AND, OR ou desligado, consoante o número de vezes que esta função
 * é acionda muda os estados do filtro, mundando a funcionalidade de procura para AND, OR ou sem filtro.
 */
function toggleFilter(tableElement: HTMLDivElement): void {
  //off and or
  // let table: HTMLElement = document.getElementById(
  //   "HorarioPrincipal"
  // ) as HTMLElement;
  let toggled = tableElement.getAttribute("filters");

  if (toggled == "off") {
    tableElement.setAttribute("filters", "and");
    tableElement.querySelectorAll(".tabulator-header-filter").forEach((element) => {
      element.querySelector("input")?.classList.remove("hidden");
    });
  } else if (toggled == "and") {
    tableElement.setAttribute("filters", "or");
    tableElement.querySelectorAll(".tabulator-header-filter").forEach((element) => {
      element.querySelector("input")?.classList.add("hidden");
      element.querySelector(".filter-OR")?.classList.remove("hidden");
    });
  } else {
    tableElement.setAttribute("filters", "off");
    tableElement.querySelectorAll(".tabulator-header-filter").forEach((element) => {
      element.querySelector(".filter-OR")?.classList.add("hidden");
    });
  }
}

/**
 * Adiciona a todas as colunas o botão de esconder e um novo input de filtro OR.
 */
function addHiddenButtonsAndInputsToColumns(table: Tabulator, tableElement: HTMLDivElement): void {
  let columns: NodeListOf<Element> =
    tableElement.querySelectorAll(".tabulator-col");

  columns.forEach((column) => {
    const button: HTMLButtonElement = document.createElement("button");
    button.className = "hidden tabulator-hideColumn-toggle-button";
    //button.textContent = "";

    const input: HTMLInputElement = document.createElement("input");
    input.placeholder = "Filtrar 'OR'";
    input.className = "hidden filter-OR";

    column.querySelector(".tabulator-col-sorter")?.appendChild(button);
    const nameColumn: string = column.getAttribute(
      "tabulator-field"
    ) as string;
    button.addEventListener("click", () => hideColumn(table, tableElement, column, nameColumn));
    column.querySelector(".tabulator-header-filter")?.appendChild(input);
    input.addEventListener("keypress", () => filterByOr(table, tableElement));
  });
}

/**
 * Esconde/mostra os botões para apagar cada coluna na tabela.
 */
function toggleEdit(tableElement: HTMLDivElement, editToggleButton: HTMLButtonElement): void {
  if (editToggleButton.getAttribute("toggled") == "on") {
    editToggleButton.setAttribute("toggled", "off");
    tableElement.querySelectorAll(".tabulator-col-sorter").forEach((element) => {
      element.querySelector(".tabulator-arrow")?.classList.remove("hidden");
      element
        .querySelector(".tabulator-hideColumn-toggle-button")
        ?.classList.add("hidden");
    });
  } else {
    editToggleButton.setAttribute("toggled", "on");
    tableElement
      .querySelectorAll(".tabulator-col-sorter")
      .forEach((element) => {
        element
          .querySelector(".tabulator-arrow")
          ?.classList.add("hidden");
        element
          .querySelector(".tabulator-hideColumn-toggle-button")
          ?.classList.remove("hidden");
      });
  }
}

/**
 * Esconde as colunas e adiciona-as numa lista para poderem ser eventualmente recuperadas através da função "addHiddenColumns".
 *
 * See {@link addHiddenColumns}.
 * @param {Column} column - coluna da tabela
 * @param {String} nameColumn - nome da coluna
 */
function hideColumn(table: Tabulator, tableElement: HTMLDivElement, column: ColumnDefinition, nameColumn: string): void {
  table.hideColumn(nameColumn);
  addHiddenColumns(table, tableElement, column, nameColumn);
}

/**
 * Coloca as colunas escondidas por baixo da tabela principal numa lista
 * de forma a conseguir voltar a metê-las no lugar caso seja desejado.
 *
 * @param {Column} column - coluna da tabela
 * @param {String} nameColumn - nome da coluna
 */
function addHiddenColumns(table: Tabulator, tableElement: HTMLDivElement, column: ColumnDefinition, nameColumn: string): void {
  const button: HTMLButtonElement = document.createElement("button");
  button.className = "tabulator-hiddenColumn-toggle-button";
  button.textContent = column.querySelector(".tabulator-col-title").textContent;
  document.getElementById(tableElement.id + "HiddenColumns")?.querySelector("ul")?.appendChild(button);
  button.addEventListener("click", () => {
    button.remove();
    table.showColumn(nameColumn);
  });
}

/**
 * Filtra os dados no Tabulator com o operador lógico "OR".
 */
function filterByOr(table: Tabulator, tableElement: HTMLDivElement): void {
  const columns: NodeListOf<Element> =
    tableElement.querySelectorAll(".tabulator-col");
  let listFilters: any[] = [];
  columns.forEach((column) => {
    const filter: any = column.querySelector(".filter-OR");
    const inputValue = filter.value.trim();
    if (inputValue.length > 0) {
      listFilters.push({
        field: column.getAttribute("tabulator-field"),
        type: "like",
        value: inputValue,
      });
    }
  });
  table.setFilter([listFilters]);
}

export function customFilter(data: Tabulator, filterParams: string) {
  return eval(filterParams);
}
formatStringToMMDDYYY