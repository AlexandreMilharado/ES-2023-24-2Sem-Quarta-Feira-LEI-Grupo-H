//MERAMENTE UMA TEMPLATE

let tabledata = [{}];
let table = new Tabulator("#HorarioPrincipal", {
  headerFilterPlaceholder: "Filtrar por",
  data: tabledata,
  layout: "fitDataFill",
  pagination: "local",
  paginationSize: 10,
  paginationSizeSelector: [5, 10, 20, 40],
  movableColumns: false,
  autoColumns: true,
});

//Iniciar a tabela com os filtros desligados (estao ligados por default)
let horario = document.getElementById("HorarioPrincipal");
horario.setAttribute("filters", "off");

//Inserir Filter Toggle Button no paginator da tabela pre-feita
let paginators = document.getElementsByClassName("tabulator-paginator");
let filterToggleButton = document.createElement("button");
filterToggleButton.className = "tabulator-filter-toggle-button";
for (let i = 0; i < paginators.length; i++) {
  paginators.item(i).prepend(filterToggleButton);
  filterToggleButton.addEventListener("click", () => toggleFilter());
}

//funcao que liga/desliga os filtros
function toggleFilter() {
  let table = document.getElementById("HorarioPrincipal");
  let toggled = table.getAttribute("filters");
  if (toggled == null || toggled == "off") {
    table.setAttribute("filters", "on");
  } else {
    table.setAttribute("filters", "off");
  }
}

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
  });
}
