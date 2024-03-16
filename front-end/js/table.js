//MERAMENTE UMA TEMPLATE

console.log("CHECK")
var tabledata = [
    { curso: "LEI", uc: "TC", turno: "Manha", turma: "EI03", num_inscritos: "34", dia_semana: "Ter.", hora_inicio: "11h00", hora_final: "12h30", data: "2/11/22", caracteristicas: "-", sala: "C6.01" },
    { curso: "HMP", uc: "ADCS", turno: "Manha", turma: "H01", num_inscritos: "15", dia_semana: "Qui.", hora_inicio: "13h00", hora_final: "16h00", data: "10/12/23", caracteristicas: "Computadores", sala: "D1.07" },
    { curso: "ETI", uc: "AR", turno: "Tarde", turma: "ET07", num_inscritos: "29", dia_semana: "Qua.", hora_inicio: "14h30", hora_final: "16h00", data: "8/10/23", caracteristicas: "Servidores", sala: "C7.06" },
    { curso: "LEI", uc: "TC", turno: "Manha", turma: "EI03", num_inscritos: "34", dia_semana: "Ter.", hora_inicio: "11h00", hora_final: "12h30", data: "2/11/22", caracteristicas: "-", sala: "C6.01" },
    { curso: "HMP", uc: "ADCS", turno: "Manha", turma: "H01", num_inscritos: "15", dia_semana: "Qui.", hora_inicio: "13h00", hora_final: "16h00", data: "10/12/23", caracteristicas: "Computadores", sala: "D1.07" },
    { curso: "ETI", uc: "AR", turno: "Tarde", turma: "ET07", num_inscritos: "29", dia_semana: "Qua.", hora_inicio: "14h30", hora_final: "16h00", data: "8/10/23", caracteristicas: "Servidores", sala: "C7.06" },
    { curso: "LEI", uc: "TC", turno: "Manha", turma: "EI03", num_inscritos: "34", dia_semana: "Ter.", hora_inicio: "11h00", hora_final: "12h30", data: "2/11/22", caracteristicas: "-", sala: "C6.01" },
    { curso: "HMP", uc: "ADCS", turno: "Manha", turma: "H01", num_inscritos: "15", dia_semana: "Qui.", hora_inicio: "13h00", hora_final: "16h00", data: "10/12/23", caracteristicas: "Computadores", sala: "D1.07" },
    { curso: "ETI", uc: "AR", turno: "Tarde", turma: "ET07", num_inscritos: "29", dia_semana: "Qua.", hora_inicio: "14h30", hora_final: "16h00", data: "8/10/23", caracteristicas: "Servidores", sala: "C7.06" },
    { curso: "LEI", uc: "TC", turno: "Manha", turma: "EI03", num_inscritos: "34", dia_semana: "Ter.", hora_inicio: "11h00", hora_final: "12h30", data: "2/11/22", caracteristicas: "-", sala: "C6.01" },
    { curso: "HMP", uc: "ADCS", turno: "Manha", turma: "H01", num_inscritos: "15", dia_semana: "Qui.", hora_inicio: "13h00", hora_final: "16h00", data: "10/12/23", caracteristicas: "Computadores", sala: "D1.07" },
    { curso: "ETI", uc: "AR", turno: "Tarde", turma: "ET07", num_inscritos: "29", dia_semana: "Qua.", hora_inicio: "6h00", hora_final: "16h00", data: "8/10/23", caracteristicas: "Servidores", sala: "C7.06" },
    { curso: "LEI", uc: "TC", turno: "Manha", turma: "EI03", num_inscritos: "34", dia_semana: "Ter.", hora_inicio: "11h00", hora_final: "12h30", data: "2/11/22", caracteristicas: "-", sala: "C6.01" },
    { curso: "HMP", uc: "ADCS", turno: "Manha", turma: "H01", num_inscritos: "15", dia_semana: "Qui.", hora_inicio: "13h00", hora_final: "16h00", data: "10/12/23", caracteristicas: "Computadores", sala: "D1.07" },
    { curso: "ETI", uc: "AR", turno: "Tarde", turma: "ET07", num_inscritos: "29", dia_semana: "Qua.", hora_inicio: "14h30", hora_final: "16h00", data: "8/10/23", caracteristicas: "Servidores", sala: "C7.06" },
    { curso: "LEI", uc: "TC", turno: "Manha", turma: "EI03", num_inscritos: "34", dia_semana: "Ter.", hora_inicio: "11h00", hora_final: "12h30", data: "2/11/22", caracteristicas: "-", sala: "C6.01" },
    { curso: "HMP", uc: "ADCS", turno: "Manha", turma: "H01", num_inscritos: "15", dia_semana: "Qui.", hora_inicio: "13h00", hora_final: "16h00", data: "10/12/23", caracteristicas: "Computadores", sala: "D1.07" },
    { curso: "ETI", uc: "AR", turno: "Tarde", turma: "ET07", num_inscritos: "29", dia_semana: "Qua.", hora_inicio: "14h30", hora_final: "16h00", data: "8/10/23", caracteristicas: "Servidores", sala: "C7.06" },
    { curso: "LEI", uc: "TC", turno: "Manha", turma: "EI03", num_inscritos: "34", dia_semana: "Ter.", hora_inicio: "11h00", hora_final: "12h30", data: "2/11/22", caracteristicas: "-", sala: "C6.01" },
    { curso: "HMP", uc: "ADCS", turno: "Manha", turma: "H01", num_inscritos: "15", dia_semana: "Qui.", hora_inicio: "13h00", hora_final: "16h00", data: "10/12/23", caracteristicas: "Computadores", sala: "D1.07" },
    { curso: "ETI", uc: "AR", turno: "Tarde", turma: "ET07", num_inscritos: "29", dia_semana: "Qua.", hora_inicio: "14h30", hora_final: "16h00", data: "8/10/23", caracteristicas: "Servidores", sala: "C7.06" },
    { curso: "LEI", uc: "TC", turno: "Manha", turma: "EI03", num_inscritos: "34", dia_semana: "Ter.", hora_inicio: "11h00", hora_final: "12h30", data: "2/11/22", caracteristicas: "-", sala: "C6.01" },
    { curso: "HMP", uc: "ADCS", turno: "Manha", turma: "H01", num_inscritos: "15", dia_semana: "Qui.", hora_inicio: "13h00", hora_final: "16h00", data: "10/12/23", caracteristicas: "Computadores", sala: "D1.07" },
    { curso: "ETI", uc: "AR", turno: "Tarde", turma: "ET07", num_inscritos: "29", dia_semana: "Qua.", hora_inicio: "14h30", hora_final: "16h00", data: "8/10/23", caracteristicas: "Servidores", sala: "C7.06" },
    { curso: "LEI", uc: "TC", turno: "Manha", turma: "EI03", num_inscritos: "34", dia_semana: "Ter.", hora_inicio: "11h00", hora_final: "12h30", data: "2/11/22", caracteristicas: "-", sala: "C6.01" },
    { curso: "HMP", uc: "ADCS", turno: "Manha", turma: "H01", num_inscritos: "15", dia_semana: "Qui.", hora_inicio: "13h00", hora_final: "16h00", data: "10/12/23", caracteristicas: "Computadores", sala: "D1.07" },
    { curso: "ETI", uc: "AR", turno: "Tarde", turma: "ET07", num_inscritos: "29", dia_semana: "Qua.", hora_inicio: "14h30", hora_final: "16h00", data: "8/10/23", caracteristicas: "Servidores", sala: "C7.06" },
    { curso: "LEI", uc: "TC", turno: "Manha", turma: "EI03", num_inscritos: "34", dia_semana: "Ter.", hora_inicio: "11h00", hora_final: "12h30", data: "2/11/22", caracteristicas: "-", sala: "C6.01" },
    { curso: "HMP", uc: "ADCS", turno: "Manha", turma: "H01", num_inscritos: "15", dia_semana: "Qui.", hora_inicio: "13h00", hora_final: "16h00", data: "10/12/23", caracteristicas: "Computadores", sala: "D1.07" },
    { curso: "ETI", uc: "AR", turno: "Tarde", turma: "ET07", num_inscritos: "29", dia_semana: "Qua.", hora_inicio: "14h30", hora_final: "16h00", data: "8/10/23", caracteristicas: "Servidores", sala: "C7.06" },
    { curso: "LEI", uc: "TC", turno: "Manha", turma: "EI03", num_inscritos: "34", dia_semana: "Ter.", hora_inicio: "11h00", hora_final: "12h30", data: "2/11/22", caracteristicas: "-", sala: "C6.01" },
    { curso: "HMP", uc: "ADCS", turno: "Manha", turma: "H01", num_inscritos: "15", dia_semana: "Qui.", hora_inicio: "13h00", hora_final: "16h00", data: "10/12/23", caracteristicas: "Computadores", sala: "D1.07" },
    { curso: "ETI", uc: "AR", turno: "Tarde", turma: "ET07", num_inscritos: "29", dia_semana: "Qua.", hora_inicio: "14h30", hora_final: "16h00", data: "8/10/23", caracteristicas: "Servidores", sala: "C7.06" },

]

var table = new Tabulator("#HorarioPrincipal", {
    headerFilterPlaceholder: "Filtrar por",
    data: tabledata,
    layout: "fitDataFill",
    pagination: "local",
    paginationSize: 10,
    paginationSizeSelector: [5, 10, 20, 40],
    movableColumns: false,
    initialSort: [{ column: "curso", dir: "asc" },],
    columns: [
        { title: "Curso", field: "curso", headerFilter: "input" },
        { title: "UC", field: "uc", headerFilter: "input" },
        { title: "Turno", field: "turno", headerFilter: "input" },
        { title: "Turma", field: "turma", headerFilter: "input" },
        { title: "#", field: "num_inscritos", headerFilter: "input" },
        { title: "Dia Sem.", field: "dia_semana", headerFilter: "input" },
        { title: "Inicio", field: "hora_inicio", headerFilter: "input" },
        { title: "Fim", field: "hora_fim", headerFilter: "input" },
        { title: "Data", field: "data", headerFilter: "input" },
        { title: "Caract.", field: "caracteristicas", headerFilter: "input" },
        { title: "Sala", field: "sala", headerFilter: "input" },
    ],
});

//Iniciar a tabela com os filtros desligados (estao ligados por default)
let horario = document.getElementById("HorarioPrincipal")
horario.setAttribute("filters", "off")

//Inserir Filter Toggle Button no paginator da tabela pre-feita
let paginators = document.getElementsByClassName("tabulator-paginator");
console.log(paginators)
let filterToggleButton = document.createElement("button")
filterToggleButton.className = "tabulator-filter-toggle-button"
let editToggleButton = document.createElement("button");
editToggleButton.className = "tabulator-edit-toggle-button"
editToggleButton.setAttribute("toggled", "off");
for (var i = 0; i < paginators.length; i++) {
    paginators.item(i).prepend(filterToggleButton);
    filterToggleButton.addEventListener("click", () => toggleFilter());
    paginators.item(i).prepend(editToggleButton);
    editToggleButton.addEventListener("click", () => toggleEdit(editToggleButton));
}
//Adiciona a todas as colunas o botão de esconder e um novo input de filtro a respetiva coluna 
addHiddenButtonsAndInputsToColumns();
function addHiddenButtonsAndInputsToColumns() {
    let columns = document.querySelectorAll(".tabulator-col");
    columns.forEach(column => {
        const button = document.createElement("button");
        button.className = "hidden tabulator-hideColumn-toggle-button";
        button.textContent = "Esconder";

        const input = document.createElement("input");
        input.placeholder = "Filtrar por";
        input.className = "hidden filter-OR";

        column.querySelector(".tabulator-col-sorter").appendChild(button);
        const nameColumn = column.getAttribute("tabulator-field");
        button.addEventListener("click", () => hideColumn(column, nameColumn));
        column.querySelector(".tabulator-header-filter").appendChild(input);
        input.addEventListener("keypress", () => filterByOr());
    });
}

//funcao que liga/desliga os filtros
function toggleFilter() {
    let table = document.getElementById("HorarioPrincipal");
    let toggled = table.getAttribute("filters")
    if (toggled == null || toggled == "off") {
        table.setAttribute("filters", "on");
    } else {
        table.setAttribute("filters", "off");
    }
}
//Esta funcao é resposnavel por esconder/mostrar os botes de esconder colunas
function toggleEdit() {
    filterByOr();
    if (editToggleButton.getAttribute("toggled") == "on") {
        editToggleButton.setAttribute("toggled", "off");
        document.querySelectorAll(".tabulator-col-sorter").forEach(element => {
            element.querySelector(".tabulator-arrow").classList.remove("hidden");
            element.querySelector(".tabulator-hideColumn-toggle-button").classList.add("hidden");
        });
    } else {
        editToggleButton.setAttribute("toggled", "on");
        document.querySelectorAll(".tabulator-col-sorter").forEach(element => {
            element.querySelector(".tabulator-arrow").classList.add("hidden");
            element.querySelector(".tabulator-hideColumn-toggle-button").classList.remove("hidden");
        });
    }
}
//Esta funcao é resposnavel por esconder as colunas
function hideColumn(colum, nameColumn) {
    table.hideColumn(nameColumn);
    addHidedColumns(colum, nameColumn);
}
//Esta funcao é resposnavel por colocar as colunas escondias ao lado da tabela principal de forma que o user
//consiga voltar a metelas no lugar caso o deseja
function addHidedColumns(column, nameColumn) {
    const list = document.getElementById("HiddenColumns").getElementsByTagName("ul")[0];
    const button = document.createElement('button');
    button.className = "tabulator-hiddenColumn-toggle-button";
    button.textContent = column.querySelector(".tabulator-col-title").textContent;
    list.appendChild(button);
    button.addEventListener("click", () => {
        button.remove();
        table.showColumn(nameColumn);
    });
}
//Esta funcao é resposnavel filtra os dados pelo opearod logico "OR"
function filterByOr() {
    const columns = document.querySelectorAll(".tabulator-col");
    let listFilters = [];
    columns.forEach(column => {
        const filter = column.querySelector(".filter-OR");
        const inputValue = filter.value.trim();
        if (inputValue.length > 0) {
            listFilters.push({ field: column.getAttribute("tabulator-field"), type: "like", value: inputValue });
        }
    });
    table.setFilter([listFilters]);
}

////testar filtros
// function filterByOr(){
//     // const filters=document.getElementsByClassName("tabulator-header-filter").getElementsByTagName("input");
//     let listFilters=[];
//     table.getColumns().forEach(element => {
//         const textFilter=table.getHeaderFilterValue(element.getField());
//         if(textFilter!=null && textFilter.length>0){
//             console.log(element.getField());
//             console.log(textFilter);
//             listFilters.push({field:element.getField(), type:"=",value: textFilter});
//         }
//     });
//     console.log("Filters before clear "+table.getFilters());
//     console.log([listFilters]);
//     // table.clearFilter(true);
//     // table.clearHeaderFilter();
//     table.setFilter([listFilters]);
//     console.log("Filters after clear "+table.getFilters());
// }
// table.setFilter([
//         [
//             {field:"hora_inicio", type:"=", value:"6h00"},
//             {field:"curso", type:"=", value:"LEI"},
//         ]
//     ]);