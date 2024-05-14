import { describe, it, expect } from "vitest";
import { saveFileCSV, saveFileJSON } from "../ts/tableDownload";
import {
	getEmptyTable,
	getTestFileJSON,
	getTestFileJSONString,
	getTestFileText,
} from "./utilities";

// describe("saveFileJSON", () => {
//     // vi.stubGlobal("document", "Hey");
//     // document = "hey"
//     // document = new HTMLDocument()
//     // import { JSDOM } from "jsdom"
//     // const dom = new JSDOM()
//     // global.document = dom.window.document
//     // global.window = dom.windowº

// 	it("testname", async () => {
// 		//Something
// 		const output = getTestFileJSON();
// 		expect(saveFileJSON(output, () => {})).toBeCalled();
// 	});
// 	it("testname", async () => {
// 		//Something
// 		const a = false;
// 		expect(a).toBe(false);
// 	});
// });

// vi.stubGlobal("document", vi.fn())
// vi.mock("../ts/table", async (importOriginal) => {
// 	const actual = await importOriginal();
// 	return {
// 		// @ts-ignore
//         ...actual,
// 		saveToFile(data: string, filename: string) {
// 			return {
// 				data,
// 				filename,
// 			};
// 		},
// 	};
// });
// describe("saveFileJSON", () => {
// 	// const fake = vi.fn()
// 	//vi.stubGlobal('tabledata', null)
// 	it("testname", async () => {
// 		//Something
// 		const a = false;
// 		expect(saveFileJSON(getTestFileJSON())).toBe(false);
// 	});
// 	it("testname", async () => {
// 		//Something
// 		const a = false;
// 		expect(a).toBe(false);
// 	});
// });

// describe("downloadTextFile", () => {
//     it("should download the file", () => {
//     //   const link = {
//     //     click: vi.fn()
//     //   };
//     const saveToFile = vi.fn()
//     //   vi.spyOn(document, "createElement").mockImplementation(() => link);

//       saveFileJSON(getTestFileJSON());
//     //   vi.spyOn()
//     expect(saveToFile).toHaveBeenCalled()

//     //   expect(link.className).toEqual("download-helper");
//     //   expect(link.download).toEqual("test-file.txt");
//     //   expect(link.href).toEqual("data:application/txt,hello%20world");
//     //   expect(link.click).toHaveBeenCalledTimes(1);
//     });
//   });

describe("saveFileJSON", () => {
	it("Formata corretamente o TableRow[] numa string imprimivel.", async () => {
		let expectedResults = getTestFileJSONString();
		let resuls = saveFileJSON(getTestFileJSON(), (data, _) => data);
		expect(resuls).toBe(expectedResults);
	});
	it("Coloca o nome certo no ficheiro.", async () => {
		let expectedResults = "save.json";
		let resuls = saveFileJSON(getTestFileJSON(), (_, filename) => filename);
		expect(resuls).toBe(expectedResults);
	});
	it("Não faz download se a tabela não estiver preenchida.", async () => {
		let resuls = saveFileJSON(getEmptyTable(), (_, __) => true);
		expect(resuls).toBeNull;
	});
});
describe("saveFileCSV", () => {
	it("Formata corretamente o TableRow[] numa string imprimivel.", async () => {
		let expectedResults = getTestFileText();
		let resuls: string = saveFileCSV(getTestFileJSON(), (data, _) => data);
		expect(resuls.trim()).toEqual(expectedResults.trim());
	});
	it("Coloca o nome certo no ficheiro.", async () => {
		let expectedResults = "save.csv";
		let resuls = saveFileCSV(getTestFileJSON(), (_, filename) => filename);
		expect(resuls).toBe(expectedResults);
	});
	it("Não faz download se a tabela não estiver preenchida.", async () => {
		let resuls = saveFileCSV(getEmptyTable(), (_, __) => true);
		expect(resuls).toBeNull;
	});
	it("Escolhe corretamente o separador.", async () => {
		const test1: boolean =
			saveFileCSV(
				[
					{
						colunaDeTeste: "valorDeTeste",
						colunaSemPontoEVirgulaNemVirgula:
							"ValorSemPontoEVirgulaNemVirgula",
					},
				],
				(data, _) => data
			) ===
			`colunaDeTeste;colunaSemPontoEVirgulaNemVirgula
valorDeTeste;ValorSemPontoEVirgulaNemVirgula`;
		const test2: boolean =
			saveFileCSV(
				[
					{
						colunaDeTeste: "valorDeTeste",
						colunaComPontoEVirgula: "ValorComPontoEVirgula;",
					},
				],
				(data, _) => data
			) ===
			`colunaDeTeste,colunaComPontoEVirgula
valorDeTeste,ValorComPontoEVirgula;`;
		const test3: boolean =
			saveFileCSV(
				[
					{
						colunaDeTeste: "valorDeTeste",
						colunaComVirgula: "ValorComVirgula,",
					},
				],
				(data, _) => data
			) ===
			`colunaDeTeste;colunaComVirgula
valorDeTeste;ValorComVirgula,`;
		const test4: boolean =
			saveFileCSV(
				[
					{
						colunaDeTeste: "valorDeTeste",
						colunaComAmbos: "ValorComAmbos;,",
					},
				],
				(data, _) => data
			) ===
			`colunaDeTeste,colunaComAmbos
valorDeTeste,ValorComAmbos;,`;
		let resuls = test1 && test2 && test3 && test4;

		expect(resuls).toBe(true);
	});
});
