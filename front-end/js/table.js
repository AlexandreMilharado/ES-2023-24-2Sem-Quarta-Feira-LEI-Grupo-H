//MERAMENTE UMA TEMPLATE

console.log("CHECK")
var tabledata = [
    {curso:"LEI", uc:"TC", turno:"Manha", turma:"EI03", num_inscritos:"34", dia_semana:"Ter.", hora_inicio:"11h00", hora_final:"12h30", data:"2/11/22", caracteristicas:"-", sala:"C6.01"},
    {curso:"HMP", uc:"ADCS", turno:"Manha", turma:"H01", num_inscritos:"15", dia_semana:"Qui.", hora_inicio:"13h00", hora_final:"16h00", data:"10/12/23", caracteristicas:"Computadores", sala:"D1.07"},
    {curso:"ETI", uc:"AR", turno:"Tarde", turma:"ET07", num_inscritos:"29", dia_semana:"Qua.", hora_inicio:"14h30", hora_final:"16h00", data:"8/10/23", caracteristicas:"Servidores", sala:"C7.06"},
    {curso:"LEI", uc:"TC", turno:"Manha", turma:"EI03", num_inscritos:"34", dia_semana:"Ter.", hora_inicio:"11h00", hora_final:"12h30", data:"2/11/22", caracteristicas:"-", sala:"C6.01"},
    {curso:"HMP", uc:"ADCS", turno:"Manha", turma:"H01", num_inscritos:"15", dia_semana:"Qui.", hora_inicio:"13h00", hora_final:"16h00", data:"10/12/23", caracteristicas:"Computadores", sala:"D1.07"},
    {curso:"ETI", uc:"AR", turno:"Tarde", turma:"ET07", num_inscritos:"29", dia_semana:"Qua.", hora_inicio:"14h30", hora_final:"16h00", data:"8/10/23", caracteristicas:"Servidores", sala:"C7.06"},
    {curso:"LEI", uc:"TC", turno:"Manha", turma:"EI03", num_inscritos:"34", dia_semana:"Ter.", hora_inicio:"11h00", hora_final:"12h30", data:"2/11/22", caracteristicas:"-", sala:"C6.01"},
    {curso:"HMP", uc:"ADCS", turno:"Manha", turma:"H01", num_inscritos:"15", dia_semana:"Qui.", hora_inicio:"13h00", hora_final:"16h00", data:"10/12/23", caracteristicas:"Computadores", sala:"D1.07"},
    {curso:"ETI", uc:"AR", turno:"Tarde", turma:"ET07", num_inscritos:"29", dia_semana:"Qua.", hora_inicio:"14h30", hora_final:"16h00", data:"8/10/23", caracteristicas:"Servidores", sala:"C7.06"},
    {curso:"LEI", uc:"TC", turno:"Manha", turma:"EI03", num_inscritos:"34", dia_semana:"Ter.", hora_inicio:"11h00", hora_final:"12h30", data:"2/11/22", caracteristicas:"-", sala:"C6.01"},
    {curso:"HMP", uc:"ADCS", turno:"Manha", turma:"H01", num_inscritos:"15", dia_semana:"Qui.", hora_inicio:"13h00", hora_final:"16h00", data:"10/12/23", caracteristicas:"Computadores", sala:"D1.07"},
    {curso:"ETI", uc:"AR", turno:"Tarde", turma:"ET07", num_inscritos:"29", dia_semana:"Qua.", hora_inicio:"14h30", hora_final:"16h00", data:"8/10/23", caracteristicas:"Servidores", sala:"C7.06"},
    {curso:"LEI", uc:"TC", turno:"Manha", turma:"EI03", num_inscritos:"34", dia_semana:"Ter.", hora_inicio:"11h00", hora_final:"12h30", data:"2/11/22", caracteristicas:"-", sala:"C6.01"},
    {curso:"HMP", uc:"ADCS", turno:"Manha", turma:"H01", num_inscritos:"15", dia_semana:"Qui.", hora_inicio:"13h00", hora_final:"16h00", data:"10/12/23", caracteristicas:"Computadores", sala:"D1.07"},
    {curso:"ETI", uc:"AR", turno:"Tarde", turma:"ET07", num_inscritos:"29", dia_semana:"Qua.", hora_inicio:"14h30", hora_final:"16h00", data:"8/10/23", caracteristicas:"Servidores", sala:"C7.06"},
    {curso:"LEI", uc:"TC", turno:"Manha", turma:"EI03", num_inscritos:"34", dia_semana:"Ter.", hora_inicio:"11h00", hora_final:"12h30", data:"2/11/22", caracteristicas:"-", sala:"C6.01"},
    {curso:"HMP", uc:"ADCS", turno:"Manha", turma:"H01", num_inscritos:"15", dia_semana:"Qui.", hora_inicio:"13h00", hora_final:"16h00", data:"10/12/23", caracteristicas:"Computadores", sala:"D1.07"},
    {curso:"ETI", uc:"AR", turno:"Tarde", turma:"ET07", num_inscritos:"29", dia_semana:"Qua.", hora_inicio:"14h30", hora_final:"16h00", data:"8/10/23", caracteristicas:"Servidores", sala:"C7.06"},
    {curso:"LEI", uc:"TC", turno:"Manha", turma:"EI03", num_inscritos:"34", dia_semana:"Ter.", hora_inicio:"11h00", hora_final:"12h30", data:"2/11/22", caracteristicas:"-", sala:"C6.01"},
    {curso:"HMP", uc:"ADCS", turno:"Manha", turma:"H01", num_inscritos:"15", dia_semana:"Qui.", hora_inicio:"13h00", hora_final:"16h00", data:"10/12/23", caracteristicas:"Computadores", sala:"D1.07"},
    {curso:"ETI", uc:"AR", turno:"Tarde", turma:"ET07", num_inscritos:"29", dia_semana:"Qua.", hora_inicio:"14h30", hora_final:"16h00", data:"8/10/23", caracteristicas:"Servidores", sala:"C7.06"},
    {curso:"LEI", uc:"TC", turno:"Manha", turma:"EI03", num_inscritos:"34", dia_semana:"Ter.", hora_inicio:"11h00", hora_final:"12h30", data:"2/11/22", caracteristicas:"-", sala:"C6.01"},
    {curso:"HMP", uc:"ADCS", turno:"Manha", turma:"H01", num_inscritos:"15", dia_semana:"Qui.", hora_inicio:"13h00", hora_final:"16h00", data:"10/12/23", caracteristicas:"Computadores", sala:"D1.07"},
    {curso:"ETI", uc:"AR", turno:"Tarde", turma:"ET07", num_inscritos:"29", dia_semana:"Qua.", hora_inicio:"14h30", hora_final:"16h00", data:"8/10/23", caracteristicas:"Servidores", sala:"C7.06"},
    {curso:"LEI", uc:"TC", turno:"Manha", turma:"EI03", num_inscritos:"34", dia_semana:"Ter.", hora_inicio:"11h00", hora_final:"12h30", data:"2/11/22", caracteristicas:"-", sala:"C6.01"},
    {curso:"HMP", uc:"ADCS", turno:"Manha", turma:"H01", num_inscritos:"15", dia_semana:"Qui.", hora_inicio:"13h00", hora_final:"16h00", data:"10/12/23", caracteristicas:"Computadores", sala:"D1.07"},
    {curso:"ETI", uc:"AR", turno:"Tarde", turma:"ET07", num_inscritos:"29", dia_semana:"Qua.", hora_inicio:"14h30", hora_final:"16h00", data:"8/10/23", caracteristicas:"Servidores", sala:"C7.06"},
    {curso:"LEI", uc:"TC", turno:"Manha", turma:"EI03", num_inscritos:"34", dia_semana:"Ter.", hora_inicio:"11h00", hora_final:"12h30", data:"2/11/22", caracteristicas:"-", sala:"C6.01"},
    {curso:"HMP", uc:"ADCS", turno:"Manha", turma:"H01", num_inscritos:"15", dia_semana:"Qui.", hora_inicio:"13h00", hora_final:"16h00", data:"10/12/23", caracteristicas:"Computadores", sala:"D1.07"},
    {curso:"ETI", uc:"AR", turno:"Tarde", turma:"ET07", num_inscritos:"29", dia_semana:"Qua.", hora_inicio:"14h30", hora_final:"16h00", data:"8/10/23", caracteristicas:"Servidores", sala:"C7.06"},
    {curso:"LEI", uc:"TC", turno:"Manha", turma:"EI03", num_inscritos:"34", dia_semana:"Ter.", hora_inicio:"11h00", hora_final:"12h30", data:"2/11/22", caracteristicas:"-", sala:"C6.01"},
    {curso:"HMP", uc:"ADCS", turno:"Manha", turma:"H01", num_inscritos:"15", dia_semana:"Qui.", hora_inicio:"13h00", hora_final:"16h00", data:"10/12/23", caracteristicas:"Computadores", sala:"D1.07"},
    {curso:"ETI", uc:"AR", turno:"Tarde", turma:"ET07", num_inscritos:"29", dia_semana:"Qua.", hora_inicio:"14h30", hora_final:"16h00", data:"8/10/23", caracteristicas:"Servidores", sala:"C7.06"},

]

var table = new Tabulator("#HorarioPrincipal", {
    headerFilterPlaceholder:"Filtrar por",
    data:tabledata,
    layout:"fitDatafill",
    pagination:"local",
    paginationSize:10,
    paginationSizeSelector:[5, 10, 20, 40],
    movableColumns:true,
    paginationCounter:"rows",
    initialSort:[{column:"building",dir:"asc"},],
    columns:[
        {title:"Curso", field:"curso", headerFilter:"input"},
        {title:"UC", field:"uc", headerFilter:"input"},
        {title:"Turno", field:"turno", headerFilter:"input"},
        {title:"Turma", field:"turma", headerFilter:"input"},
        {title:"#", field:"num_inscritos", headerFilter:"input"},
        {title:"Dia Sem.", field:"dia_semana", headerFilter:"input"},
        {title:"Inicio", field:"hora_inicio", headerFilter:"input"},
        {title:"Fim", field:"hora_final", headerFilter:"input"},
        {title:"Data", field:"data", headerFilter:"input"},
        {title:"Caracteristicas", field:"caracteristicas", headerFilter:"input"},
        {title:"Sala", field:"sala", headerFilter:"input"},
    ],
});



//Inserir Filter Toggle Button no paginator da tabela pre-feita

let paginators = document.getElementsByClassName("tabulator-paginator");
console.log(paginators)
let filterToggleButton = document.createElement("button")
filterToggleButton.className = "tabulator-filter-toggle-button"
filterToggleButton.innerText = "Filtros"
for (var i = 0; i < paginators.length; i++) {
    paginators.item(i).prepend(filterToggleButton);
    filterToggleButton.addEventListener("click", ()=> toggleFilter());
}


function toggleFilter(){
        let table = document.getElementById("HorarioPrincipal");
        let toggled = table.getAttribute("filters")
        if(toggled == null || toggled == "off"){
            table.setAttribute("filters","on");
        }else{
            table.setAttribute("filters","off");
        }
        
}