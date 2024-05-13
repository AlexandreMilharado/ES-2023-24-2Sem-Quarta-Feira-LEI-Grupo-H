import { TableRow } from "../ts/interfaces";

/**
 * Evento falso para testar funções.
 * @interface FakeEvent
 */
export interface FakeEvent {
	preventDefault: () => void;
	currentTarget: HTMLElement;
}

/**
 * Transforma uma string num elemento HTML.
 * @param {String} htmlString - htmlString a transformar
 * @returns {ChildNode | null} elemento HTML
 */
export function stringToHTMLElement(htmlString: string): ChildNode | null {
	const parser: DOMParser = new DOMParser();
	const doc: Document = parser.parseFromString(htmlString, "text/html");
	return doc.body.firstChild;
}

export function getDocument(): Document {
	const parser: DOMParser = new DOMParser();
	const htmlContent = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>New Document</title>
		</head>
		<body>
		<h1>Hello, World!</h1>
		<p>This is a new HTML document created dynamically using JavaScript.</p>
		</body>
		</html>
		`;
	const doc: Document = parser.parseFromString(htmlContent, "text/html");
	return doc;
}

/**
 * Receber Ficheiro com o conteúdo representado na função getTestFileText().
 *
 * See {@link getTestFileText}
 * @returns {File} file "test" com o conteúdo da função anteriormente referida.
 */
export function getTestFile(): File {
	return new File([getTestFileText()], "test");
}

/**
 * Devolve um conjunto de dados do HorarioDeExemplo.csv.
 * @returns {String} string com header dos dados do horário
 */
export function getTestFileText(): string {
	return `Curso;Unidade Curricular;Turno;Turma;Inscritos no turno;Dia da semana;Hora início da aula;Hora fim da aula;Data da aula;Características da sala pedida para a aula;Sala atribuída à aula
ME;Teoria dos Jogos e dos Contratos;01789TP01;MEA1;30;Sex;13:00:00;14:30:00;02/12/2022;Sala Aulas Mestrado;AA2.25
ME;Teoria dos Jogos e dos Contratos;01789TP01;MEA1;30;Seg;14:30:00;16:00:00;28/11/2022;Sala Aulas Mestrado;AA2.25
ME;Teoria dos Jogos e dos Contratos;01789TP01;MEA1;30;Seg;14:30:00;16:00:00;21/11/2022;Sala Aulas Mestrado;AA2.25
ME;Teoria dos Jogos e dos Contratos;01789TP01;MEA1;30;Seg;14:30:00;16:00:00;14/11/2022;Sala Aulas Mestrado;AA2.25
ME;Teoria dos Jogos e dos Contratos;01789TP01;MEA1;30;Seg;14:30:00;16:00:00;07/11/2022;Sala Aulas Mestrado;AA2.25
LG, LGIL;Microeconomia;L5004T04;GiA2, GiA1;59;Seg;11:00:00;12:30:00;26/09/2022;Anfiteatro aulas;C5.07
LDSA, LTDIA, LTDSAU, LTDSEG;Matemática Aplicada;04299TP05;LTDS-A1;0;Sex;09:30:00;12:30:00;25/11/2022;Não necessita de sala;
LDSA, LTDIA, LTDSAU, LTDSEG;Matemática Aplicada;04299TP05;LTDS-A1;0;Sex;09:30:00;12:30:00;18/11/2022;Não necessita de sala;
LDSA, LTDIA, LTDSAU, LTDSEG;Matemática Aplicada;04299TP05;LTDS-A1;0;Sex;09:30:00;12:30:00;11/11/2022;Não necessita de sala;
LIGE, LIGE-PL;Marketing para as Tecnologias;01769PL03;IGE-PL-C2, IGE-PL-C1;21;Ter;18:00:00;19:30:00;20/09/2022;Sala de Aulas normal;1E06
LIGE, LIGE-PL;Marketing para as Tecnologias;01769PL03;IGE-PL-C2, IGE-PL-C1;21;Ter;18:00:00;19:30:00;13/09/2022;Sala de Aulas normal;1E06
DATMC;Projecto de Investigação em Arquitectura dos Territórios Metropolitanos Contemporâneos (24ects);03953OT02;DATMC1;2;Qua;18:00:00;19:00:00;02/11/2022;Sala/anfiteatro aulas;C2.02
`;
}

/**
 * Devolve um conjunto de dados do HorarioDeExemplo.csv em JSON.
 *
 * See {@link TableRow}
 * @returns {TableRow[]} Array<JSON> com header personalizado dos dados do horário
 */
export function getTestFileJSON(): TableRow[] {
	return [
		{
			Curso: "ME",
			"Unidade Curricular": "Teoria dos Jogos e dos Contratos",
			Turno: "01789TP01",
			Turma: "MEA1",
			"Inscritos no turno": "30",
			"Dia da semana": "Sex",
			"Hora início da aula": "13:00:00",
			"Hora fim da aula": "14:30:00",
			"Data da aula": "02/12/2022",
			"Características da sala pedida para a aula": "Sala Aulas Mestrado",
			"Sala atribuída à aula": "AA2.25",
		},
		{
			Curso: "ME",
			"Unidade Curricular": "Teoria dos Jogos e dos Contratos",
			Turno: "01789TP01",
			Turma: "MEA1",
			"Inscritos no turno": "30",
			"Dia da semana": "Seg",
			"Hora início da aula": "14:30:00",
			"Hora fim da aula": "16:00:00",
			"Data da aula": "28/11/2022",
			"Características da sala pedida para a aula": "Sala Aulas Mestrado",
			"Sala atribuída à aula": "AA2.25",
		},
		{
			Curso: "ME",
			"Unidade Curricular": "Teoria dos Jogos e dos Contratos",
			Turno: "01789TP01",
			Turma: "MEA1",
			"Inscritos no turno": "30",
			"Dia da semana": "Seg",
			"Hora início da aula": "14:30:00",
			"Hora fim da aula": "16:00:00",
			"Data da aula": "21/11/2022",
			"Características da sala pedida para a aula": "Sala Aulas Mestrado",
			"Sala atribuída à aula": "AA2.25",
		},
		{
			Curso: "ME",
			"Unidade Curricular": "Teoria dos Jogos e dos Contratos",
			Turno: "01789TP01",
			Turma: "MEA1",
			"Inscritos no turno": "30",
			"Dia da semana": "Seg",
			"Hora início da aula": "14:30:00",
			"Hora fim da aula": "16:00:00",
			"Data da aula": "14/11/2022",
			"Características da sala pedida para a aula": "Sala Aulas Mestrado",
			"Sala atribuída à aula": "AA2.25",
		},
		{
			Curso: "ME",
			"Unidade Curricular": "Teoria dos Jogos e dos Contratos",
			Turno: "01789TP01",
			Turma: "MEA1",
			"Inscritos no turno": "30",
			"Dia da semana": "Seg",
			"Hora início da aula": "14:30:00",
			"Hora fim da aula": "16:00:00",
			"Data da aula": "07/11/2022",
			"Características da sala pedida para a aula": "Sala Aulas Mestrado",
			"Sala atribuída à aula": "AA2.25",
		},
		{
			Curso: "LG, LGIL",
			"Unidade Curricular": "Microeconomia",
			Turno: "L5004T04",
			Turma: "GiA2, GiA1",
			"Inscritos no turno": "59",
			"Dia da semana": "Seg",
			"Hora início da aula": "11:00:00",
			"Hora fim da aula": "12:30:00",
			"Data da aula": "26/09/2022",
			"Características da sala pedida para a aula": "Anfiteatro aulas",
			"Sala atribuída à aula": "C5.07",
		},
		{
			Curso: "LDSA, LTDIA, LTDSAU, LTDSEG",
			"Unidade Curricular": "Matemática Aplicada",
			Turno: "04299TP05",
			Turma: "LTDS-A1",
			"Inscritos no turno": "0",
			"Dia da semana": "Sex",
			"Hora início da aula": "09:30:00",
			"Hora fim da aula": "12:30:00",
			"Data da aula": "25/11/2022",
			"Características da sala pedida para a aula": "Não necessita de sala",
			"Sala atribuída à aula": "",
		},
		{
			Curso: "LDSA, LTDIA, LTDSAU, LTDSEG",
			"Unidade Curricular": "Matemática Aplicada",
			Turno: "04299TP05",
			Turma: "LTDS-A1",
			"Inscritos no turno": "0",
			"Dia da semana": "Sex",
			"Hora início da aula": "09:30:00",
			"Hora fim da aula": "12:30:00",
			"Data da aula": "18/11/2022",
			"Características da sala pedida para a aula": "Não necessita de sala",
			"Sala atribuída à aula": "",
		},
		{
			Curso: "LDSA, LTDIA, LTDSAU, LTDSEG",
			"Unidade Curricular": "Matemática Aplicada",
			Turno: "04299TP05",
			Turma: "LTDS-A1",
			"Inscritos no turno": "0",
			"Dia da semana": "Sex",
			"Hora início da aula": "09:30:00",
			"Hora fim da aula": "12:30:00",
			"Data da aula": "11/11/2022",
			"Características da sala pedida para a aula": "Não necessita de sala",
			"Sala atribuída à aula": "",
		},
		{
			Curso: "LIGE, LIGE-PL",
			"Unidade Curricular": "Marketing para as Tecnologias",
			Turno: "01769PL03",
			Turma: "IGE-PL-C2, IGE-PL-C1",
			"Inscritos no turno": "21",
			"Dia da semana": "Ter",
			"Hora início da aula": "18:00:00",
			"Hora fim da aula": "19:30:00",
			"Data da aula": "20/09/2022",
			"Características da sala pedida para a aula": "Sala de Aulas normal",
			"Sala atribuída à aula": "1E06",
		},
		{
			Curso: "LIGE, LIGE-PL",
			"Unidade Curricular": "Marketing para as Tecnologias",
			Turno: "01769PL03",
			Turma: "IGE-PL-C2, IGE-PL-C1",
			"Inscritos no turno": "21",
			"Dia da semana": "Ter",
			"Hora início da aula": "18:00:00",
			"Hora fim da aula": "19:30:00",
			"Data da aula": "13/09/2022",
			"Características da sala pedida para a aula": "Sala de Aulas normal",
			"Sala atribuída à aula": "1E06",
		},
		{
			Curso: "DATMC",
			"Unidade Curricular":
				"Projecto de Investigação em Arquitectura dos Territórios Metropolitanos Contemporâneos (24ects)",
			Turno: "03953OT02",
			Turma: "DATMC1",
			"Inscritos no turno": "2",
			"Dia da semana": "Qua",
			"Hora início da aula": "18:00:00",
			"Hora fim da aula": "19:00:00",
			"Data da aula": "02/11/2022",
			"Características da sala pedida para a aula": "Sala/anfiteatro aulas",
			"Sala atribuída à aula": "C2.02",
		},
	];
}

/**
 * Devolve um conjunto de dados do HorarioDeExemplo.csv numa string JSON.
 *
 * See {@link TableRow}
 * @returns {string} string que representa o json
 */
export function getTestFileJSONString(): string {
	return '[{"Curso":"ME","Unidade Curricular":"Teoria dos Jogos e dos Contratos","Turno":"01789TP01","Turma":"MEA1","Inscritos no turno":"30","Dia da semana":"Sex","Hora início da aula":"13:00:00","Hora fim da aula":"14:30:00","Data da aula":"02/12/2022","Características da sala pedida para a aula":"Sala Aulas Mestrado","Sala atribuída à aula":"AA2.25"},{"Curso":"ME","Unidade Curricular":"Teoria dos Jogos e dos Contratos","Turno":"01789TP01","Turma":"MEA1","Inscritos no turno":"30","Dia da semana":"Seg","Hora início da aula":"14:30:00","Hora fim da aula":"16:00:00","Data da aula":"28/11/2022","Características da sala pedida para a aula":"Sala Aulas Mestrado","Sala atribuída à aula":"AA2.25"},{"Curso":"ME","Unidade Curricular":"Teoria dos Jogos e dos Contratos","Turno":"01789TP01","Turma":"MEA1","Inscritos no turno":"30","Dia da semana":"Seg","Hora início da aula":"14:30:00","Hora fim da aula":"16:00:00","Data da aula":"21/11/2022","Características da sala pedida para a aula":"Sala Aulas Mestrado","Sala atribuída à aula":"AA2.25"},{"Curso":"ME","Unidade Curricular":"Teoria dos Jogos e dos Contratos","Turno":"01789TP01","Turma":"MEA1","Inscritos no turno":"30","Dia da semana":"Seg","Hora início da aula":"14:30:00","Hora fim da aula":"16:00:00","Data da aula":"14/11/2022","Características da sala pedida para a aula":"Sala Aulas Mestrado","Sala atribuída à aula":"AA2.25"},{"Curso":"ME","Unidade Curricular":"Teoria dos Jogos e dos Contratos","Turno":"01789TP01","Turma":"MEA1","Inscritos no turno":"30","Dia da semana":"Seg","Hora início da aula":"14:30:00","Hora fim da aula":"16:00:00","Data da aula":"07/11/2022","Características da sala pedida para a aula":"Sala Aulas Mestrado","Sala atribuída à aula":"AA2.25"},{"Curso":"LG, LGIL","Unidade Curricular":"Microeconomia","Turno":"L5004T04","Turma":"GiA2, GiA1","Inscritos no turno":"59","Dia da semana":"Seg","Hora início da aula":"11:00:00","Hora fim da aula":"12:30:00","Data da aula":"26/09/2022","Características da sala pedida para a aula":"Anfiteatro aulas","Sala atribuída à aula":"C5.07"},{"Curso":"LDSA, LTDIA, LTDSAU, LTDSEG","Unidade Curricular":"Matemática Aplicada","Turno":"04299TP05","Turma":"LTDS-A1","Inscritos no turno":"0","Dia da semana":"Sex","Hora início da aula":"09:30:00","Hora fim da aula":"12:30:00","Data da aula":"25/11/2022","Características da sala pedida para a aula":"Não necessita de sala","Sala atribuída à aula":""},{"Curso":"LDSA, LTDIA, LTDSAU, LTDSEG","Unidade Curricular":"Matemática Aplicada","Turno":"04299TP05","Turma":"LTDS-A1","Inscritos no turno":"0","Dia da semana":"Sex","Hora início da aula":"09:30:00","Hora fim da aula":"12:30:00","Data da aula":"18/11/2022","Características da sala pedida para a aula":"Não necessita de sala","Sala atribuída à aula":""},{"Curso":"LDSA, LTDIA, LTDSAU, LTDSEG","Unidade Curricular":"Matemática Aplicada","Turno":"04299TP05","Turma":"LTDS-A1","Inscritos no turno":"0","Dia da semana":"Sex","Hora início da aula":"09:30:00","Hora fim da aula":"12:30:00","Data da aula":"11/11/2022","Características da sala pedida para a aula":"Não necessita de sala","Sala atribuída à aula":""},{"Curso":"LIGE, LIGE-PL","Unidade Curricular":"Marketing para as Tecnologias","Turno":"01769PL03","Turma":"IGE-PL-C2, IGE-PL-C1","Inscritos no turno":"21","Dia da semana":"Ter","Hora início da aula":"18:00:00","Hora fim da aula":"19:30:00","Data da aula":"20/09/2022","Características da sala pedida para a aula":"Sala de Aulas normal","Sala atribuída à aula":"1E06"},{"Curso":"LIGE, LIGE-PL","Unidade Curricular":"Marketing para as Tecnologias","Turno":"01769PL03","Turma":"IGE-PL-C2, IGE-PL-C1","Inscritos no turno":"21","Dia da semana":"Ter","Hora início da aula":"18:00:00","Hora fim da aula":"19:30:00","Data da aula":"13/09/2022","Características da sala pedida para a aula":"Sala de Aulas normal","Sala atribuída à aula":"1E06"},{"Curso":"DATMC","Unidade Curricular":"Projecto de Investigação em Arquitectura dos Territórios Metropolitanos Contemporâneos (24ects)","Turno":"03953OT02","Turma":"DATMC1","Inscritos no turno":"2","Dia da semana":"Qua","Hora início da aula":"18:00:00","Hora fim da aula":"19:00:00","Data da aula":"02/11/2022","Características da sala pedida para a aula":"Sala/anfiteatro aulas","Sala atribuída à aula":"C2.02"}]';
}

export function getEmptyTable(): TableRow[] {
	return [{ Message: "Dados ainda não inseridos" }];
}

/**
 * Devolve um conjunto de dados do HorarioDeExemplo.csv em string sem header.
 * @returns {String} string sem header dos dados do horário
 */
export function getTestFileTextWithoutHeaders(): string {
	return `ME;Teoria dos Jogos e dos Contratos;01789TP01;MEA1;30;Sex;13:00:00;14:30:00;02/12/2022;Sala Aulas Mestrado;AA2.25
ME;Teoria dos Jogos e dos Contratos;01789TP01;MEA1;30;Seg;14:30:00;16:00:00;28/11/2022;Sala Aulas Mestrado;AA2.25
ME;Teoria dos Jogos e dos Contratos;01789TP01;MEA1;30;Seg;14:30:00;16:00:00;21/11/2022;Sala Aulas Mestrado;AA2.25
ME;Teoria dos Jogos e dos Contratos;01789TP01;MEA1;30;Seg;14:30:00;16:00:00;14/11/2022;Sala Aulas Mestrado;AA2.25
ME;Teoria dos Jogos e dos Contratos;01789TP01;MEA1;30;Seg;14:30:00;16:00:00;07/11/2022;Sala Aulas Mestrado;AA2.25
LG, LGIL;Microeconomia;L5004T04;GiA2, GiA1;59;Seg;11:00:00;12:30:00;26/09/2022;Anfiteatro aulas;C5.07
LDSA, LTDIA, LTDSAU, LTDSEG;Matemática Aplicada;04299TP05;LTDS-A1;0;Sex;09:30:00;12:30:00;25/11/2022;Não necessita de sala;
LDSA, LTDIA, LTDSAU, LTDSEG;Matemática Aplicada;04299TP05;LTDS-A1;0;Sex;09:30:00;12:30:00;18/11/2022;Não necessita de sala;
LDSA, LTDIA, LTDSAU, LTDSEG;Matemática Aplicada;04299TP05;LTDS-A1;0;Sex;09:30:00;12:30:00;11/11/2022;Não necessita de sala;
LIGE, LIGE-PL;Marketing para as Tecnologias;01769PL03;IGE-PL-C2, IGE-PL-C1;21;Ter;18:00:00;19:30:00;20/09/2022;Sala de Aulas normal;1E06
LIGE, LIGE-PL;Marketing para as Tecnologias;01769PL03;IGE-PL-C2, IGE-PL-C1;21;Ter;18:00:00;19:30:00;13/09/2022;Sala de Aulas normal;1E06
DATMC;Projecto de Investigação em Arquitectura dos Territórios Metropolitanos Contemporâneos (24ects);03953OT02;DATMC1;2;Qua;18:00:00;19:00:00;02/11/2022;Sala/anfiteatro aulas;C2.02
`;
}

/**
 * Devolve um conjunto de dados com header númerico do HorarioDeExemplo.csv em JSON.
 *
 * See {@link TableRow}
 * @returns {TableRow[]} Array<JSON> sem header personalizado dos dados do horário
 */
export function getTestFileWithoutHeadersJSON(): TableRow[] {
	return [
		{
			"0": "ME",
			"1": "Teoria dos Jogos e dos Contratos",
			"2": "01789TP01",
			"3": "MEA1",
			"4": "30",
			"5": "Seg",
			"6": "14:30:00",
			"7": "16:00:00",
			"8": "28/11/2022",
			"9": "Sala Aulas Mestrado",
			"10": "AA2.25",
		},
		{
			"0": "ME",
			"1": "Teoria dos Jogos e dos Contratos",
			"2": "01789TP01",
			"3": "MEA1",
			"4": "30",
			"5": "Seg",
			"6": "14:30:00",
			"7": "16:00:00",
			"8": "21/11/2022",
			"9": "Sala Aulas Mestrado",
			"10": "AA2.25",
		},
		{
			"0": "ME",
			"1": "Teoria dos Jogos e dos Contratos",
			"2": "01789TP01",
			"3": "MEA1",
			"4": "30",
			"5": "Seg",
			"6": "14:30:00",
			"7": "16:00:00",
			"8": "14/11/2022",
			"9": "Sala Aulas Mestrado",
			"10": "AA2.25",
		},
		{
			"0": "ME",
			"1": "Teoria dos Jogos e dos Contratos",
			"2": "01789TP01",
			"3": "MEA1",
			"4": "30",
			"5": "Seg",
			"6": "14:30:00",
			"7": "16:00:00",
			"8": "07/11/2022",
			"9": "Sala Aulas Mestrado",
			"10": "AA2.25",
		},
		{
			"0": "LG, LGIL",
			"1": "Microeconomia",
			"2": "L5004T04",
			"3": "GiA2, GiA1",
			"4": "59",
			"5": "Seg",
			"6": "11:00:00",
			"7": "12:30:00",
			"8": "26/09/2022",
			"9": "Anfiteatro aulas",
			"10": "C5.07",
		},
		{
			"0": "LDSA, LTDIA, LTDSAU, LTDSEG",
			"1": "Matemática Aplicada",
			"2": "04299TP05",
			"3": "LTDS-A1",
			"4": "0",
			"5": "Sex",
			"6": "09:30:00",
			"7": "12:30:00",
			"8": "25/11/2022",
			"9": "Não necessita de sala",
			"10": "",
		},
		{
			"0": "LDSA, LTDIA, LTDSAU, LTDSEG",
			"1": "Matemática Aplicada",
			"2": "04299TP05",
			"3": "LTDS-A1",
			"4": "0",
			"5": "Sex",
			"6": "09:30:00",
			"7": "12:30:00",
			"8": "18/11/2022",
			"9": "Não necessita de sala",
			"10": "",
		},
		{
			"0": "LDSA, LTDIA, LTDSAU, LTDSEG",
			"1": "Matemática Aplicada",
			"2": "04299TP05",
			"3": "LTDS-A1",
			"4": "0",
			"5": "Sex",
			"6": "09:30:00",
			"7": "12:30:00",
			"8": "11/11/2022",
			"9": "Não necessita de sala",
			"10": "",
		},
		{
			"0": "LIGE, LIGE-PL",
			"1": "Marketing para as Tecnologias",
			"2": "01769PL03",
			"3": "IGE-PL-C2, IGE-PL-C1",
			"4": "21",
			"5": "Ter",
			"6": "18:00:00",
			"7": "19:30:00",
			"8": "20/09/2022",
			"9": "Sala de Aulas normal",
			"10": "1E06",
		},
		{
			"0": "LIGE, LIGE-PL",
			"1": "Marketing para as Tecnologias",
			"2": "01769PL03",
			"3": "IGE-PL-C2, IGE-PL-C1",
			"4": "21",
			"5": "Ter",
			"6": "18:00:00",
			"7": "19:30:00",
			"8": "13/09/2022",
			"9": "Sala de Aulas normal",
			"10": "1E06",
		},
		{
			"0": "DATMC",
			"1": "Projecto de Investigação em Arquitectura dos Territórios Metropolitanos Contemporâneos (24ects)",
			"2": "03953OT02",
			"3": "DATMC1",
			"4": "2",
			"5": "Qua",
			"6": "18:00:00",
			"7": "19:00:00",
			"8": "02/11/2022",
			"9": "Sala/anfiteatro aulas",
			"10": "C2.02",
		},
	];
}

/**
 * Dummy Evento com URL preenchido.
 * @param {String} url - URL a passar para colocar no Forms
 * @returns {FakeEvent} - evento com alguns atributos preenchidos para teste
 */
export function getTestEventWithUrl(url: string): FakeEvent {
	return {
		preventDefault: function () {
			return;
		},
		currentTarget: stringToHTMLElement(`<form id="localUpload" method="post">
                    <input name="localFile" type="file" multiple accept=".csv">
                    <h6 class="line-border">or</h6>
                    <input name="remoteFile" type="text" id="fileInput" value=${url}>
                    <button type="submit">UPLOAD</button>
                </form>`) as HTMLElement,
	};
}

/**
 * Buscar Event com forms vazio.
 * @returns {FakeEvent} - evento com forms vazio
 */
export function getTestEventWithEmptyValues(): FakeEvent {
	return {
		preventDefault: function () {
			return;
		},
		currentTarget: stringToHTMLElement(`<form id="localUpload" method="post">
                    <input name="localFile" type="file" multiple accept=".csv">
                    <h6 class="line-border">or</h6>
                    <input name="remoteFile" type="text" id="fileInput">
                    <button type="submit">UPLOAD</button>
                </form>`) as HTMLElement,
	};
}

export function getPopUpUpload() {
	return parseToDocument(`<section id="PopUpUpload">
        <script type="module" src="ts/uploadCsv.ts"></script>
        <div>
            <button id="ClosePopUp" type="close"></button>
            <h3>UPLOAD .CSV</h3>
            <form id="localUpload" method="post">
                <input name="localFile" type="file" accept=".csv,.json">
                <h6 class="line-border">or</h6>

                <input name="remoteFile" type="text" id="fileInput">


                <button type="submit">UPLOAD</button>
            </form>
        </div>
    </section>`);
}

export function getPopUpSave() {
	return parseToDocument(`<section id="PopUpSave" class="hidden">
        <div>
            <button id="ClosePopUpSave" type="close"></button>
            <h3>SAVE TABLE</h3>
            <div class="form">
                <button id="SaveFileCSV" type="save">SAVE .CSV</button>
                <button id="SaveFileJSON" type="save">SAVE .JSON</button>
            </div>
        </div>
    </section>`);
}

export function getFullDocument() {
	return parseToDocument(`<html><head>
  <script type="module" src="/@vite/client"></script>

    <meta charset="UTF-8">
    <title>Gestor de Horarios</title>
    <link rel="icon" type="image/x-icon" href="graphics/images/iconSeparador.png">
    <script type="module" src="ts/init.ts"></script>
    <script type="text/javascript" src="https://unpkg.com/tabulator-tables@4.8.4/dist/js/tabulator.min.js"></script>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <header>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Logo_ISCTE_Instituto_Universit%C3%A1rio_de_Lisboa.svg/740px-Logo_ISCTE_Instituto_Universit%C3%A1rio_de_Lisboa.svg.png">
    </header>
    <section id="PopUpUpload" class="hidden">
        <script type="module" src="ts/uploadCsv.ts"></script>
        <div>
            <button id="ClosePopUp" type="close"></button>
            <h3>UPLOAD .CSV</h3>
            <form id="localUpload" method="post">
                <input name="localFile" type="file" accept=".csv,.json">
                <h6 class="line-border">or</h6>

                <input name="remoteFile" type="text" id="fileInput">

                <select name="fileType">
                    <option>Default</option>
                    <option>Características</option>
                    <option>Horário</option>
                </select>
                <button type="submit">UPLOAD</button>
            </form>
        </div>
    </section>
    <section id="PopUpSave" class="hidden">
        <div>
            <button id="ClosePopUpSave" type="close"></button>
            <h3>SAVE TABLE</h3>
            <div class="form">
                <button id="SaveFileCSV" type="save">SAVE .CSV</button>
                <button id="SaveFileJSON" type="save">SAVE .JSON</button>
            </div>
        </div>
    </section>
    <section id="HeroBanner">
        <img src="graphics/images/HeroBanner.png">
        <button id="OpenPopUp" type="file" accept=".csv">
            <img src="graphics/svg/CloudUpload.svg">
            <span>UPLOAD .CSV or .JSON</span>
    </button></section>
    <section id="MainTable">
        <div id="HorarioPrincipal" class="tabela tabulator" role="grid" tabulator-layout="fitDataFill" filters="off">
		<div class="tabulator-header" style="padding-right: 0px;"><div class="tabulator-headers" style="margin-left: 0px;">
		<div class="tabulator-col tabulator-sortable" role="columnheader" aria-sort="none" tabulator-field="Curso" title="" style="min-width: 40px; height: 122px; width: 113px;"><div class="tabulator-col-content">
		<div class="tabulator-col-title-holder"><div class="tabulator-col-title">Curso</div><div class="tabulator-col-sorter">
		<div class="tabulator-arrow">
		</div>
		<button class="hidden tabulator-hideColumn-toggle-button">
		</button></div></div><div class="tabulator-header-filter">
		<input type="search" placeholder="Filtrar 'AND'" style="padding: 4px; width: 100%; box-sizing: border-box;">
		<input placeholder="Filtrar 'OR'" class="hidden filter-OR">
		</div>
		</div>
		<div class="tabulator-col-resize-handle">
		</div>
		<div class="tabulator-col-resize-handle prev">
		</div>
		</div>
		<div class="tabulator-col tabulator-sortable" role="columnheader" aria-sort="none" tabulator-field="Unidade Curricular" title="" style="min-width: 40px; height: 122px; width: 113px;">
		<div class="tabulator-col-content">
		<div class="tabulator-col-title-holder">
		<div class="tabulator-col-title">
		Unidade Curricular
		</div>
		<div class="tabulator-col-sorter"><div class="tabulator-arrow"></div><button class="hidden tabulator-hideColumn-toggle-button"></button></div></div><div class="tabulator-header-filter"><input type="search" placeholder="Filtrar 'AND'" style="padding: 4px; width: 100%; box-sizing: border-box;"><input placeholder="Filtrar 'OR'" class="hidden filter-OR"></div></div><div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-col tabulator-sortable" role="columnheader" aria-sort="none" tabulator-field="Turno" title="" style="min-width: 40px; height: 122px; width: 113px;"><div class="tabulator-col-content"><div class="tabulator-col-title-holder"><div class="tabulator-col-title">Turno</div><div class="tabulator-col-sorter"><div class="tabulator-arrow"></div><button class="hidden tabulator-hideColumn-toggle-button"></button></div></div><div class="tabulator-header-filter"><input type="search" placeholder="Filtrar 'AND'" style="padding: 4px; width: 100%; box-sizing: border-box;"><input placeholder="Filtrar 'OR'" class="hidden filter-OR"></div></div><div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-col tabulator-sortable" role="columnheader" aria-sort="none" tabulator-field="Turma" title="" style="min-width: 40px; height: 122px; width: 113px;"><div class="tabulator-col-content"><div class="tabulator-col-title-holder"><div class="tabulator-col-title">Turma</div><div class="tabulator-col-sorter"><div class="tabulator-arrow"></div><button class="hidden tabulator-hideColumn-toggle-button"></button></div></div><div class="tabulator-header-filter"><input type="search" placeholder="Filtrar 'AND'" style="padding: 4px; width: 100%; box-sizing: border-box;"><input placeholder="Filtrar 'OR'" class="hidden filter-OR"></div></div><div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-col tabulator-sortable" role="columnheader" aria-sort="none" tabulator-field="Inscritos no turno" title="" style="min-width: 40px; height: 122px; width: 113px;"><div class="tabulator-col-content"><div class="tabulator-col-title-holder"><div class="tabulator-col-title">Inscritos no turno</div><div class="tabulator-col-sorter"><div class="tabulator-arrow"></div><button class="hidden tabulator-hideColumn-toggle-button"></button></div></div><div class="tabulator-header-filter"><input type="search" placeholder="Filtrar 'AND'" style="padding: 4px; width: 100%; box-sizing: border-box;"><input placeholder="Filtrar 'OR'" class="hidden filter-OR"></div></div><div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-col tabulator-sortable" role="columnheader" aria-sort="none" tabulator-field="Dia da semana" title="" style="min-width: 40px; height: 122px; width: 113px;"><div class="tabulator-col-content"><div class="tabulator-col-title-holder"><div class="tabulator-col-title">Dia da semana</div><div class="tabulator-col-sorter"><div class="tabulator-arrow"></div><button class="hidden tabulator-hideColumn-toggle-button"></button></div></div><div class="tabulator-header-filter"><input type="search" placeholder="Filtrar 'AND'" style="padding: 4px; width: 100%; box-sizing: border-box;"><input placeholder="Filtrar 'OR'" class="hidden filter-OR"></div></div><div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-col tabulator-sortable" role="columnheader" aria-sort="none" tabulator-field="Hora início da aula" title="" style="min-width: 40px; height: 122px; width: 113px;"><div class="tabulator-col-content"><div class="tabulator-col-title-holder"><div class="tabulator-col-title">Hora início da aula</div><div class="tabulator-col-sorter"><div class="tabulator-arrow"></div><button class="hidden tabulator-hideColumn-toggle-button"></button></div></div><div class="tabulator-header-filter"><input type="search" placeholder="Filtrar 'AND'" style="padding: 4px; width: 100%; box-sizing: border-box;"><input placeholder="Filtrar 'OR'" class="hidden filter-OR"></div></div><div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-col tabulator-sortable" role="columnheader" aria-sort="none" tabulator-field="Hora fim da aula" title="" style="min-width: 40px; height: 122px; width: 113px;"><div class="tabulator-col-content"><div class="tabulator-col-title-holder"><div class="tabulator-col-title">Hora fim da aula</div><div class="tabulator-col-sorter"><div class="tabulator-arrow"></div><button class="hidden tabulator-hideColumn-toggle-button"></button></div></div><div class="tabulator-header-filter"><input type="search" placeholder="Filtrar 'AND'" style="padding: 4px; width: 100%; box-sizing: border-box;"><input placeholder="Filtrar 'OR'" class="hidden filter-OR"></div></div><div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-col tabulator-sortable" role="columnheader" aria-sort="none" tabulator-field="Data da aula" title="" style="min-width: 40px; height: 122px; width: 113px;"><div class="tabulator-col-content"><div class="tabulator-col-title-holder"><div class="tabulator-col-title">Data da aula</div><div class="tabulator-col-sorter"><div class="tabulator-arrow"></div><button class="hidden tabulator-hideColumn-toggle-button"></button></div></div><div class="tabulator-header-filter"><input type="search" placeholder="Filtrar 'AND'" style="padding: 4px; width: 100%; box-sizing: border-box;"><input placeholder="Filtrar 'OR'" class="hidden filter-OR"></div></div><div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-col tabulator-sortable" role="columnheader" aria-sort="none" tabulator-field="Características da sala pedida para a aula" title="" style="min-width: 40px; height: 122px; width: 113px;"><div class="tabulator-col-content"><div class="tabulator-col-title-holder"><div class="tabulator-col-title">Características da sala pedida para a aula</div><div class="tabulator-col-sorter"><div class="tabulator-arrow"></div><button class="hidden tabulator-hideColumn-toggle-button"></button></div></div><div class="tabulator-header-filter"><input type="search" placeholder="Filtrar 'AND'" style="padding: 4px; width: 100%; box-sizing: border-box;"><input placeholder="Filtrar 'OR'" class="hidden filter-OR"></div></div><div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-col tabulator-sortable" role="columnheader" aria-sort="none" tabulator-field="Sala atribuída à aula" title="" style="min-width: 40px; height: 122px; width: 113px;"><div class="tabulator-col-content"><div class="tabulator-col-title-holder"><div class="tabulator-col-title">Sala atribuída à aula</div><div class="tabulator-col-sorter"><div class="tabulator-arrow"></div><button class="hidden tabulator-hideColumn-toggle-button"></button></div></div><div class="tabulator-header-filter"><input type="search" placeholder="Filtrar 'AND'" style="padding: 4px; width: 100%; box-sizing: border-box;"><input placeholder="Filtrar 'OR'" class="hidden filter-OR"></div></div><div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-col tabulator-sortable" role="columnheader" aria-sort="none" tabulator-field="Semana do Ano" title="" style="min-width: 40px; height: 122px; width: 113px;"><div class="tabulator-col-content"><div class="tabulator-col-title-holder"><div class="tabulator-col-title">Semana do Ano</div><div class="tabulator-col-sorter"><div class="tabulator-arrow"></div><button class="hidden tabulator-hideColumn-toggle-button"></button></div></div><div class="tabulator-header-filter"><input type="search" placeholder="Filtrar 'AND'" style="padding: 4px; width: 100%; box-sizing: border-box;"><input placeholder="Filtrar 'OR'" class="hidden filter-OR"></div></div><div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-col tabulator-sortable" role="columnheader" aria-sort="none" tabulator-field="Semana do Semestre" title="" style="min-width: 40px; height: 122px; width: 113px;"><div class="tabulator-col-content"><div class="tabulator-col-title-holder"><div class="tabulator-col-title">Semana do Semestre</div><div class="tabulator-col-sorter"><div class="tabulator-arrow"></div><button class="hidden tabulator-hideColumn-toggle-button"></button></div></div><div class="tabulator-header-filter"><input type="search" placeholder="Filtrar 'AND'" style="padding: 4px; width: 100%; box-sizing: border-box;"><input placeholder="Filtrar 'OR'" class="hidden filter-OR"></div></div><div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div></div><div class="tabulator-frozen-rows-holder"></div></div><div class="tabulator-tableHolder" tabindex="0" style="height: 392px;"><div class="tabulator-table" style="padding-top: 0px; padding-bottom: 0px;"><div class="tabulator-row tabulator-selectable tabulator-row-odd" role="row" style="padding-left: 0px;"><div class="tabulator-cell" role="gridcell" tabulator-field="Curso" title="" style="height: 61px; width: 113px;">ME<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Unidade Curricular" title="" style="height: 61px; width: 113px;">Teoria dos Jogos e dos Contratos<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Turno" title="" style="height: 61px; width: 113px;">01789TP01<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Turma" title="" style="height: 61px; width: 113px;">MEA1<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Inscritos no turno" title="" style="height: 61px; width: 113px;">30<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Dia da semana" title="" style="height: 61px; width: 113px;">Sex<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Hora início da aula" title="" style="height: 61px; width: 113px;">13:00:00<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Hora fim da aula" title="" style="height: 61px; width: 113px;">14:30:00<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Data da aula" title="" style="height: 61px; width: 113px;">02/12/2022<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Características da sala pedida para a aula" title="" style="height: 61px; width: 113px;">Sala Aulas Mestrado<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Sala atribuída à aula" title="" style="height: 61px; width: 113px;">AA2.25<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Semana do Ano" title="" style="height: 61px; width: 113px;">49<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Semana do Semestre" title="" style="height: 61px; width: 113px;">14<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div></div><div class="tabulator-row tabulator-selectable tabulator-row-even" role="row" style="padding-left: 0px;"><div class="tabulator-cell" role="gridcell" tabulator-field="Curso" title="" style="height: 61px; width: 113px;">ME<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Unidade Curricular" title="" style="height: 61px; width: 113px;">Teoria dos Jogos e dos Contratos<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Turno" title="" style="height: 61px; width: 113px;">01789TP01<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Turma" title="" style="height: 61px; width: 113px;">MEA1<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Inscritos no turno" title="" style="height: 61px; width: 113px;">30<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Dia da semana" title="" style="height: 61px; width: 113px;">Qua<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Hora início da aula" title="" style="height: 61px; width: 113px;">13:00:00<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Hora fim da aula" title="" style="height: 61px; width: 113px;">14:30:00<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Data da aula" title="" style="height: 61px; width: 113px;">23/11/2022<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Características da sala pedida para a aula" title="" style="height: 61px; width: 113px;">Sala Aulas Mestrado<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Sala atribuída à aula" title="" style="height: 61px; width: 113px;">AA2.25<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Semana do Ano" title="" style="height: 61px; width: 113px;">48<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Semana do Semestre" title="" style="height: 61px; width: 113px;">13<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div></div><div class="tabulator-row tabulator-selectable tabulator-row-odd" role="row" style="padding-left: 0px;"><div class="tabulator-cell" role="gridcell" tabulator-field="Curso" title="" style="height: 61px; width: 113px;">ME<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Unidade Curricular" title="" style="height: 61px; width: 113px;">Teoria dos Jogos e dos Contratos<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Turno" title="" style="height: 61px; width: 113px;">01789TP01<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Turma" title="" style="height: 61px; width: 113px;">MEA1<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Inscritos no turno" title="" style="height: 61px; width: 113px;">30<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Dia da semana" title="" style="height: 61px; width: 113px;">Qua<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Hora início da aula" title="" style="height: 61px; width: 113px;">13:00:00<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Hora fim da aula" title="" style="height: 61px; width: 113px;">14:30:00<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Data da aula" title="" style="height: 61px; width: 113px;">16/11/2022<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Características da sala pedida para a aula" title="" style="height: 61px; width: 113px;">Sala Aulas Mestrado<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Sala atribuída à aula" title="" style="height: 61px; width: 113px;">AA2.25<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Semana do Ano" title="" style="height: 61px; width: 113px;">47<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Semana do Semestre" title="" style="height: 61px; width: 113px;">12<div class="tabulator-col-resize-handle">
		</div><div class="tabulator-col-resize-handle prev"></div></div></div><div class="tabulator-row tabulator-selectable tabulator-row-even" role="row" style="padding-left: 0px;"><div class="tabulator-cell" role="gridcell" tabulator-field="Curso" title="" style="height: 61px; width: 113px;">ME<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Unidade Curricular" title="" style="height: 61px; width: 113px;">Teoria dos Jogos e dos Contratos<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Turno" title="" style="height: 61px; width: 113px;">01789TP01<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Turma" title="" style="height: 61px; width: 113px;">MEA1<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Inscritos no turno" title="" style="height: 61px; width: 113px;">30<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Dia da semana" title="" style="height: 61px; width: 113px;">Qua<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Hora início da aula" title="" style="height: 61px; width: 113px;">13:00:00<div class="tabulator-col-resize-handle">
		</div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Hora fim da aula" title="" style="height: 61px; width: 113px;">14:30:00<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Data da aula" title="" style="height: 61px; width: 113px;">09/11/2022<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Características da sala pedida para a aula" title="" style="height: 61px; width: 113px;">Sala Aulas Mestrado<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Sala atribuída à aula" title="" style="height: 61px; width: 113px;">AA2.25<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Semana do Ano" title="" style="height: 61px; width: 113px;">46<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Semana do Semestre" title="" style="height: 61px; width: 113px;">11<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div></div><div class="tabulator-row tabulator-selectable tabulator-row-odd" role="row" style="padding-left: 0px;"><div class="tabulator-cell" role="gridcell" tabulator-field="Curso" title="" style="height: 61px; width: 113px;">ME<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Unidade Curricular" title="" style="height: 61px; width: 113px;">Teoria dos Jogos e dos Contratos<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Turno" title="" style="height: 61px; width: 113px;">01789TP01<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Turma" title="" style="height: 61px; width: 113px;">MEA1<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Inscritos no turno" title="" style="height: 61px; width: 113px;">30<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Dia da semana" title="" style="height: 61px; width: 113px;">Qua<div class="tabulator-col-resize-handle">
		</div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Hora início da aula" title="" style="height: 61px; width: 113px;">13:00:00<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Hora fim da aula" title="" style="height: 61px; width: 113px;">14:30:00<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Data da aula" title="" style="height: 61px; width: 113px;">02/11/2022<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Características da sala pedida para a aula" title="" style="height: 61px; width: 113px;">Sala Aulas Mestrado<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Sala atribuída à aula" title="" style="height: 61px; width: 113px;">AA2.25<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Semana do Ano" title="" style="height: 61px; width: 113px;">45<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Semana do Semestre" title="" style="height: 61px; width: 113px;">10<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div></div><div class="tabulator-row tabulator-selectable tabulator-row-even" role="row" style="padding-left: 0px;"><div class="tabulator-cell" role="gridcell" tabulator-field="Curso" title="" style="height: 61px; width: 113px;">ME<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Unidade Curricular" title="" style="height: 61px; width: 113px;">Teoria dos Jogos e dos Contratos<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Turno" title="" style="height: 61px; width: 113px;">01789TP01<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Turma" title="" style="height: 61px; width: 113px;">MEA1<div class="tabulator-col-resize-handle">
		</div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Inscritos no turno" title="" style="height: 61px; width: 113px;">30<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Dia da semana" title="" style="height: 61px; width: 113px;">Seg<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Hora início da aula" title="" style="height: 61px; width: 113px;">13:00:00<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Hora fim da aula" title="" style="height: 61px; width: 113px;">14:30:00<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Data da aula" title="" style="height: 61px; width: 113px;">28/11/2022<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Características da sala pedida para a aula" title="" style="height: 61px; width: 113px;">Sala Aulas Mestrado<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Sala atribuída à aula" title="" style="height: 61px; width: 113px;">AA2.25<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Semana do Ano" title="" style="height: 61px; width: 113px;">49<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Semana do Semestre" title="" style="height: 61px; width: 113px;">14<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div></div><div class="tabulator-row tabulator-selectable tabulator-row-odd" role="row" style="padding-left: 0px;"><div class="tabulator-cell" role="gridcell" tabulator-field="Curso" title="" style="height: 61px; width: 113px;">ME<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Unidade Curricular" title="" style="height: 61px; width: 113px;">Teoria dos Jogos e dos Contratos<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Turno" title="" style="height: 61px; width: 113px;">01789TP01<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Turma" title="" style="height: 61px; width: 113px;">MEA1<div class="tabulator-col-resize-handle">
		</div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Inscritos no turno" title="" style="height: 61px; width: 113px;">30<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Dia da semana" title="" style="height: 61px; width: 113px;">Seg<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Hora início da aula" title="" style="height: 61px; width: 113px;">13:00:00<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Hora fim da aula" title="" style="height: 61px; width: 113px;">14:30:00<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Data da aula" title="" style="height: 61px; width: 113px;">21/11/2022<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Características da sala pedida para a aula" title="" style="height: 61px; width: 113px;">Sala Aulas Mestrado<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Sala atribuída à aula" title="" style="height: 61px; width: 113px;">AA2.25<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Semana do Ano" title="" style="height: 61px; width: 113px;">48<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Semana do Semestre" title="" style="height: 61px; width: 113px;">13<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div></div><div class="tabulator-row tabulator-selectable tabulator-row-even" role="row" style="padding-left: 0px;"><div class="tabulator-cell" role="gridcell" tabulator-field="Curso" title="" style="height: 57px; width: 113px;">ME<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Unidade Curricular" title="" style="height: 57px; width: 113px;">Teoria dos Jogos e dos Contratos<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Turno" title="" style="height: 57px; width: 113px;">01789TP01<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Turma" title="" style="height: 57px; width: 113px;">MEA1<div class="tabulator-col-resize-handle">
		</div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Inscritos no turno" title="" style="height: 57px; width: 113px;">30<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Dia da semana" title="" style="height: 57px; width: 113px;">Seg<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Hora início da aula" title="" style="height: 57px; width: 113px;">13:00:00<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Hora fim da aula" title="" style="height: 57px; width: 113px;">14:30:00<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Data da aula" title="" style="height: 57px; width: 113px;">14/11/2022<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Características da sala pedida para a aula" title="" style="height: 57px; width: 113px;">Sala Aulas Mestrado<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Sala atribuída à aula" title="" style="height: 57px; width: 113px;">AA2.25<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Semana do Ano" title="" style="height: 57px; width: 113px;">47<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Semana do Semestre" title="" style="height: 57px; width: 113px;">12<div class="tabulator-col-resize-handle">
		</div><div class="tabulator-col-resize-handle prev"></div></div></div><div class="tabulator-row tabulator-selectable tabulator-row-odd" role="row" style="padding-left: 0px;"><div class="tabulator-cell" role="gridcell" tabulator-field="Curso" title="" style="height: 51px; width: 113px;">ME<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Unidade Curricular" title="" style="height: 51px; width: 113px;">Teoria dos Jogos e dos Contratos<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Turno" title="" style="height: 51px; width: 113px;">01789TP01<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Turma" title="" style="height: 51px; width: 113px;">MEA1<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Inscritos no turno" title="" style="height: 51px; width: 113px;">30<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Dia da semana" title="" style="height: 51px; width: 113px;">Seg<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Hora início da aula" title="" style="height: 51px; width: 113px;">13:00:00<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Hora fim da aula" title="" style="height: 51px; width: 113px;">14:30:00<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Data da aula" title="" style="height: 51px; width: 113px;">07/11/2022<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Características da sala pedida para a aula" title="" style="height: 51px; width: 113px;">Sala Aulas Mestrado<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Sala atribuída à aula" title="" style="height: 51px; width: 113px;">AA2.25<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Semana do Ano" title="" style="height: 51px; width: 113px;">46<div class="tabulator-col-resize-handle">
		</div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Semana do Semestre" title="" style="height: 51px; width: 113px;">11<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div></div><div class="tabulator-row tabulator-selectable tabulator-row-even" role="row" style="padding-left: 0px;"><div class="tabulator-cell" role="gridcell" tabulator-field="Curso" title="" style="height: 46px; width: 113px;">ME<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Unidade Curricular" title="" style="height: 46px; width: 113px;">Teoria dos Jogos e dos Contratos<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Turno" title="" style="height: 46px; width: 113px;">01789TP01<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Turma" title="" style="height: 46px; width: 113px;">MEA1<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Inscritos no turno" title="" style="height: 46px; width: 113px;">30<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Dia da semana" title="" style="height: 46px; width: 113px;">Ter<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Hora início da aula" title="" style="height: 46px; width: 113px;">13:00:00<div class="tabulator-col-resize-handle">
		</div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Hora fim da aula" title="" style="height: 46px; width: 113px;">14:30:00<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Data da aula" title="" style="height: 46px; width: 113px;">29/11/2022<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Características da sala pedida para a aula" title="" style="height: 46px; width: 113px;">Sala Aulas Mestrado<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Sala atribuída à aula" title="" style="height: 46px; width: 113px;">AA2.25<div class="tabulator-col-resize-handle"></div><div class="tabulator-col-resize-handle prev"></div></div><div class="tabulator-cell" role="gridcell" tabulator-field="Semana do Ano" title="" style="height: 46px; width: 113px;">49<div class="tabulator-col-resize-handle"></div>
		<div class="tabulator-col-resize-handle prev"></div></div>
		<div class="tabulator-cell" role="gridcell" tabulator-field="Semana do Semestre" title="" style="height: 46px; width: 113px;">14<div class="tabulator-col-resize-handle"></div>
		<div class="tabulator-col-resize-handle prev"></div></div></div></div></div>
		<div class="tabulator-footer"><span class="tabulator-paginator">
		<button class="tabulator-save-toggle-button"></button>
		<button class="tabulator-edit-toggle-button" toggled="off"></button><button class="tabulator-filter-toggle-button"></button>
		<label>Page Size</label><select class="tabulator-page-size" aria-label="Page Size" title="Page Size">
		<option value="5">5</option><option value="10">10</option><option value="20">20</option><option value="40">40</option></select>
		<button class="tabulator-page" type="button" role="button" aria-label="First Page" title="First Page" data-page="first" disabled="">First</button>
		<button class="tabulator-page" type="button" role="button" aria-label="Prev Page" title="Prev Page" data-page="prev" disabled="">Prev</button><span class="tabulator-pages">
		<button class="tabulator-page active" type="button" role="button" aria-label="Show Page 1" title="Show Page 1" data-page="1">1</button>
		<button class="tabulator-page" type="button" role="button" aria-label="Show Page 2" title="Show Page 2" data-page="2">2</button>
		<button class="tabulator-page" type="button" role="button" aria-label="Show Page 3" title="Show Page 3" data-page="3">3</button>
		<button class="tabulator-page" type="button" role="button" aria-label="Show Page 4" title="Show Page 4" data-page="4">4</button>
		<button class="tabulator-page" type="button" role="button" aria-label="Show Page 5" title="Show Page 5" data-page="5">5</button></span>
		<button class="tabulator-page" type="button" role="button" aria-label="Next Page" title="Next Page" data-page="next">Next</button>
		<button class="tabulator-page" type="button" role="button" aria-label="Last Page" title="Last Page" data-page="last">Last</button></span></div></div>
        <div id="HorarioPrincipalHiddenColumns">
            <ul>

            </ul>
        </div>
    </section>
    <section id="SuggestSlots">
        <button class="styled-button">Sugerir slots para alocação da aula de substituição</button><div id="ReplacementClass" style="display: none;">
            <div id="ReplacementClassCriteria">
                <div class="ContainerTimeTable">
                    <h3>Caracteristicas de Horario</h3>
                <div class="criteria-container criteria-container-timeTable"><label>       Duração:
                <select class="criteria-duration-selector">
                    <option value="30">30m</option>
                    <option value="60">1h</option>
                    <option value="90">1h30m</option>
                    <option value="120">2h</option>
                    <option value="150">2h30m</option>
                    <option value="180">3h</option>
                </select>
        </label><div class="criteria-container-components">
            <div class="criteria-column-container">

            <select class="criteria-column-selector">
                        <option value="Dia da semana">Dia da semana</option>
                        <option value="Hora início da aula">Hora início da aula</option>
                        <option value="Data da aula">Data da aula</option>
                </select></div>

            <div class="criteria-filter-option-container">
            <select class="criteria-filter-option-selector">
                <option selected="" value="==">Incluir</option>
                <option value="!=">Excluir</option>
                <option class="extra-options" value=">=" style="display: none;"> &gt;= </option>
                <option class="extra-options" value="<=" style="display: none;"> &lt;= </option>
            </select>
            </div>

            <div class="criteria-input-container">
                <input class="criteria-input" type="text">
            </div>
      </div><button>+And</button><div class="criteria-label-container"><label class="criteria-label"></label></div></div><button>Or</button></div>
                <div class="ContainerCharacteristics">
                    <h3>Caracteristicas de Sala</h3>
                <div class="criteria-container criteria-container-characteristics"><div class="criteria-container-components">
            <div class="criteria-column-container">

            <select class="criteria-column-selector">
                        <option value="Edifício">Edifício</option>
                        <option value="Nome sala">Nome sala</option>
                        <option value="Capacidade Normal">Capacidade Normal</option>
                        <option value="Capacidade Exame">Capacidade Exame</option>
                        <option value="Características">Características</option>
                </select></div>

            <div class="criteria-filter-option-container">
            <select class="criteria-filter-option-selector">
                <option selected="" value="==">Incluir</option>
                <option value="!=">Excluir</option>
                <option class="extra-options" value=">=" style="display: none;"> &gt;= </option>
                <option class="extra-options" value="<=" style="display: none;"> &lt;= </option>
            </select>
            </div>

            <div class="criteria-input-container">
                <input class="criteria-input" type="text">
            </div>
      </div><button>+And</button><div class="criteria-label-container"><label class="criteria-label"></label></div></div><button>Or</button></div>
            <button class="styled-button">Gerar tabela</button></div>
            <div id="ReplacementClassTable">
                <div id="ReplacementClassTimeTable">

                </div>
                <div id="ReplacementClassTimeTableHiddenColumns">
                    <ul>

                    </ul>
                </div>
            </div>
        </div>
        <button class="styled-button">Sugerir slots para alocação das aulas UC</button><div id="UcClass" style="display: none;">
            <div id="UcClassInformation">
            <label>
                Quantas aulas pretende marcar:
                <input type="text">
            </label>
        </div>
            <div id="UcClassCriteria">
                <div class="ContainerTimeTable">

                <div class="criteria-container criteria-container-timeTable"><label>       Duração:
                <select class="criteria-duration-selector">
                    <option value="30">30m</option>
                    <option value="60">1h</option>
                    <option value="90">1h30m</option>
                    <option value="120">2h</option>
                    <option value="150">2h30m</option>
                    <option value="180">3h</option>
                </select>
        </label><div class="criteria-container-components">
            <div class="criteria-column-container">

            <select class="criteria-column-selector">
                        <option value="Dia da semana">Dia da semana</option>
                        <option value="Hora início da aula">Hora início da aula</option>
                        <option value="Data da aula">Data da aula</option>
                </select></div>

            <div class="criteria-filter-option-container">
            <select class="criteria-filter-option-selector">
                <option selected="" value="==">Incluir</option>
                <option value="!=">Excluir</option>
                <option class="extra-options" value=">=" style="display: none;"> &gt;= </option>
                <option class="extra-options" value="<=" style="display: none;"> &lt;= </option>
            </select>
            </div>

            <div class="criteria-input-container">
                <input class="criteria-input" type="text">
            </div>
      </div><button>+And</button><div class="criteria-label-container"><label class="criteria-label"></label></div></div><button>Or</button></div>
                <div class="ContainerCharacteristics">

                <div class="criteria-container criteria-container-characteristics"><div class="criteria-container-components">
            <div class="criteria-column-container">

            <select class="criteria-column-selector">
                        <option value="Edifício">Edifício</option>
                        <option value="Nome sala">Nome sala</option>
                        <option value="Capacidade Normal">Capacidade Normal</option>
                        <option value="Capacidade Exame">Capacidade Exame</option>
                        <option value="Características">Características</option>
                </select></div>

            <div class="criteria-filter-option-container">
            <select class="criteria-filter-option-selector">
                <option selected="" value="==">Incluir</option>
                <option value="!=">Excluir</option>
                <option class="extra-options" value=">=" style="display: none;"> &gt;= </option>
                <option class="extra-options" value="<=" style="display: none;"> &lt;= </option>
            </select>
            </div>

            <div class="criteria-input-container">
                <input class="criteria-input" type="text">
            </div>
      </div><button>+And</button><div class="criteria-label-container"><label class="criteria-label"></label></div></div><button>Or</button></div>
            <button class="styled-button">Gerar tabela</button></div>
            <div id="UcClassTable">
                <div id="UcClassTimeTable">

                </div>
                <div id="UcClassTimeTableHiddenColumns">
                    <ul>

                    </ul>
                </div>
            </div>
        </div>

    </section>
    <section id="conflitsNetwork">
        <button class="styled-button">Network conflit Graph</button><div id="NetworkDiagram" style="display: none;">
            <div id="NetworkDiagramCriteria">
                <div class="ContainerTimeTable">
                    <h3>Caracteristicas de Horario</h3>

                </div>
            <button class="styled-button">Gerar grafo</button></div>
            <div id="NetworkDiagramGraph" style="height: 850px;" class="hidden">

            </div>
        </div>
    </section>
    <section id="conflitsHeat">
        <button class="styled-button">Heat Map conflit</button><div id="HeatMap" style="display: none;">
            <h3 style="text-align: center;">Definições de Horario</h3>
            <div id="HeatMapSettings">

                <label id="tipoHeatMap">
                    Tipo de Heat Map:
                    <select class="styled-selector">
                        <option value="Ocupação">
                            Ocupação
                        </option>
                        <option value="Disponbilidade">
                            Disponbilidade
                        </option>
                    </select>
                </label>
                <br>
                <label id="eixoXHeatMap">
                    Eixo X:
                    <select class="styled-selector">
                        <option value="Dia da semana">
                            Dia da semana
                        </option>
                        <option value="Data da aula">
                            Dia do mês
                        </option>
                    </select>
                </label>
                <p>
                    Eixo Y: Horas
                </p>
                <div>
                    Periodo que pretende analisar:
                    <br>
                    <div>
                        <label>
                            Inicio:
                            <input id="inicio" type="date" class="styled-selector">
                        </label>
                        <label>
                            Fim:
                            <input id="fim" type="date" class="styled-selector">
                        </label>
                    </div>


                </div>
            </div>
            <div id="HeatMapCriteria">
                <div class="ContainerCharacteristics">
                    <h3>Caracteristicas de Horario</h3>

                </div>
            <button class="styled-button">Gerar heat map</button></div>
            <div id="map" style="height: 850px;">

            </div>
        </div>
    </section>
    <div id="tempTable" class="hidden">

    </div>
    <script type="module" src="ts/table.ts"></script>
    <!-- <script type="module" src="ts/suggestSlotst.ts"></script> -->
    <script type="module" src="ts/suggestSlotsUC.ts"></script>
    <script type="module" src="ts/networkGraphDiagram.ts"></script>
    <script type="module" src="ts/heatMap.ts"></script>


</body></html>`);
}

export function getHorarioDiv() {
	return stringToHTMLElement(`<div id="HorarioPrincipal" class="tabela"></div>`);
}

export function getTablutator() {
	return [
		{
			"Características da sala pedida para a aula": "Sala Aulas Mestrado",
			"Curso": "ME",
			"Data da aula": "02/12/2022",
			"Dia da semana": "Sex",
			"Hora fim da aula": "14:30:00",
			"Hora início da aula": "13:00:00",
			"Inscritos no turno": "30",
			"Sala atribuída à aula": "AA2.25",
			"Semana do Ano": 49,
			"Semana do Semestre": 12,
			"Turma": "MEA1",
			"Turno": "01789TP01",
			"Unidade Curricular": "Teoria dos Jogos e dos Contratos",
		},
		{
			"Características da sala pedida para a aula": "Sala Aulas Mestrado",
			"Curso": "ME",
			"Data da aula": "28/11/2022",
			"Dia da semana": "Seg",
			"Hora fim da aula": "16:00:00",
			"Hora início da aula": "14:30:00",
			"Inscritos no turno": "30",
			"Sala atribuída à aula": "AA2.25",
			"Semana do Ano": 49,
			"Semana do Semestre": 12,
			"Turma": "MEA1",
			"Turno": "01789TP01",
			"Unidade Curricular": "Teoria dos Jogos e dos Contratos",
		},
		{
			"Características da sala pedida para a aula": "Sala Aulas Mestrado",
			"Curso": "ME",
			"Data da aula": "21/11/2022",
			"Dia da semana": "Seg",
			"Hora fim da aula": "16:00:00",
			"Hora início da aula": "14:30:00",
			"Inscritos no turno": "30",
			"Sala atribuída à aula": "AA2.25",
			"Semana do Ano": 48,
			"Semana do Semestre": 11,
			"Turma": "MEA1",
			"Turno": "01789TP01",
			"Unidade Curricular": "Teoria dos Jogos e dos Contratos",
		},
		{
			"Características da sala pedida para a aula": "Sala Aulas Mestrado",
			"Curso": "ME",
			"Data da aula": "14/11/2022",
			"Dia da semana": "Seg",
			"Hora fim da aula": "16:00:00",
			"Hora início da aula": "14:30:00",
			"Inscritos no turno": "30",
			"Sala atribuída à aula": "AA2.25",
			"Semana do Ano": 47,
			"Semana do Semestre": 10,
			"Turma": "MEA1",
			"Turno": "01789TP01",
			"Unidade Curricular": "Teoria dos Jogos e dos Contratos",
		},
		{
			"Características da sala pedida para a aula": "Sala Aulas Mestrado",
			"Curso": "ME",
			"Data da aula": "07/11/2022",
			"Dia da semana": "Seg",
			"Hora fim da aula": "16:00:00",
			"Hora início da aula": "14:30:00",
			"Inscritos no turno": "30",
			"Sala atribuída à aula": "AA2.25",
			"Semana do Ano": 46,
			"Semana do Semestre": 9,
			"Turma": "MEA1",
			"Turno": "01789TP01",
			"Unidade Curricular": "Teoria dos Jogos e dos Contratos",
		},
		{
			"Características da sala pedida para a aula": "Anfiteatro aulas",
			"Curso": "LG, LGIL",
			"Data da aula": "26/09/2022",
			"Dia da semana": "Seg",
			"Hora fim da aula": "12:30:00",
			"Hora início da aula": "11:00:00",
			"Inscritos no turno": "59",
			"Sala atribuída à aula": "C5.07",
			"Semana do Ano": 40,
			"Semana do Semestre": 3,
			"Turma": "GiA2, GiA1",
			"Turno": "L5004T04",
			"Unidade Curricular": "Microeconomia",
		},
		{
			"Características da sala pedida para a aula": "Não necessita de sala",
			"Curso": "LDSA, LTDIA, LTDSAU, LTDSEG",
			"Data da aula": "25/11/2022",
			"Dia da semana": "Sex",
			"Hora fim da aula": "12:30:00",
			"Hora início da aula": "09:30:00",
			"Inscritos no turno": "0",
			"Sala atribuída à aula": "",
			"Semana do Ano": 48,
			"Semana do Semestre": 11,
			"Turma": "LTDS-A1",
			"Turno": "04299TP05",
			"Unidade Curricular": "Matemática Aplicada",
		},
		{
			"Características da sala pedida para a aula": "Não necessita de sala",
			"Curso": "LDSA, LTDIA, LTDSAU, LTDSEG",
			"Data da aula": "18/11/2022",
			"Dia da semana": "Sex",
			"Hora fim da aula": "12:30:00",
			"Hora início da aula": "09:30:00",
			"Inscritos no turno": "0",
			"Sala atribuída à aula": "",
			"Semana do Ano": 47,
			"Semana do Semestre": 10,
			"Turma": "LTDS-A1",
			"Turno": "04299TP05",
			"Unidade Curricular": "Matemática Aplicada",
		},
		{
			"Características da sala pedida para a aula": "Não necessita de sala",
			"Curso": "LDSA, LTDIA, LTDSAU, LTDSEG",
			"Data da aula": "11/11/2022",
			"Dia da semana": "Sex",
			"Hora fim da aula": "12:30:00",
			"Hora início da aula": "09:30:00",
			"Inscritos no turno": "0",
			"Sala atribuída à aula": "",
			"Semana do Ano": 46,
			"Semana do Semestre": 9,
			"Turma": "LTDS-A1",
			"Turno": "04299TP05",
			"Unidade Curricular": "Matemática Aplicada",
		},
		{
			"Características da sala pedida para a aula": "Sala de Aulas normal",
			"Curso": "LIGE, LIGE-PL",
			"Data da aula": "20/09/2022",
			"Dia da semana": "Ter",
			"Hora fim da aula": "19:30:00",
			"Hora início da aula": "18:00:00",
			"Inscritos no turno": "21",
			"Sala atribuída à aula": "1E06",
			"Semana do Ano": 39,
			"Semana do Semestre": 2,
			"Turma": "IGE-PL-C2, IGE-PL-C1",
			"Turno": "01769PL03",
			"Unidade Curricular": "Marketing para as Tecnologias",
		},
		{
			"Características da sala pedida para a aula": "Sala de Aulas normal",
			"Curso": "LIGE, LIGE-PL",
			"Data da aula": "13/09/2022",
			"Dia da semana": "Ter",
			"Hora fim da aula": "19:30:00",
			"Hora início da aula": "18:00:00",
			"Inscritos no turno": "21",
			"Sala atribuída à aula": "1E06",
			"Semana do Ano": 38,
			"Semana do Semestre": 1,
			"Turma": "IGE-PL-C2, IGE-PL-C1",
			"Turno": "01769PL03",
			"Unidade Curricular": "Marketing para as Tecnologias",
		},
		{
			"Características da sala pedida para a aula": "Sala/anfiteatro aulas",
			"Curso": "DATMC",
			"Data da aula": "02/11/2022",
			"Dia da semana": "Qua",
			"Hora fim da aula": "19:00:00",
			"Hora início da aula": "18:00:00",
			"Inscritos no turno": "2",
			"Sala atribuída à aula": "C2.02",
			"Semana do Ano": 45,
			"Semana do Semestre": 8,
			"Turma": "DATMC1",
			"Turno": "03953OT02",
			"Unidade Curricular": "Projecto de Investigação em Arquitectura dos Territórios Metropolitanos Contemporâneos (24ects)",
		},
	]
}

export function parseToDocument(html: string): Document {
	let parser = new DOMParser();
	return parser.parseFromString(html, "text/html");
}