import { GetCarateristicas, GetHorario } from './variables';
import { customFilter, setData } from './table';
import { addNewCriteriaContainer, createCriteriaContainer, getCharacteristics } from './suggestSlotst';
import { formatDateToDDMMYYYY, formatStringToMMDDYYY, getDayOfWeek, getDayOfWeekFromDate, getDaysFromRange } from './dates';

//Variaveis globais
let table: any;
//

createHtmlElements();

/**
 * Cria o botão que mostra a UI para criar um um grafo.
 */

function createHtmlElements(): void {
    const mainDiv: HTMLDivElement = document.getElementById("HeatMap") as HTMLDivElement;
    const criteriaDiv: HTMLDivElement = document.getElementById("HeatMapCriteria")?.querySelector(".ContainerCharacteristics") as HTMLDivElement;

    const showConflitButton: HTMLButtonElement = document.createElement("button");
    showConflitButton.textContent = "Heat Map conflit";
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
        criteria(criteriaDiv);
    }, { once: true });
    mainDiv.style.display = "none";
    document.getElementById("conflitsHeat")?.insertBefore(showConflitButton, mainDiv);
    const buttonCreateGraph: HTMLButtonElement = document.createElement("button");
    buttonCreateGraph.textContent = "Gerar heat map"
    buttonCreateGraph.addEventListener("click", () => {
        const rooms = getCharacteristics(mainDiv, GetCarateristicas());
        console.log(rooms);
        if (!Object.keys(rooms).length) {
            window.alert("Não existem salas com esses criterios");
            return;
        }
        const isOccupation: boolean = document.getElementById("tipoHeatMap")?.querySelector("select")?.value == "Ocupação";
        const isDayOfWeek: boolean = document.getElementById("eixoXHeatMap")?.querySelector("select")?.value == "Dia da semana";
        const dataHeat = getHeat(rooms, isOccupation, isDayOfWeek);
        createHeatMap(dataHeat, isDayOfWeek);
    });
    buttonCreateGraph.classList.add("styled-button");
    document.getElementById("HeatMapCriteria")?.appendChild(buttonCreateGraph);
}

/**
 * Cria um heat map onde cada celula representa a disponibilidade/ocupação das salas
 * @param {any} rooms -Salas que vão ser usadas nos dados para criar o heat map
 * @param {boolean} isOccupation -Indica se o tipo de heat map é de ocupação ou disponibilidade
 * @param {boolean} isDayOfWeek- Indica se esta em modo de dia da semana 
 * @returns {any} -Retorna os dados que vão ser usados para criar o heat map
*/
function getHeat(rooms: any, isOccupation: boolean, isDayOfWeek: boolean): any {
    const startElement: HTMLInputElement = document.getElementById("inicio") as HTMLInputElement;
    const endElement: HTMLInputElement = document.getElementById("fim") as HTMLInputElement;
    const dates = getDaysFromRange(new Date(startElement.value), new Date(endElement.value));
    let filter: string = "(";
    for (let i = 0; i != dates.length; i++) {
        if (i == dates.length - 1) {
            filter += `data["Data da aula"] == "${formatDateToDDMMYYYY(dates[i])}"`;
        } else {
            filter += `data["Data da aula"] == "${formatDateToDDMMYYYY(dates[i])}" || `;
        }
    }
    filter += ")";
    table = setData(document.getElementById("tempTable") as HTMLDivElement, GetHorario(), false);
    table.setFilter(customFilter, filter);
    let dataHeat: any = {};
    table.setSort("Data da aula", "asc");
    const numberOfRoomsPerDay = createDataHeat(rooms, dataHeat, isDayOfWeek);
    if (!isOccupation) {
        Object.values(dataHeat).forEach((data: any) => {
            data["heat"] = numberOfRoomsPerDay[data["Data da aula"]] - data["heat"];
        });
    }
    return dataHeat;
}

/**
 * Cria um heat map onde cada celula representa a disponibilidade/ocupação das salas
 * @param {any} rooms -Salas que vão ser usadas nos dados para criar o heat map
 * @param {any} dataHeat -Dados que vão ser usados para criar o heat map
 * @param {boolean} isDayOfWeek- Indica se esta em modo de dia da semana 
 * @returns {numberOfRoomsPerDay: any} -Retorna o numero de salas por dia 
*/
function createDataHeat(rooms: any, dataHeat: any, isDayOfWeek: boolean): any {
    let hours: number;
    let minutes: number;
    let time: string;
    let date: string;
    const numberOfRoomsPerDay: any = {};
    console.log("Numero de salas " + table.getRows(true).length.toString());
    table.getRows(true).forEach((row: any) => {
        if (row.getData()["Sala atribuída à aula"].trim() == "" || row.getData()["Data da aula"].trim() == "") return;
        if ((row.getData()["Sala atribuída à aula"] in rooms)) {
            hours = Number(row.getData()["Hora início da aula"].substring(0, 2));
            minutes = Number(row.getData()["Hora início da aula"].substring(3, 4));
            if (isDayOfWeek) date = getDayOfWeekFromDate(new Date(formatStringToMMDDYYY(row.getData()["Data da aula"])));
            else date = row.getData()["Data da aula"];
            while (true) {
                if (hours < 10) time = `0${hours}:${minutes}0:00`;
                else time = `${hours}:${minutes}0:00`;
                if (row.getData()["Hora fim da aula"] == time) break;
                const key: string = date + time;
                if (key in dataHeat)
                    Object.assign(dataHeat[key], { heat: dataHeat[key]["heat"] + 1 });
                else {
                    dataHeat[key] =
                    {
                        "Data da aula": date,
                        "Hora início da aula": time,
                        "heat": 1
                    };
                }
                if (minutes == 3) {
                    minutes = 0;
                    hours++;
                } else minutes = 3;
            }
            if (date in numberOfRoomsPerDay) numberOfRoomsPerDay[date] = 1 + numberOfRoomsPerDay[date];
            else numberOfRoomsPerDay[date] = 1;
        }
    });
    console.log(numberOfRoomsPerDay);
    return numberOfRoomsPerDay;
}

/**
 * Cria um novo container (de "and") com um criterio inserido.
 * @param {HTMLDivElement} criteriaDiv -Container dos criterios.
*/
function criteria(criteriaDiv: HTMLDivElement) {
    const buttonAddNewCriteriaDivTimeTable: HTMLButtonElement = document.createElement("button");
    buttonAddNewCriteriaDivTimeTable.textContent = "Or"
    buttonAddNewCriteriaDivTimeTable.addEventListener("click", () => addNewCriteriaContainer(criteriaDiv, buttonAddNewCriteriaDivTimeTable, "characteristics"));
    criteriaDiv.appendChild(buttonAddNewCriteriaDivTimeTable);
    createCriteriaContainer(criteriaDiv, buttonAddNewCriteriaDivTimeTable, "characteristics");
}

/**
 * Cria um heat map onde cada celula representa a disponibilidade/ocupação das salas
 * @param {string} firstDay -Primeiro dia dos dados
 * @param {boolean} isDayOfWeek- Indica se esta em modo de dia da semana
 * @returns {{"x": string, "y": string, "heat": string}[] } -Retorna o formato que os dados devem seguir
*/
function templateData(firstDay: string, isDayOfWeek: boolean): { "x": string, "y": string, "heat": string }[] {
    const templateData: { "x": string, "y": string, "heat": string }[] = [];
    if (isDayOfWeek) {
        const firstDayElement = document.getElementById("inicio") as HTMLInputElement;
        const lastDayElement: HTMLInputElement = document.getElementById("fim") as HTMLInputElement;
        const firstDay = new Date(firstDayElement.value)
        const lastDay = new Date(lastDayElement.value);
        const differenceInDays = Math.round((lastDay.getTime() - firstDay.getTime()) / (1000 * 3600 * 24));
        let day = firstDay.getDay();
        for (let i: number = 1; i <= Math.min(differenceInDays, 6); i++) {
            if (day == 0) day = 1;
            templateData.push({ x: getDayOfWeek(day), y: `08:00:00`, heat: "" });
            day++;
        }
    }
    let hours: number = 7;
    let minutes: number = 3;
    while (hours < 22) {
        if (minutes == 3) {
            minutes = 0;
            hours++;
        }
        else minutes = 3;
        if (hours < 10) templateData.push({ x: firstDay, y: `0${hours}:${minutes}0:00`, heat: "" })
        else templateData.push({ x: firstDay, y: `${hours}:${minutes}0:00`, heat: "" })
    }
    return templateData;
}

/**
 * Cria um heat map onde cada celula representa a disponibilidade/ocupação das salas
 * @param {any} dataHeat -Dados que vão ser usados para criar o heat map
 * @param {boolean} isDayOfWeek- Indica se esta em modo de dia da semana
*/
function createHeatMap(dataHeat: any, isDayOfWeek: boolean) {
    const firstDay: any = Object.values(dataHeat)[0];
    const dataHeatMap: { "x": string, "y": string, "heat": string }[] = templateData(firstDay["Data da aula"], isDayOfWeek);
    if (isDayOfWeek) {
        Object.values(dataHeat).forEach((data: any) => {
            dataHeatMap.push({ x: data["Data da aula"], y: data["Hora início da aula"], heat: data["heat"] })
        });
    } else {
        Object.values(dataHeat).forEach((data: any) => {
            dataHeatMap.push({ x: data["Data da aula"], y: data["Hora início da aula"], heat: data["heat"] })
        });
    }
    const typeHeatMap: string = document.getElementById("tipoHeatMap")?.querySelector("select")?.value as string;
    let colorScale = anychart.scales.ordinalColor();
    if (typeHeatMap == "Ocupação") {
        colorScale.ranges([
            { less: 0, color: "#ffffff" },
            { from: 1, to: 25, color: "#FEE191" },
            { from: 25, to: 100, color: "#FD8060" },
            { greater: 100, color: "#CC333F" }
        ]);
    } else {
        colorScale.ranges([
            { less: 100, color: "#CC333F" },
            { from: 100, to: 250, color: "##FD8060" },
            { from: 250, to: 500, color: "#FEE191" },
            { greater: 500, color: "#ffffff" }
        ]);
    }
    const map: HTMLDivElement = document.getElementById("map") as HTMLDivElement;
    map.innerHTML = "";
    const chart = anychart.heatMap(dataHeatMap);
    chart.colorScale(colorScale);
    chart.title(typeHeatMap + " das salas");
    chart.container("map").draw();
}
