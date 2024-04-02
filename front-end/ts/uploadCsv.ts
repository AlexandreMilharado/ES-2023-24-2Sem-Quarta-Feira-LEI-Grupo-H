"use-strict";
import axios from "axios";
import { setData } from "./table";
import { togglePopUp } from "./init";

/**
 * Server's Path
 * @type {String}
 */
const SERVER: string = "http://localhost:3001";

/**
 * Upload .CSV Module
 * @module UploadCSV
 */

/**
 * Forms de upload .CSV
 * @type {Form}
 * TODO mudar de lugar
 */
const LOCAL_FORM: HTMLElement | null = document.getElementById("localUpload");
LOCAL_FORM?.addEventListener("submit", handleSubmit);

/**
 * CsvCell - célula da tabela.
 * @type {string | number}
 */
export type CsvCell = string | number;

/**
 * Linha de dados do .CSV.
 * @interface CsvRow
 */
export interface CsvRow {
  [key: string]: CsvCell;
}

/**
 * Dados do forms upload .CSV.
 * @interface FormDataJson
 * TODO
 */
export interface FormDataJson {
  localFile: File;
  remoteFile: string;
}

/**
 * Recebe um ficheiro .csv local ou o url de um ficheiro csv remoto.
 *
 * Se existir um .csv local e um url ao mesmo tempo vai dar prioridade ao ficheiro local,
 * caso contrário faz um chamada a API para ir buscar o ficheiro .csv.
 *
 * Formata corretamente o ficheiro .CSV num [{...}, {...}, ...] e chama a função
 * "setData(file)" que irá atualizar os dados no tabulator.
 * Limpa os inputs e depois fecha o popUp de upload.
 *
 * Example remote URL: https://raw.githubusercontent.com/AlexandreMilharado/filesToUpload/main/HorarioDeExemplo.csv
 *
 * Example local URL: ./Software-Engineering/frontend/others/HorarioDeExemplo.csv
 *
 * See {@link setData}.
 * @param {SubmitEvent} event - Evento para buscar forms
 * @param {Function} [handleData] - Função a executar após a transformação do ficheiro
 */
export async function handleSubmit(
  event: SubmitEvent,
  handleData: (file: CsvRow[]) => void = setData
): Promise<string | void> {
  if (!event) return;

  event.preventDefault();

  const form: HTMLFormElement = event.currentTarget as HTMLFormElement;

  const { localFile, remoteFile }: FormDataJson = formDataToJson(
    new FormData(form)
  );

  if (remoteFile === "" && localFile?.size === 0)
    return "Forms não preenchido.";

  form.reset();
  togglePopUp(false);

  // Ficheiro local
  if (!needToDownloadCsv(localFile, remoteFile))
    return formatToString(localFile)
      .then((formatedFile) => formatCsv(formatedFile))
      .then((file) => handleData(file));

  // Ficheiro remoto
  return axios
    .post(`${SERVER}/uploadHorario`, {
      url: remoteFile,
    })
    .then((r) => formatCsv(r.data.csvData))
    .then((file) => handleData(file))
    .catch((e) =>
      e.response?.data
        ? JSON.stringify(e.response.data)
        : "Não conseguiu conectar-se ao servidor."
    );
}

/**
 * Função que transforma os inputs com os respetivos values num JSON.
 *
 * Exemplo: {"localFile" : localFile.value,"remoteFile": remoteFile.value }
 *
 * Ver {@link FormDataJson}
 *
 * @param {FormData} formData - new FormData(forms)
 * @returns {FormDataJson} FormData em JSON
 */
export function formDataToJson(formData: FormData): FormDataJson {
  return {
    localFile: formData.get("localFile") as File,
    remoteFile: formData.get("remoteFile") as string,
  };
}

/**
 * Verifica se precisa de fazer a chamada a API para fazer download do ficheiro.
 *
 * Propriedades: Nesta função dá-se prioridade ao ficheiro local, ou seja, se ambos os campos
 * estiverem preenchidos apenas vai buscar o ficheiro local.
 * @param {File} localFile - Ficheiro .CSV local
 * @param {String} remoteFile - URL do ficheiro .CSV remoto
 * @returns {Boolean} - Boolean para saber se é preciso fazer download do ficheiro .CSV
 */
export function needToDownloadCsv(
  localFile: File,
  remoteFile: string
): boolean {
  return localFile?.size == 0 && remoteFile !== null && remoteFile !== "";
}

/**
 * Recebe um ficheiro e transforma-o em string.
 * @param {File} localFile - Ficheiro .CSV local
 * @returns {Promise<string>} Local File em string
 */
export async function formatToString(localFile: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      resolve(text);
    };
    reader.readAsText(localFile);
  });
}

/**
 * Recebe em texto um ficheiro .csv e transforma-o num array de json's, [{...}, {...}, ...].
 *
 * Assume-se que existe headers no texto passado.
 * Se conter ";" no header, assume-se uma separação de linhas com ";",
 * caso contrário usa-se o delimitador ",".
 * Se existir alguma linha sem dados ignora-a não devolvendo-a no CsvRow[].
 * Ver {@link CsvCell} | {@link CsvRow}
 *
 * @param {String} text - Ficheiro de texto do .CSV
 * @param {Boolean} [enableHeaders] - (opcional) o ficheiro enviado tem headers, por default tem.
 * @returns {CsvRow[]} Ficheiro .CSV formatado
 */
export function formatCsv(
  text: string,
  enableHeaders: boolean = true
): CsvRow[] {
  const splitedText: string[] = text.split(new RegExp("\r\n|\n|\r"));
  const delimiter: string =
    splitedText.length > 0 && splitedText[0].includes(";") ? ";" : ",";

  const headers: CsvCell[] = enableHeaders
    ? splitedText[0].split(delimiter)
    : splitedText[0].split(delimiter).map((_element, index) => index);

  const dataRows: string[] = splitedText
    .slice(1)
    .filter((row) => row.length != 0);

  return dataRows.map((linha) =>
    linha.split(delimiter).reduce((json, currentCell, coluna) => {
      json[headers[coluna]] = currentCell;
      return json;
    }, {} as CsvRow)
  );
}
