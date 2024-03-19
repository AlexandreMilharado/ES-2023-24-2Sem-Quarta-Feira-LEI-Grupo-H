"use-strict";
import axios from "axios";
import { setData } from "./table";
import { togglePopUp } from "./init";

/**
 * Server's Path
 * @type {String}
 */
const SERVER = "http://localhost:3001";

/**
 * Upload .CSV Module
 * @module UploadCSV
 */

/**
 * Forms de upload .CSV
 * @type {Form}
 */
const LOCAL_FORM = document.getElementById("localUpload");
LOCAL_FORM?.addEventListener("submit", handleSubmit);

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
 * Example local URL: ./Software-Engineering/front-end/others/HorarioDeExemplo.csv
 *
 * See {@link setData}.
 * @param {Event} event - Evento para dar prenvent do ação do forms e recolher o mesmo
 * @param {Function} [handleData] - Função a executar após a transformação do ficheiro
 */
export async function handleSubmit(event, handleData = setData) {
  if (!event) return;

  event.preventDefault();

  const form = event.currentTarget;

  const { localFile, remoteFile } = formDataToJson(new FormData(form));

  if (remoteFile === "" && localFile?.size == 0) return "Forms não preenchido.";

  form.reset();
  togglePopUp(false);

  if (needToDownloadCsv(localFile, remoteFile)) {
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
  } else {
    return formatToString(localFile)
      .then((formatedFile) => formatCsv(formatedFile))
      .then((file) => handleData(file));
  }
}

/**
 * Função que transforma os inputs com os respetivos values num JSON.
 *
 * Exemplo: {"localFile" : localFile.value,"remoteFile": remoteFile.value }
 * @param {FormData} formData - new FormData(forms)
 * @returns {JSON} - FormData em JSON
 */
export function formDataToJson(formData) {
  const json = {};
  formData.forEach((value, key) => {
    json[key] = value;
  });
  return json;
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
export function needToDownloadCsv(localFile, remoteFile) {
  return (
    (localFile?.type == "application/octet-stream" || localFile?.size == 0) &&
    remoteFile !== null &&
    remoteFile !== ""
  );
}

/**
 * Recebe um ficheiro e transforma-o em string.
 * @param {File} localFile - Ficheiro .CSV local
 * @returns {String} - Local File em string
 */
export async function formatToString(localFile) {
  const text = await localFile.text();
  return text;
}

/**
 * Recebe em texto um ficheiro .csv e transforma-o num array de json's, [{...}, {...}, ...].
 *
 * Assume-se que existe headers no texto passado.
 * Se conter ";" no header, assume-se uma separação de linhas com ";",
 * caso contrário usa-se o delimitador ",".
 * Se existir alguma linha sem dados ignora-a não devolvendo-a no Array<JSON>.
 * @param {String} text - Ficheiro de texto do .CSV
 * @param {Boolean} [enableHeaders] - (opcional) o ficheiro enviado tem headers, por default tem.
 * @returns {Array<JSON>} - Formated .CSV File
 */
export function formatCsv(text, enableHeaders = true) {
  const splitedText = text.split(new RegExp("\r\n|\n|\r"));
  const delimiter =
    splitedText.length > 0 && splitedText[0].includes(";") ? ";" : ",";

  const headers = enableHeaders
    ? splitedText[0].split(delimiter)
    : splitedText[0].split(delimiter).map((_element, index) => index);

  const dataRows = splitedText.slice(1).filter((row) => row.length != 0);

  return dataRows.map((linha) =>
    linha.split(delimiter).reduce((json, currentCell, coluna) => {
      json[headers[coluna]] = currentCell;
      return json;
    }, {})
  );
}
