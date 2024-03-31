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
  handleSubmit,
  needToDownloadCsv,
} from "../js/uploadCsv";

/**
 * Para testar é recomendado ligar o servidor backend.
 * @vitest-environment jsdom
 */
describe("handleSubmit", () => {
  it("devolve uma mensagem de erro caso o link do .CSV for inválido", async () => {
    let event = getTestEventWithUrl(
      "https://rw.githubusercontent.com/AlexandreMilharado/filesToUpload/main/HorarioDeTeste.csv"
    );
    const result = await handleSubmit(event, (file) => file);
    const isMatch =
      result === `{"error":"Failed to fetch CSV file"}` ||
      result === "Não conseguiu conectar-se ao servidor.";
    expect(isMatch).toBe(true);
  });

  it("devolve o .CSV com formato correto dado um link para fazer o download", async () => {
    let event = getTestEventWithUrl(
      "https://raw.githubusercontent.com/AlexandreMilharado/filesToUpload/main/HorarioDeTeste.csv"
    );
    const result = await handleSubmit(event, (file) => file);
    const isMatch =
      result === "Não conseguiu conectar-se ao servidor." ||
      JSON.stringify(result) === JSON.stringify(getTestFileJSON());
    expect(isMatch).toBe(true);
  });

  it('devolve "Forms não preenchido." caso o Forms não esteja preenchido', async () => {
    let event = getTestEventWithEmptyValues();
    const result = await handleSubmit(event, (file) => file);
    expect(result).toBe("Forms não preenchido.");
  });
});

describe("formDataToJson", () => {
  it("devolve um JSON com os campos do <input_name> vazios", () => {
    const form = stringToHTMLElement(`<form id="localUpload" method="post">
                    <input name="localFile" type="file" multiple accept=".csv">
                    <h6 class="line-border">or</h6>
                    <input name="remoteFile" type="text" id="fileInput">
                    <button type="submit">UPLOAD</button>
                </form>`);
    const emptyFile = new File([""], "");

    expect(formDataToJson(new FormData(form))).toStrictEqual({
      localFile: emptyFile,
      remoteFile: "",
    });
  });

  it("devolve um JSON com o campo localFile preenchido com File e o campo remoteFile preenchido com o URL", () => {
    const file = getTestFile();
    const url =
      "https://raw.githubusercontent.com/AlexandreMilharado/filesToUpload/main/HorarioDeExemplo.csv";
    const form = stringToHTMLElement(`<form id="localUpload" method="post">
                    <input name="localFile" type="file" multiple accept=".csv" value="${file}">
                    <h6 class="line-border">or</h6>
                    <input name="remoteFile" type="text" id="fileInput" value="${url}">
                    <button type="submit">UPLOAD</button>
                </form>`);

    expect(formDataToJson(new FormData(form))).toStrictEqual({
      localFile: file,
      remoteFile: url,
    });
  });

  it("devolve um JSON sem atributos se não existir <input_name> no forms", () => {
    const form = stringToHTMLElement(`<form id="localUpload" method="post">
                </form>`);
    expect(formDataToJson(new FormData(form))).toStrictEqual({});
  });

  it('devolve um JSON com o atributo correspondente ao <input_name> e ignora o <input> sem propriedade "name"', () => {
    const form = stringToHTMLElement(`<form id="localUpload" method="post">
                    <input type="file" multiple accept=".csv">
                    <h6 class="line-border">or</h6>
                    <input name="remoteFile" type="text" id="fileInput">
                    <button type="submit">UPLOAD</button>
                </form>`);

    expect(formDataToJson(new FormData(form))).toStrictEqual({
      remoteFile: "",
    });
  });
});

describe("needToDownloadCsv", () => {
  it("devolve false com ficheiro local vazio e sem url", () => {
    const emptyFile = new File([""], "");
    expect(needToDownloadCsv(emptyFile, "")).toBe(false);
  });

  it("devolve true com ficheiro local vazio e com url", () => {
    const emptyFile = new File([""], "");
    const url =
      "https://raw.githubusercontent.com/AlexandreMilharado/filesToUpload/main/HorarioDeExemplo.csv";
    expect(needToDownloadCsv(emptyFile, url)).toBe(true);
  });

  it("devolve false com conteúdo no ficheiro local e com url", () => {
    const file = getTestFile();
    const url =
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
