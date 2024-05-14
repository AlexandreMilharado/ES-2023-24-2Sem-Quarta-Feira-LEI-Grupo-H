import { describe, it, expect, beforeAll, test } from "vitest";
import {
  getTestEventWithEmptyValues,
  getTestEventWithUrl,
  getTestFile,
  getTestFileJSON,
  getTestFileText,
  getTestFileTextWithoutHeaders,
  getTestFileWithoutHeadersJSON,
  stringToHTMLElement,
} from "./utilities";
import {
  formDataToJson,
  formatCsv,
  formatToString,
  handleSubmit,
  needToDownloadCsv,
  checkBackendStatus,
  loadInitialCsvFiles,
} from "../ts/uploadCsv";
import { TableRow } from "../ts/interfaces";

/**
 * Para testar é recomendado ligar o servidor backend. Caso não o faça, defina TESTBACKEND para false.
 * @vitest-environment jsdom
 */
describe("handleSubmit", () => {
  const TESTBACKEND = true;
  // it.skip("SKIP A TEST");
  // it.todo("ADD UNSPECIFIED TESTS");

  // let backendStatus: string;
  // beforeAll(async () => {
  // 	backendStatus = await checkBackendStatus();
  // });

  it.runIf(TESTBACKEND)(
    "devolve uma mensagem de erro caso o link do ficheiro for inválido",
    async () => {
      let event: any = getTestEventWithUrl(
        "https://rw.githubusercontent.com/AlexandreMilharado/filesToUpload/main/HorarioDeTeste.csv"
      );
      const result: string | void = await handleSubmit(event, (file) => file);
      const expectedError = { error: "Failed to fetch CSV/JSON file" };
      expect(result).toEqual(expectedError);
    }
  );

  it.runIf(TESTBACKEND)(
    "devolve uma mensagem de erro caso o link do ficheiro não acabar em .CSV ou .JSON",
    async () => {
      const expectedError = { error: "Failed to fetch CSV/JSON file" };
      let event: any = getTestEventWithUrl(
        "https://raw.githubusercontent.com/AlexandreMilharado/filesToUpload/main/HorarioDeTeste.cs"
      );
      let result: string | void = await handleSubmit(
        event,
        (file) => file,
        () => { }
      );
      expect(result).toEqual(expectedError);
      event = getTestEventWithUrl(
        "https://raw.githubusercontent.com/AlexandreMilharado/filesToUpload/main/HorarioDeTeste.csv2"
      );
      result = await handleSubmit(
        event,
        (file) => file,
        () => { }
      );
      expect(result).toEqual(expectedError);
      event = getTestEventWithUrl(
        "https://raw.githubusercontent.com/AlexandreMilharado/filesToUpload/main/HorarioDeTeste.ajson"
      );
      result = await handleSubmit(
        event,
        (file) => file,
        () => { }
      );
      expect(result).toEqual(expectedError);
      event = getTestEventWithUrl(
        "https://raw.githubusercontent.com/AlexandreMilharado/filesToUpload/main/HorarioDeTeste."
      );
      result = await handleSubmit(
        event,
        (file) => file,
        () => { }
      );
      expect(result).toEqual(expectedError);
      event = getTestEventWithUrl(
        "https://raw.githubusercontent.com/AlexandreMilharado/filesToUpload/main/HorarioDeTeste"
      );
      result = await handleSubmit(
        event,
        (file) => file,
        () => { }
      );
      expect(result).toEqual(expectedError);
    }
  );

  it.runIf(TESTBACKEND)(
    "devolve o .JSON com formato correto dado um link para fazer o download",
    async () => {
      let event: any = getTestEventWithUrl(
        "https://raw.githubusercontent.com/AlexandreMilharado/filesToUpload/main/HorarioDeTeste.json"
      );
      const result: string | void = await handleSubmit(
        event,
        (_, file) => file
      );
      expect(JSON.stringify(result)).toEqual(JSON.stringify(getTestFileJSON()));
    }
  );

  it.runIf(TESTBACKEND)(
    "devolve o .CSV com formato correto dado um link para fazer o download",
    async () => {
      let event: any = getTestEventWithUrl(
        "https://raw.githubusercontent.com/AlexandreMilharado/filesToUpload/main/HorarioDeTeste.csv"
      );
      const result: string | void = await handleSubmit(
        event,
        (_, file) => file
      );
      // const isMatch: boolean =
      //   result === "Não conseguiu conectar-se ao servidor." ||
      //   JSON.stringify(result) === JSON.stringify(getTestFileJSON());
      expect(JSON.stringify(result)).toEqual(JSON.stringify(getTestFileJSON()));
    }
  );

  it('devolve "Forms não preenchido." caso o Forms não esteja preenchido', async () => {
    let event: any = getTestEventWithEmptyValues();
    const result: string | void = await handleSubmit(event, (file) => file);
    expect(result).toBe("Forms não preenchido.");
  });
});

describe("formatToString", () => {
  it("devolve corretamente o em texto o ficheiro passado como argumento", async () => {
    const text = await formatToString(getTestFile());

    expect(text).toStrictEqual(getTestFileText());
  });
});

describe("formDataToJson", () => {
  it("devolve um JSON com os campos do <input_name> vazios", () => {
    const form: HTMLFormElement =
      stringToHTMLElement(`<form id="localUpload" method="post">
                    <input name="localFile" type="file" multiple accept=".csv">
                    <h6 class="line-border">or</h6>
                    <input name="remoteFile" type="text" id="fileInput">
                    <button type="submit">UPLOAD</button>
                </form>`) as HTMLFormElement;
    const emptyFile: File = new File([""], "");

    expect(formDataToJson(new FormData(form))).toStrictEqual({
      fileType: null,
      localFile: emptyFile,
      remoteFile: "",
    });
  });

  it("devolve um JSON com o campo localFile preenchido com File e o campo remoteFile preenchido com o URL", () => {
    const file: File = getTestFile();
    const url: string =
      "https://raw.githubusercontent.com/AlexandreMilharado/filesToUpload/main/HorarioDeExemplo.csv";
    const form: HTMLFormElement =
      stringToHTMLElement(`<form id="localUpload" method="post">
                    <input name="localFile" type="file" multiple accept=".csv" value="${file}">
                    <h6 class="line-border">or</h6>
                    <input name="remoteFile" type="text" id="fileInput" value="${url}">
                    <button type="submit">UPLOAD</button>
                </form>`) as HTMLFormElement;

    expect(formDataToJson(new FormData(form))).toStrictEqual({
      fileType: null,
      localFile: file,
      remoteFile: url,
    });
  });

  it("devolve um JSON com os atributos a null se não existir <input_name> no forms", () => {
    const form: HTMLFormElement =
      stringToHTMLElement(`<form id="localUpload" method="post">
                </form>`) as HTMLFormElement;
    expect(formDataToJson(new FormData(form))).toStrictEqual({
      fileType: null,
      localFile: null,
      remoteFile: null,
    });
  });

  it('devolve um JSON com o atributo correspondente ao <input_name> e ignora o <input> sem propriedade "name"', () => {
    const form: HTMLFormElement =
      stringToHTMLElement(`<form id="localUpload" method="post">
                    <input type="file" multiple accept=".csv">
                    <h6 class="line-border">or</h6>
                    <input name="remoteFile" type="text" id="fileInput">
                    <button type="submit">UPLOAD</button>
                </form>`) as HTMLFormElement;

    expect(formDataToJson(new FormData(form))).toStrictEqual({
      localFile: null,
      remoteFile: "",
      fileType: null,
    });
  });
});

describe("needToDownloadCsv", () => {
  it("devolve false com ficheiro local vazio e sem url", () => {
    const emptyFile: File = new File([""], "");
    expect(needToDownloadCsv(emptyFile, "")).toBe(false);
  });

  it("devolve true com ficheiro local vazio e com url", () => {
    const emptyFile: File = new File([""], "");
    const url: string =
      "https://raw.githubusercontent.com/AlexandreMilharado/filesToUpload/main/HorarioDeExemplo.csv";
    expect(needToDownloadCsv(emptyFile, url)).toBe(true);
  });

  it("devolve false com conteúdo no ficheiro local e com url", () => {
    const file: File = getTestFile();
    const url: string =
      "https://raw.githubusercontent.com/AlexandreMilharado/filesToUpload/main/HorarioDeExemplo.csv";
    expect(needToDownloadCsv(file, url)).toBe(false);
  });
});

describe("formatCsv", () => {
  it("devolve Array<JSON> do ficheiro em texto com caracteres especiais(UTF-8) enviado como argumento", () => {
    expect(formatCsv(getTestFileText())).toEqual(getTestFileJSON());
  });

  it("devolve Array vazio de uma string vazia como argumento", () => {
    expect(formatCsv("")).toEqual([]);
  });

  it("remove linhas vazias do ficheiro em texto enviado como argumento", () => {
    expect(formatCsv(getTestFileText() + "\n")).toEqual(getTestFileJSON());
  });

  it('aceita como separador de linhas "\\r\\n" no ficheiro', () => {
    expect(formatCsv(getTestFileText().replace("\n", "\r\n"))).toEqual(
      getTestFileJSON()
    );
  });

  it('aceita como separador de linhas "\\r" no ficheiro', () => {
    expect(formatCsv(getTestFileText().replace("\n", "\r"))).toEqual(
      getTestFileJSON()
    );
  });

  it("devolve Array<JSON> do ficheiro sem header, criando um header automático", () => {
    expect(formatCsv(getTestFileTextWithoutHeaders(), false)).toEqual(
      getTestFileWithoutHeadersJSON()
    );
  });
});

describe('loadInitialCsvFiles', () => {
  it('dá load aos dados corretamente', async () => {
    let arrTable: TableRow[][] = [];
    let arrindex: number[] = [];
    function add(file: TableRow[], index: number): void {
      arrTable.push(file);
      arrindex.push(index);
    }
    loadInitialCsvFiles(add);
    expect(arrindex).toStrictEqual([]);
  });
});

describe('checkBackendStatus', () => {
  it('retorna a conexão com o servidor', async () => {
    const result = await checkBackendStatus();
    const bool = result == "OFFLINE" || result == "UNDEFINED" || result == "ONLINE";
    expect(bool).toBe(true);
  })
})