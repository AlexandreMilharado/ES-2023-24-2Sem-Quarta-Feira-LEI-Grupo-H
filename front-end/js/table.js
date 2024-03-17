/**
 * String a colocar caso não existam dados na célula da tabela.
 * @type {String}
 */
const EMPTY_DATA = "";

/**
 * Funções da Tabela Module
 * @module Tabela
 */

/**
 * Dados provenientes do .CSV file
 * @type {Array<JSON>}
 */
let tabledata = [{ Message: "Dados ainda não inseridos" }];

/**
 * Tabela do Tabulator
 * @type {Tabulator}
 */
let table = new Tabulator("#HorarioPrincipal", {
  data: tabledata,
  layout: "fitDataFill",
  pagination: "local",
  paginationSize: 10,
  paginationSizeSelector: [5, 10, 20, 40],
  movableColumns: false,
  autoColumns: true,
});

/**
 * Footer da tabela relacionada à navegação da mesma.
 * @type {Array<Object>}
 */
let paginators = document.getElementsByClassName("tabulator-paginator");

/**
 * Botão para aplicar a funcionalidade dos filtros.
 * @type {Button}
 */
let filterToggleButton = document.createElement("button");
filterToggleButton.className = "tabulator-filter-toggle-button";

/**
 * Botão para editar/apagar colunas na tabela.
 * @type {Button}
 */
let editToggleButton = document.createElement("button");
editToggleButton.className = "tabulator-edit-toggle-button";
editToggleButton.setAttribute("toggled", "off");

/**
 * Objeto para saber o início do primeiro semestre e segundo semestre.
 * @type {{firstSemesterStart : number, secondSemesterStart: number}}
 */
const {
  firstSemesterStart: semester1Start,
  secondSemesterStart: semester2Start,
} = calculateSemesters(tabledata);

/**
 * Converter String "dd/mm/yyyy" em um Date object.
 *
 * Alternativamente, se dd/mm/yy é passado como argumento,
 * 1900's vai ser assumido para um yy maior que os últimos 2 digitos do ano atual (+2), caso contrário assume-se 2000's.
 *
 * @param {String} dateString - String da Data
 * @returns {Date} - Date Object
 */
function dateStringFormatCToDate(dateString) {
  let dateParts = dateString.split("/");
  if (dateParts.length < 3) return null;

  const year =
    dateParts[2].length == 4
      ? dateParts[2]
      : dateParts[2] > String(new Date().getYear() + 1900 + 2).slice(2)
      ? "19" + dateParts[2]
      : "20" + dateParts[2];
  return new Date(year + "/" + dateParts[1] + "/" + dateParts[0]);
}

/**
 * Calcular o número da semana desde o início do ano.
 *
 * @param {Date} date - a data a verificar
 * @param {int} [firstDayOfTheWeek] - (opcional) 0 para Domingo, 1 para Segunda,...,6 para Sábado
 * @returns {int} - Número da semana
 */
function getWeekNumber(date, firstDayOfTheWeek = 1) {
  if (date === null) return EMPTY_DATA;

  const firstDayOfTheYear = new Date(date.getFullYear(), 0, 1); //January 1st of the same year as date

  var weekStartOffset = firstDayOfTheYear.getDay() - firstDayOfTheWeek;
  weekStartOffset += weekStartOffset < 0 ? 7 : 0;

  const daysElapsedThisYear = Math.ceil(
    Math.abs(date - firstDayOfTheYear) / (1000 * 60 * 60 * 24)
  ); //Days since january 1st

  const correctedDay = daysElapsedThisYear + weekStartOffset;

  const weekNumber = Math.floor(correctedDay / 7) + 1;

  return weekNumber;
}

/**
 * Temporariamente retorna estaticamente o valor para o ano académico 2022-2023.
 *
 * @param {Array<JSON>} tableData - dados do .CSV importado
 * @returns {{ firstSemesterStart: Date, firstSemesterFinish: Date,secondSemesterStart: Date,secondSemesterFinish: Date}} - Início e fim dos semestres
 */
function calculateSemesters(tableData) {
  // Semester Beginning dates for 2023/24
  return {
    firstSemesterStart: new Date(2022, 8, 1),
    firstSemesterFinish: new Date(2023, 0, 28),
    secondSemesterStart: new Date(2023, 0, 30),
    secondSemesterFinish: new Date(2023, 6, 1),
  };

  // TODO - Make Semesters calculation dynamic
  // const ucs = [];
  // tableData.forEach((value) => {
  //   const found = ucs.find((v) => {
  //     return value["uc"] == v["uc"] && value["curso"] == v["curso"];
  //   });
  //   if (found) {
  //     a = dateStringFormatCToDate(value.data);
  //     if (a < found.firstDate) {
  //       found.firstDate = a;
  //     }
  //     if (a > found.lastDate) {
  //       found.lastDate = a;
  //     }
  //   } else {
  //     ucs.push({
  //       curso: value["curso"],
  //       uc: value["uc"],
  //       firstDate: dateStringFormatCToDate(value["data"]),
  //       lastDate: dateStringFormatCToDate(value["data"]),
  //     });
  //   }
  // });

  // console.log(ucs);
  // const cursos = new Set(
  //   ucs.map((v) => {
  //     return v.curso;
  //   })
  // );
  // console.log(cursos);

  // const output = {};

  // function calculateSemestersPerCourse(ucs) {
  //   console.log("ucs: ", ucs);
  //   const firstClass = ucs.reduce((previous, next) => {
  //     return previous.firstDate < next.firstDate ? previous : next;
  //   }, (initialValue = ucs[0]));
  //   const lastClass = ucs.reduce((previous, next) => {
  //     return previous.lastDate > next.lastDate ? previous : next;
  //   }, ucs[0]);
  //   console.log("fc", firstClass, "lc", lastClass);
  //   const semesters = []; //[{ucs:["DIAM,PISID,ES"],firstDate:...,lastDate:...},...]
  //   function addClass() {
  //     function intercepts() {}
  //   }
  //   return { firstClass: new Date(), lastClass: new Date() };
  // }

  // cursos.forEach((value) => {
  //   console.log("curso:", value);
  //   const curso = ucs.filter((v) => {
  //     return v.curso == value;
  //   }); //tem apenas as UCs de um curso
  //   console.log("curso", curso);
  //   calculateSemestersPerCourse(curso);
  // });

  // const firstSemesterStart = tableData[0]["data"];
  // const secondSemesterStart = tableData[1]["data"];
  // return {
  //   firstSemesterStart: firstSemesterStart,
  //   secondSemesterStart: secondSemesterStart,
  //   firstSemesterFinish: firstSemesterFinish,
  //   secondSemesterFinish: secondSemesterFinish,
  // };
}

/**
 * Calcular o número da semana apartir do início do semestre atual.
 *
 * See {@link getWeekNumber}.
 * @param {Date} date - Data a verificar
 * @param {Date} firstSemesterStart - data de início do primeiro semestre (normalmente Setembro)
 * @param {Date} secondSemesterStart - data de início do segundo semestre (normalmente Fevereiro)
 * @returns {int} - Número da semana consoante o semestre
 */
function getSemesterWeekNumber(
  date,
  firstSemesterStart = semester1Start,
  secondSemesterStart = semester2Start
) {
  if (date === null) return EMPTY_DATA;

  const semesterStart =
    date < secondSemesterStart ? firstSemesterStart : secondSemesterStart;
  const weekNumberOfSemesterStart = getWeekNumber(semesterStart);
  const weekNumberOfDate = getWeekNumber(date);
  return weekNumberOfDate - weekNumberOfSemesterStart + 1;
}

/**
 * Atualizar os dados no Tabulator consoante o ficheiro .CSV formatado
 * juntamente com as colunsa do número das semanas.
 * Também é adicionado à tabela os filtros personalizados e a opção de removoção de colunas.
 *
 * See {@link addSemanasColumns} | {@link addHiddenButtonsAndInputsToColumns} | {@link renderFilterProps}.
 *
 * @param {Array<JSON>} file - dados do ficheiro .CSV importado
 */
export function setData(file) {
  tabledata = file;
  addSemanasColumns();

  table = new Tabulator("#HorarioPrincipal", {
    headerFilterPlaceholder: "Filtrar 'AND'",
    data: tabledata,
    layout: "fitDataFill",
    pagination: "local",
    paginationSize: 10,
    paginationSizeSelector: [5, 10, 20, 40],
    movableColumns: false,
    autoColumns: true,
    autoColumnsDefinitions: function (definitions) {
      // Adicionar Filtros no Tabulator
      definitions.forEach((column) => {
        column.headerFilter = true;
      });
      return definitions;
    },
  });
  addHiddenButtonsAndInputsToColumns();
  renderFilterProps();
}

/**
 * Adiciona os filtros no tabela e desliga-os para não aparecerem no ecrã(aparecem por default).
 */
function renderFilterProps() {
  for (let i = 0; i < paginators.length; i++) {
    paginators.item(i).prepend(filterToggleButton);
    filterToggleButton.addEventListener("click", () => toggleFilter());
    paginators.item(i).prepend(editToggleButton);
    editToggleButton.addEventListener("click", () =>
      toggleEdit(editToggleButton)
    );
  }

  let horario = document.getElementById("HorarioPrincipal");
  horario.setAttribute("filters", "off");
}

/**
 * Adiciona em todas as linhas os atributos "Semana do Ano" e "Semana do Semestre".
 * Se a tabledata não tiver o atributo "Data da aula" a função é completamente ignorada.
 *
 * See {@link dateStringFormatCToDate} | {@link getWeekNumber} | {@link getSemesterWeekNumber}.
 */
function addSemanasColumns() {
  tabledata.forEach((row) => {
    let dateObject;
    try {
      dateObject = dateStringFormatCToDate(row["Data da aula"]);
    } catch (error) {
      return;
    }
    row["Semana do Ano"] = getWeekNumber(dateObject);
    row["Semana do Semestre"] = getSemesterWeekNumber(dateObject);
  });
}

/**
 * Função que liga/desliga os filtros.
 * Os filtros têm três estados: AND, OR ou desligado, consoante o número de vezes que esta função
 * é acionda muda os estados do filtro, mundando a funcionalidade de procura para AND, OR ou sem filtro.
 */
function toggleFilter() {
  //off and or
  let table = document.getElementById("HorarioPrincipal");
  let toggled = table.getAttribute("filters");
  if (toggled == "off") {
    table.setAttribute("filters", "and");
    document.querySelectorAll(".tabulator-header-filter").forEach((element) => {
      element.querySelector("input").classList.remove("hidden");
    });
  } else if (toggled == "and") {
    table.setAttribute("filters", "or");
    document.querySelectorAll(".tabulator-header-filter").forEach((element) => {
      element.querySelector("input").classList.add("hidden");
      element.querySelector(".filter-OR").classList.remove("hidden");
    });
  } else {
    table.setAttribute("filters", "off");
    document.querySelectorAll(".tabulator-header-filter").forEach((element) => {
      element.querySelector(".filter-OR").classList.add("hidden");
    });
  }
}

/**
 * Adiciona a todas as colunas o botão de esconder e um novo input de filtro OR.
 */
function addHiddenButtonsAndInputsToColumns() {
  let columns = document.querySelectorAll(".tabulator-col");
  columns.forEach((column) => {
    const button = document.createElement("button");
    button.className = "hidden tabulator-hideColumn-toggle-button";
    //button.textContent = "";

    const input = document.createElement("input");
    input.placeholder = "Filtrar 'OR'";
    input.className = "hidden filter-OR";

    column.querySelector(".tabulator-col-sorter").appendChild(button);
    const nameColumn = column.getAttribute("tabulator-field");
    button.addEventListener("click", () => hideColumn(column, nameColumn));
    column.querySelector(".tabulator-header-filter").appendChild(input);
    input.addEventListener("keypress", () => filterByOr());
  });
}

/**
 * Esconde/mostra os botões para apagar cada coluna na tabela.
 */
function toggleEdit() {
  filterByOr();
  if (editToggleButton.getAttribute("toggled") == "on") {
    editToggleButton.setAttribute("toggled", "off");
    document.querySelectorAll(".tabulator-col-sorter").forEach((element) => {
      element.querySelector(".tabulator-arrow").classList.remove("hidden");
      element
        .querySelector(".tabulator-hideColumn-toggle-button")
        .classList.add("hidden");
    });
  } else {
    editToggleButton.setAttribute("toggled", "on");
    document.querySelectorAll(".tabulator-col-sorter").forEach((element) => {
      element.querySelector(".tabulator-arrow").classList.add("hidden");
      element
        .querySelector(".tabulator-hideColumn-toggle-button")
        .classList.remove("hidden");
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
function hideColumn(column, nameColumn) {
  table.hideColumn(nameColumn);
  addHiddenColumns(column, nameColumn);
}

/**
 * Coloca as colunas escondidas por baixo da tabela principal numa lista
 * de forma a conseguir voltar a metê-las no lugar caso seja desejado.
 *
 * @param {Column} column - coluna da tabela
 * @param {String} nameColumn - nome da coluna
 */
function addHiddenColumns(column, nameColumn) {
  const list = document
    .getElementById("HiddenColumns")
    .getElementsByTagName("ul")[0];
  const button = document.createElement("button");
  button.className = "tabulator-hiddenColumn-toggle-button";
  button.textContent = column.querySelector(".tabulator-col-title").textContent;
  list.appendChild(button);
  button.addEventListener("click", () => {
    button.remove();
    table.showColumn(nameColumn);
  });
}

/**
 * Filtra os dados no Tabulator com o operador lógico "OR".
 */
function filterByOr() {
  const columns = document.querySelectorAll(".tabulator-col");
  let listFilters = [];
  columns.forEach((column) => {
    const filter = column.querySelector(".filter-OR");
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
