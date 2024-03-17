"use-strict";
import axios from "axios";
import { setData } from "./table";

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
LOCAL_FORM.addEventListener("submit", handleSubmit);

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
 */
async function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const { localFile, remoteFile } = formDataToJson(new FormData(form));

  if (needToDownloadCsv(localFile, remoteFile)) {
    axios
      .post(`${SERVER}/uploadHorario`, {
        url: remoteFile,
      })
      .then((r) => formatCsv(r.data.csvData))
      .then((file) => setData(file))
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  } else {
    formatToString(localFile)
      .then((formatedFile) => formatCsv(formatedFile))
      .then((file) => setData(file));
  }

  form.reset();
  togglePopUp(false);
}

/**
 * Função que transforma os inputs com os respetivos values num JSON.
 *
 * Exemplo: {"localFile" : localFile.value,"remoteFile": remoteFile.value }
 * @param {FormData} formData - new FormData(forms)
 * @returns {JSON} - FormData em JSON
 */
function formDataToJson(formData) {
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
function needToDownloadCsv(localFile, remoteFile) {
  return (
    localFile?.type == "application/octet-stream" &&
    remoteFile !== null &&
    remoteFile !== ""
  );
}

/**
 * Recebe um ficheiro e transforma-o em string.
 * @param {File} localFile - Ficheiro .CSV local
 * @returns {String} - Local File em string
 */
async function formatToString(localFile) {
  const text = await localFile.text();
  return text;
}

/**
 * Recebe em texto um ficheiro .csv e transforma-o num array de json's, [{...}, {...}, ...].
 *
 * Assume-se que existe headers no texto passado.
 * Se conter ";" no header, assume-se uma separação de linhas com ";",
 * caso contrário usa-se o delimitador ",".
 * Se existir apenas um Enter na última linha, esta linha é considerada como não fazendo parte dos dados.
 * @param {String} text - Ficheiro de texto do .CSV
 * @returns {Array<JSON>} - Formated .CSV File
 */
function formatCsv(text) {
  const splitedText = text.split(new RegExp("\r\n|\n|\r"));
  const delimiter =
    splitedText.length > 0 && splitedText[0].includes(";") ? ";" : ",";

  const headers = splitedText[0].split(delimiter);

  const dataRows =
    splitedText[splitedText.length - 1] == ""
      ? splitedText.slice(1, -1)
      : splitedText.slice(1);

  return dataRows.map((linha) =>
    linha.split(delimiter).reduce((json, currentCell, coluna) => {
      json[headers[coluna]] = currentCell;
      return json;
    }, {})
  );
}

/**
 * Recebe um boolean para ativar/desativar o PopUp do upload do .CSV.
 *
 * @param {Boolean} isToShow - argumento para dar show do popup
 */
export function togglePopUp(isToShow) {
  let popup = document.getElementById("PopUpUpload");
  if (isToShow) {
    popup.classList.remove("hidden");
  } else {
    popup.classList.add("hidden");
  }
}
