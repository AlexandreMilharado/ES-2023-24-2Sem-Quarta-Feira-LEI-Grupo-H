/**
 * Inicializar o tabulator sem dados.
 */
let tabledata = [{ Message: "Dados ainda não inseridos" }];
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
 * Inicializar o Filter Toggle Button no paginator da tabela
 */
let paginators = document.getElementsByClassName("tabulator-paginator");
let filterToggleButton = document.createElement("button");
filterToggleButton.className = "tabulator-filter-toggle-button";

/**
 * Convert a "dd/mm/yyyy" string into a Date object
 *
 * Alternatively, if dd/mm/yy is passed, 1900's will be assumed for yy higher than the last two digits of the current year (+2) and 2000's otherwise
 * @param {string} dateString
 * @returns {Date} date object
 */
function dateStringFormatCToDate(dateString) {
  let dateParts = dateString.split("/");

  const year =
    dateParts[2].length == 4
      ? dateParts[2]
      : dateParts[2] > String(new Date().getYear() + 1900 + 2).slice(2)
      ? "19" + dateParts[2]
      : "20" + dateParts[2];
  return new Date(year + "/" + dateParts[1] + "/" + dateParts[0]);
}

/**
 * Calculate the week number since the beggining of the year.
 *
 * @param {Date} date The date to check for.
 * @param {int} firstDayOfTheWeek (optional) 0 for Sunday, 1 for Monday,...,6 for Saturday.
 * @returns {int} int The number of the week.
 */
function getWeekNumber(date, firstDayOfTheWeek = 1) {
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
 * Temporarilly returns a static vallue working for the 2022-2023 academic year.
 *
 * @param {[{any}]} tableData
 * @returns {{ firstSemesterStart: Date, firstSemesterFinish: Date,secondSemesterStart: Date,secondSemesterFinish: Date}}
 */
function calculateSemesters(tableData) {
  //Semester Beginning dates for 2023/24
  return {
    firstSemesterStart: new Date(2022, 8, 1),
    firstSemesterFinish: new Date(2023, 0, 28),
    secondSemesterStart: new Date(2023, 0, 30),
    secondSemesterFinish: new Date(2023, 6, 1),
  };

  const ucs = [];
  tableData.forEach((value) => {
    const found = ucs.find((v) => {
      return value["uc"] == v["uc"] && value["curso"] == v["curso"];
    });
    if (found) {
      a = dateStringFormatCToDate(value.data);
      if (a < found.firstDate) {
        found.firstDate = a;
      }
      if (a > found.lastDate) {
        found.lastDate = a;
      }
    } else {
      ucs.push({
        curso: value["curso"],
        uc: value["uc"],
        firstDate: dateStringFormatCToDate(value["data"]),
        lastDate: dateStringFormatCToDate(value["data"]),
      });
    }
  });

  console.log(ucs);
  const cursos = new Set(
    ucs.map((v) => {
      return v.curso;
    })
  );
  console.log(cursos);

  const output = {};

  function calculateSemestersPerCourse(ucs) {
    console.log("ucs: ", ucs);
    const firstClass = ucs.reduce((previous, next) => {
      return previous.firstDate < next.firstDate ? previous : next;
    }, (initialValue = ucs[0]));
    const lastClass = ucs.reduce((previous, next) => {
      return previous.lastDate > next.lastDate ? previous : next;
    }, ucs[0]);
    console.log("fc", firstClass, "lc", lastClass);
    const semesters = []; //[{ucs:["DIAM,PISID,ES"],firstDate:...,lastDate:...},...]
    function addClass() {
      function intercepts() {}
    }
    return { firstClass: new Date(), lastClass: new Date() };
  }

  cursos.forEach((value) => {
    console.log("curso:", value);
    const curso = ucs.filter((v) => {
      return v.curso == value;
    }); //tem apenas as UCs de um curso
    console.log("curso", curso);
    calculateSemestersPerCourse(curso);
  });

  const firstSemesterStart = tableData[0]["data"];
  const secondSemesterStart = tableData[1]["data"];
  return {
    firstSemesterStart: firstSemesterStart,
    secondSemesterStart: secondSemesterStart,
    firstSemesterFinish: firstSemesterFinish,
    secondSemesterFinish: secondSemesterFinish,
  };
}

const {
  firstSemesterStart: semester1Start,
  secondSemesterStart: semester2Start,
} = calculateSemesters(tabledata);

/**
 * Calculate the week number since the beggining of the current semester.
 *
 * @param {Date} date The date to check for.
 * @param {Date} firstSemesterStart beggining date for the first semester (usually September)
 * @param {Date} secondSemesterStart beggining date for the second semester (usually February)
 * @returns {int} int The number of the semester's week.
 */
function getSemesterWeekNumber(
  date,
  firstSemesterStart = semester1Start,
  secondSemesterStart = semester2Start
) {
  const semesterStart =
    date < secondSemesterStart ? firstSemesterStart : secondSemesterStart;
  const weekNumberOfSemesterStart = getWeekNumber(semesterStart);
  const weekNumberOfDate = getWeekNumber(date);
  return weekNumberOfDate - weekNumberOfSemesterStart + 1;
}

//Adding week numbers to the list
tabledata.forEach((row) => {
  dateObject = dateStringFormatCToDate(row.data);
  row.semana_do_ano = getWeekNumber(dateObject);
  row.semana_do_semestre = getSemesterWeekNumber(dateObject);
});

/**
 * Atualizar os dados no Tabulator consoante o ficheiro .CSV formatado:
 * [{...},{...}, {...}, ...]
 *
 * @param {FormatedCsvFile} file
 */
export function setData(file) {
  tabledata = file;
  table = new Tabulator("#HorarioPrincipal", {
    headerFilterPlaceholder: "Filtrar por",
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
  renderFilterProps();
}

/**
 * Adiciona os filtros no tabela e desliga-os para não aparecerem no ecrã(aparecem por default).
 */
function renderFilterProps() {
  for (let i = 0; i < paginators.length; i++) {
    paginators.item(i).prepend(filterToggleButton);
    filterToggleButton.addEventListener("click", () => toggleFilter());
  }

  let horario = document.getElementById("HorarioPrincipal");
  horario.setAttribute("filters", "off");
}

/**
 * Função que liga/desliga os filtros.
 */
function toggleFilter() {
  let table = document.getElementById("HorarioPrincipal");
  let toggled = table.getAttribute("filters");
  if (toggled == null || toggled == "off") {
    table.setAttribute("filters", "on");
  } else {
    table.setAttribute("filters", "off");
  }
}
