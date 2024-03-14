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
    { curso: "LEI", uc: "TC", turno: "Manha", turma: "EI03", num_inscritos: "34", dia_semana: "Ter.", hora_inicio: "11h00", hora_final: "12h30", data: "2/11/22", caracteristicas: "-", sala: "C6.01" },
    { curso: "HMP", uc: "ADCS", turno: "Manha", turma: "H01", num_inscritos: "15", dia_semana: "Qui.", hora_inicio: "13h00", hora_final: "16h00", data: "10/12/23", caracteristicas: "Computadores", sala: "D1.07" },
    { curso: "ETI", uc: "AR", turno: "Tarde", turma: "ET07", num_inscritos: "29", dia_semana: "Qua.", hora_inicio: "14h30", hora_final: "16h00", data: "8/10/23", caracteristicas: "Servidores", sala: "C7.06" },

]

/**
 * Convert a "dd/MM/yyyy" (date format C) string into a Date object
 * 
 * Alternatively, if dd/mm/yy is passed, 1900's will be assumed for yy higher than the last two digits of the current year (+2) and 2000's otherwise
 * @param {string} dateString 
 * @returns {Date} date object
 */
function dateStringFormatCToDate(dateString) { 
    let dateParts = dateString.split("/");

    const year = dateParts[2].length == 4?dateParts[2]:dateParts[2]>String((new Date().getYear() + 1900 +2)).slice(2)?"19"+dateParts[2]:"20"+dateParts[2];
    return new Date(year + '/' + dateParts[1] + '/' + dateParts[0]);
}


/**
 * Calculate the week number since the beggining of the year.
 * 
 * @param {Date} date The date to check for.
 * @param {int} firstDayOfTheWeek (optional) 0 for Sunday, 1 for Monday,...,6 for Saturday.
 * @returns {int} int The number of the week.
 */
function getWeekNumber(date, firstDayOfTheWeek=1) {

    const firstDayOfTheYear = new Date(date.getFullYear(), 0, 1)//January 1st of the same year as date

    var weekStartOffset=(firstDayOfTheYear).getDay() - firstDayOfTheWeek;
    weekStartOffset += weekStartOffset<0?7:0;

    const daysElapsedThisYear = Math.ceil(Math.abs(date - firstDayOfTheYear) / (1000 * 60 * 60 * 24));//Days since january 1st

    const correctedDay = daysElapsedThisYear+weekStartOffset;

    const weekNumber = Math.floor(correctedDay/7)+1;

    return weekNumber;
}

//Semester Beginning dates for 2023/24
const semester1Start = new Date(2023,8,11);
const semester2Start = new Date(2024,1,5); 

/**
 * Calculate the week number since the beggining of the current semester.
 * 
 * @param {Date} date The date to check for.
 * @param {Date} firstSemesterStart beggining date for the first semester (usually September)
 * @param {Date} secondSemesterStart beggining date for the second semester (usually February)
 * @returns {int} int The number of the semester's week.
 */
function getSemesterWeekNumber(date, firstSemesterStart=semester1Start, secondSemesterStart=semester2Start){
    const semesterStart = date < secondSemesterStart ? firstSemesterStart : secondSemesterStart;
    const weekNumberOfSemesterStart = getWeekNumber(semesterStart);
    const weekNumberOfDate = getWeekNumber(date);
    return (weekNumberOfDate - weekNumberOfSemesterStart) + 1;
}

//Adding week numbers to the list
tabledata.forEach((row) => {
    dateObject = dateStringFormatCToDate(row.data);
    row.semana_do_ano = getWeekNumber(dateObject);
    row.semana_do_semestre =getSemesterWeekNumber(dateObject);
})

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
        { title: "Fim", field: "hora_final", headerFilter: "input" },
        { title: "Data", field: "data", headerFilter: "input" },
        { title: "Caract.", field: "caracteristicas", headerFilter: "input" },
        { title: "Sala", field: "sala", headerFilter: "input" },
        { title: "Sem. Ano", field: "semana_do_ano", headerFilter: "input" },
        { title: "Sem. Semestre", field: "semana_do_semestre", headerFilter: "input" },
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
for (var i = 0; i < paginators.length; i++) {
    paginators.item(i).prepend(filterToggleButton);
    filterToggleButton.addEventListener("click", () => toggleFilter());
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