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

//TODO ADD TESTS
/**
 * Cria e transfere um ficheiro com os dados(string) e o nome de ficheiro(string) especificados.
 * @param {string} data Dados a serem salvos(string pre formatada).
 * @param {string} filename Nome do ficheiro.
 */
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

//TODO ADD TESTS
/**
 * Cria e transfere o estado atual da tabela atual _tabledata_.
 * 
 * Este ficheiro será um ficheiro de texto formatado em JSON com o nome "save.json"
 */
export function saveFileJSON(): void {
	const formatedJSON = JSON.stringify(tabledata);
	saveToFile(formatedJSON, "save.json");
}

//TODO ADD TESTS
/**
 * Cria e transfere o estado atual da tabela atual _tabledata_.
 * 
 * Este ficheiro será um ficheiro de texto formatado em CSV com o nome "save.csv"
 * 
 * O separador por defeito será o ponto e virgula ";". Caso exista pelo menos um ponto e virgula nos dados, o separador será mudado para a virgula ",".
 * 
 * Ficheiros que contenham tanto "," como ";" não irão ser corretamente exportados e a sua importação não irá funcionar.
 */
export function saveFileCSV(): void {
	//Confirma se alguma das celulas de dados contem ";".
	const hasSemicolins: boolean = tabledata.some((tableRow) =>
		Object.entries(tableRow).some((tableCell) =>
			tableCell[1].toString().includes(";")
		)
	);

	let separator: string = ";";
	//Se existirem ";" nos dados, muda o separador para ",".
	if (hasSemicolins) {
		separator = ",";
	}

	//Obtem os cabeçalhos.
	const headers: string =
		//Obtem os pares chave/valor de uma linha.
		Object.entries(tabledata[0])
			//Obtem as chaves (cabeçalhos).
			.map((v) => v[0])
			//Junta todos os cabeçalhos numa string separada com o separador.
			.reduce((previous, current) => previous + separator + current);

	//Obtem os dados.
	const data: string =
		//Começa com os dados todos.
		tabledata
			//Converte a lista de TableRow numa lista de string, juntando todas as TableCell de cada TableRow numa string com o separador.
			.map((row) =>
				//Obtem os pares chave/valor de uma linha.
				Object.entries(row)
					//Mantem apenas os valores(index 1) e transforma-os em strings.
					.map((value) => value[1].toString())
					//Junta todas as strings usando o separador.
					.reduce((previous, value) => previous + separator + value)
			)
			//Junta todas as strings, separando-as por linhas.
			.reduce((previous, current) => previous + "\n" + current);

	// Junta os cabeçalhos aos dados.
	const formatedCSV: string = headers + "\n" + data;

	saveToFile(formatedCSV, "save.csv");
}
