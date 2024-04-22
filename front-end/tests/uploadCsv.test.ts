import { describe, it, expect } from "vitest";
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
} from "../ts/uploadCsv";

/**
 * Para testar é recomendado ligar o servidor backend.
 * @vitest-environment jsdom
 */
describe("handleSubmit", () => {
  // it("devolve uma mensagem de erro caso o link do .CSV for inválido", async () => {
  //   let event: any = getTestEventWithUrl(
  //     "https://rw.githubusercontent.com/AlexandreMilharado/filesToUpload/main/HorarioDeTeste.csv"
  //   );
  //   const result: string | void = await handleSubmit(event, (file) => file);
  //   const isMatch: boolean =
  //     result === `{"error":"Failed to fetch CSV file"}` ||
  //     result === "Não conseguiu conectar-se ao servidor.";
  //   expect(isMatch).toBe(true);
  // });

  // it("devolve uma mensagem de erro caso o link do ficheiro não acabar em .CSV", async () => {
  //   let event: any = getTestEventWithUrl(
  //     "https://rw.githubusercontent.com/AlexandreMilharado/filesToUpload/main/HorarioDeTeste.cs"
  //   );
  //   const result: string | void = await handleSubmit(event, (file) => file);
  //   const isMatch: boolean =
  //     result === `{"error":"Failed to fetch CSV file"}` ||
  //     result === "Não conseguiu conectar-se ao servidor.";
  //   expect(isMatch).toBe(true);
  // });

  // it("devolve o .CSV com formato correto dado um link para fazer o download", async () => {
  //   let event: any = getTestEventWithUrl(
  //     "https://raw.githubusercontent.com/AlexandreMilharado/filesToUpload/main/HorarioDeTeste.csv"
  //   );
  //   const result: string | void = await handleSubmit(event, (file) => file);
  //   const isMatch: boolean =
  //     result === "Não conseguiu conectar-se ao servidor." ||
  //     JSON.stringify(result) === JSON.stringify(getTestFileJSON());
  //   expect(isMatch).toBe(true);
  // });

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
      localFile: file,
      remoteFile: url,
    });
  });

  it("devolve um JSON com os atributos a null se não existir <input_name> no forms", () => {
    const form: HTMLFormElement =
      stringToHTMLElement(`<form id="localUpload" method="post">
                </form>`) as HTMLFormElement;
    expect(formDataToJson(new FormData(form))).toStrictEqual({
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
