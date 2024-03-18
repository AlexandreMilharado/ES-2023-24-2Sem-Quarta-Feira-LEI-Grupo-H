import { describe, it, expect } from "vitest";
import { getTestFile, stringToHTMLElement } from "./utilities";
import { formDataToJson } from "../js/uploadCsv";

/**
 * @vitest-environment jsdom
 */
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
