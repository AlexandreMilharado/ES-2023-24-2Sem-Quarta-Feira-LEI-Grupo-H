"use-strict";
import axios from "axios";

const localForm = document.getElementById("localUpload");
localForm.addEventListener("submit", handleSubmit);

/**
 * Recebe um ficheiro .csv local ou o url de um ficheiro csv remoto.
 *
 * Se existir um .csv local e um url ao mesmo tempo vai dar prioridade ao ficheiro local,
 * caso contrário faz um chamada a API para ir buscar o ficheiro .csv.
 *
 * @param {Event} event
 */
async function handleSubmit(event) {
  event.preventDefault(); // Colocar comentário para testar
  const form = event.currentTarget;
  const { localFile, remoteFile } = formDataToJson(new FormData(form));

  if (needToDownloadCsv(localFile, remoteFile)) {
    //Example URL:https://raw.githubusercontent.com/AlexandreMilharado/filesToUpload/main/HorarioDeExemplo.csv
    axios
      .post("http://localhost:3001/uploadHorario", {
        url: remoteFile,
      })
      .then((r) => formatCsv(r.data.csvData))
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  } else {
    formatCsv(formatToString(localFile));
  }
}

/**
 * Função que transforma os inputs com os respetivos values num JSON.
 *
 * Exemplo: {"localFile" : localFile.value,"remoteFile": remoteFile.value }
 * @param {FormData} formData
 * @returns JSON {...}
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
 * @param {File} localFile
 * @param {String} remoteFile
 * @returns Boolean
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
 * @param {File} localFile
 * @returns Ficheiro em String
 */
async function formatToString(localFile) {
  const text = await localFile.text();
  return text;
}

/**
 * Recebe em texto um ficheiro .csv e transforma-o num array.
 *
 * Depois imprime na consola o array. //TODO mudar funcionalidade
 * Por exemplo: colocar numa variável global.
 * @param {String} text
 */
function formatCsv(text) {
  const newArr = text.split("\n").map((linha) => linha.split(";"));
  console.log(newArr);
}
