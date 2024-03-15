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
