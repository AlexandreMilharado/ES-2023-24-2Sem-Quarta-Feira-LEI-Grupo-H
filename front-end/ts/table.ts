import Tabulator from "tabulator-tables";
import ColumnDefinition from "tabulator-tables";
import {
	dateStringFormatCToDate,
	getSemesterWeekNumber,
	getWeekNumber,
} from "./dates";
import { TableRow } from "./uploadCsv";

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
let tabledata: TableRow[] = [{ Message: "Dados ainda não inseridos" }];

/**
 * Tabela do Tabulator
 * @type {Tabulator}
 */
let table: Tabulator = new Tabulator("#HorarioPrincipal", {
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
 * @type {HTMLCollectionOf<Element>}
 */
let paginators: HTMLCollectionOf<Element> = document.getElementsByClassName(
	"tabulator-paginator"
);

/**
 * Botão para aplicar a funcionalidade dos filtros.
 * @type {HTMLButtonElement}
 */
let filterToggleButton: HTMLButtonElement;

/**
 * Botão para editar/apagar colunas na tabela.
 * @type {HTMLButtonElement}
 */
let editToggleButton: HTMLButtonElement;

/**
 * Lista para mostrar as colunas escondidas.
 * @type {HTMLUListElement}
 */
let list: HTMLUListElement = document
	.getElementById("HiddenColumns")
	?.getElementsByTagName("ul")[0] as HTMLUListElement;

/**
 * Atualizar os dados no Tabulator consoante o ficheiro .CSV formatado
 * juntamente com as colunsa do número das semanas.
 * Também é adicionado à tabela os filtros personalizados e a opção de removoção de colunas.
 *
 * See {@link addSemanasColumns} | {@link addHiddenButtonsAndInputsToColumns} | {@link renderFilterProps} | {@link TableRow}.
 *
 * @param {TableRow[]} file - dados do ficheiro .CSV importado
 */
export function setData(file: TableRow[]): void {
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
		autoColumnsDefinitions: function (definitions: ColumnDefinition[]) {
			// Adicionar Filtros no Tabulator
			definitions.forEach((column: ColumnDefinition) => {
				column.headerFilter = true;
			});
			return definitions;
		},
	});
	editToggleButton = document.createElement("button");
	editToggleButton.className = "tabulator-edit-toggle-button";
	editToggleButton.setAttribute("toggled", "off");
	list.innerHTML = "";
	renderFilterProps();
	addHiddenButtonsAndInputsToColumns();
}

/**
 * Adiciona os filtros no tabela e desliga-os para não aparecerem no ecrã(aparecem por default).
 */
function renderFilterProps(): void {
	filterToggleButton = document.createElement("button");
	filterToggleButton.className = "tabulator-filter-toggle-button";
	for (let i = 0; i < paginators.length; i++) {
		paginators.item(i)?.prepend(filterToggleButton);
		filterToggleButton.addEventListener("click", () => toggleFilter());
		paginators.item(i)?.prepend(editToggleButton);
		editToggleButton.addEventListener("click", () => toggleEdit());
	}

	let horario: HTMLElement = document.getElementById(
		"HorarioPrincipal"
	) as HTMLElement;
	horario.setAttribute("filters", "off");
}

/**
 * Adiciona em todas as linhas os atributos "Semana do Ano" e "Semana do Semestre".
 * Se a tabledata não tiver o atributo "Data da aula" a função é completamente ignorada.
 * Se já existir pelo menos uma semana do ano ou semana do semestre, esta função é ignorada.
 *
 * See {@link dateStringFormatCToDate} | {@link getWeekNumber} | {@link getSemesterWeekNumber}.
 */
function addSemanasColumns(): void {
	//Confirma se já existem semanas do ano e semanas do semestre
	if (
		tabledata.some(
			(value) =>
				Object.keys(value).includes("Semana do Ano") ||
				Object.keys(value).includes("Semana do Semestre")
		)
	) {
		return;
	}

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
		row["Semana do Semestre"] = getSemesterWeekNumber(dateObject);
	});
}

/**
 * Função que liga/desliga os filtros.
 * Os filtros têm três estados: AND, OR ou desligado, consoante o número de vezes que esta função
 * é acionda muda os estados do filtro, mundando a funcionalidade de procura para AND, OR ou sem filtro.
 */
function toggleFilter(): void {
	//off and or
	let table: HTMLElement = document.getElementById(
		"HorarioPrincipal"
	) as HTMLElement;
	let toggled = table.getAttribute("filters");

	if (toggled == "off") {
		table.setAttribute("filters", "and");
		document
			.querySelectorAll(".tabulator-header-filter")
			.forEach((element) => {
				element.querySelector("input")?.classList.remove("hidden");
			});
	} else if (toggled == "and") {
		table.setAttribute("filters", "or");
		document
			.querySelectorAll(".tabulator-header-filter")
			.forEach((element) => {
				element.querySelector("input")?.classList.add("hidden");
				element.querySelector(".filter-OR")?.classList.remove("hidden");
			});
	} else {
		table.setAttribute("filters", "off");
		document
			.querySelectorAll(".tabulator-header-filter")
			.forEach((element) => {
				element.querySelector(".filter-OR")?.classList.add("hidden");
			});
	}
}

/**
 * Adiciona a todas as colunas o botão de esconder e um novo input de filtro OR.
 */
function addHiddenButtonsAndInputsToColumns(): void {
	let columns: NodeListOf<Element> =
		document.querySelectorAll(".tabulator-col");

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
		button.addEventListener("click", () => hideColumn(column, nameColumn));
		column.querySelector(".tabulator-header-filter")?.appendChild(input);
		input.addEventListener("keypress", () => filterByOr());
	});
}

/**
 * Esconde/mostra os botões para apagar cada coluna na tabela.
 */
function toggleEdit(): void {
	if (editToggleButton.getAttribute("toggled") == "on") {
		editToggleButton.setAttribute("toggled", "off");
		document
			.querySelectorAll(".tabulator-col-sorter")
			.forEach((element) => {
				element
					.querySelector(".tabulator-arrow")
					?.classList.remove("hidden");
				element
					.querySelector(".tabulator-hideColumn-toggle-button")
					?.classList.add("hidden");
			});
	} else {
		editToggleButton.setAttribute("toggled", "on");
		document
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
function hideColumn(column: ColumnDefinition, nameColumn: string): void {
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
function addHiddenColumns(column: ColumnDefinition, nameColumn: string): void {
	const button: HTMLButtonElement = document.createElement("button");
	button.className = "tabulator-hiddenColumn-toggle-button";
	button.textContent = column.querySelector(
		".tabulator-col-title"
	).textContent;
	list?.appendChild(button);
	button.addEventListener("click", () => {
		button.remove();
		table.showColumn(nameColumn);
	});
}

/**
 * Filtra os dados no Tabulator com o operador lógico "OR".
 */
function filterByOr(): void {
	const columns: NodeListOf<Element> =
		document.querySelectorAll(".tabulator-col");
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

//TODO add documentation
function saveToFile(data: string, filename: string): void {
	//Cria e chama um link de download escondido.
	//Adiciona \ufeff para denotar UTF8.
	let file = new File(["\ufeff" + data], filename, {
		type: "text/plain:charset?UTF8",
	});
	const url = window.URL.createObjectURL(file);
	let hiddenLink = document.createElement("a");

	hiddenLink.style.cssText = "display: none";
	hiddenLink.href = url;
	hiddenLink.download = file.name;
	hiddenLink.click();
}

//TODO add documentation
export function saveFileJSON(): void {
	const formatedJSON = JSON.stringify(tabledata);
	saveToFile(formatedJSON, "save.json");
}

//TODO add documentation
export function saveFileCSV(): void {
	//TODO Document this.
	const hasSemicolins: boolean = tabledata.some((tableRow) =>
		Object.entries(tableRow).some((tableCell) =>
			tableCell[1].toString().includes(";")
		)
	);
	console.log("SC");
	console.log(hasSemicolins);
	let separator: string;
	if (hasSemicolins) {
		separator = ",";
	} else {
		separator = ";";
	}

	//Extract all the headers.
	const headers: string =
		//Get all key/value pairs.
		Object.entries(tabledata[0])
			//Get all the keys.
			.map((v) => v[0])
			//Condensate all the string keys into a string.
			.reduce((previous, current) => previous + separator + current);

	//Extract all the data
	const data: string =
		//Start with all the data.
		tabledata
			//Map the TableRow[] into a string[] by mapping every TableCell item onto a string and joining them.
			.map((row) =>
				//Get all key/value pairs for this TableRow. Gets a string key and a TableCell value.
				Object.entries(row)
					//Turn each key/value pair into a string by selecting only index 1(the value).
					.map((value) => value[1].toString())
					//Join all the strings with the given separator.
					.reduce((previous, value) => previous + separator + value)
			)
			//Join all the string formated TableRows by adding new lines.
			.reduce((previous, current) => previous + "\n" + current);

	// Adds the header to the data.
	const formatedCSV: string = headers + "\n" + data;

	saveToFile(formatedCSV, "save.csv");
}
