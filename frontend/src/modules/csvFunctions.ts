"use-strict";
import axios from "axios";
// import { setData } from "./table";

/**
 * Server's Path
 * @type {String}
 */
const SERVER: string = import.meta.env.BACKEND_SERVER;

/**
 * Upload .CSV Module
 * @module UploadCSV
 */

/**
 * Forms de upload .CSV
 * @type {Form}
 * TODO mudar de ligar
 */
const LOCAL_FORM = document.getElementById("localUpload");
LOCAL_FORM?.addEventListener("submit", handleSubmit);

/**
 * TODO
 */
type CsvCell = string | number;

/**
 * TODO
 */
interface CsvRow {
  [key: string]: CsvCell;
}

/**
 * TODO
 */
interface FormDataJson {
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
 * @param {HTMLFormElement} form - Forms relacionado ao handleSubmit
 * @param {HTMLElement} popup - Popup a fechar quando é submetido o ficheiro
 * @param {Function} [handleData] - Função a executar após a transformação do ficheiro
 */
export async function handleSubmit(
  form: HTMLFormElement,
  popup: HTMLElement,
  handleData: (file: CsvRow[]) => void = setData
) {
  const { localFile, remoteFile }: FormDataJson = formDataToJson(
    new FormData(form)
  );

  if (remoteFile === "" && localFile?.size === 0)
    return "Forms não preenchido.";

  form.reset();
  togglePopUp(popup, false);

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
 * Recebe um boolean para ativar/desativar o PopUp do upload do .CSV.
 *
 * @param {HTMLElement} popup - elemento html a esconder/reaparecer
 * @param {Boolean} isToShow - argumento para dar show do popup
 */
export function togglePopUp(popup: HTMLElement, isToShow: boolean) {
  if (isToShow) {
    popup.classList.remove("hidden");
  } else {
    popup.classList.add("hidden");
  }
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
    localFile: formData.get("localFile"),
    remoteFile: formData.get("remoteFile"),
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
  const text = await localFile.text();
  return text;
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
