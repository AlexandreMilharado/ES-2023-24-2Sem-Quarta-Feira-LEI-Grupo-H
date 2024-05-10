import { TableRow } from "../ts/uploadCsv";

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
			"Características da sala pedida para a aula":
				"Não necessita de sala",
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
			"Características da sala pedida para a aula":
				"Não necessita de sala",
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
			"Características da sala pedida para a aula":
				"Não necessita de sala",
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
			"Características da sala pedida para a aula":
				"Sala de Aulas normal",
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
			"Características da sala pedida para a aula":
				"Sala de Aulas normal",
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
			"Características da sala pedida para a aula":
				"Sala/anfiteatro aulas",
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
		currentTarget:
			stringToHTMLElement(`<form id="localUpload" method="post">
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
		currentTarget:
			stringToHTMLElement(`<form id="localUpload" method="post">
                    <input name="localFile" type="file" multiple accept=".csv">
                    <h6 class="line-border">or</h6>
                    <input name="remoteFile" type="text" id="fileInput">
                    <button type="submit">UPLOAD</button>
                </form>`) as HTMLElement,
	};
}
