"use-strict";
import axios from "axios";
import { setData } from "./table";
import { togglePopUp } from "./popUp";
import {
  GetCarateristicas,
  GetHorario,
  addFile,
  getFiles,
  setUserTable,
  sortFiles,
} from "./variables";
import { TableCell, TableRow } from "./interfaces";

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
 * Dados do forms upload .CSV.
 * @interface FormDataJson
 */
export interface FormDataJson {
  localFile: File;
  remoteFile: string;
  fileType: string;
}

/**
 * Recebe um ficheiro .csv ou .json local ou o url de um ficheiro remoto.
 *
 * Se existir um ficheiro local e um url ao mesmo tempo vai dar prioridade ao ficheiro local,
 * caso contrário faz um chamada a API para ir buscar o ficheiro.
 *
 * Formata corretamente o ficheiro .csv ou .json num [{...}, {...}, ...] (lista de objetos TableRow) e chama a função
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
 * @param alertFunction - Possibilidade de substituir a função de alert para possibilitar testes.
 */
export async function handleSubmit(
  event: SubmitEvent,
  handleData: (
    tableElement: HTMLDivElement,
    file: TableRow[]
  ) => void = setData,
  alertFunction: (message?: any) => void = alert
): Promise<string | void> {
  if (!event) return;

  event.preventDefault();

  const form: HTMLFormElement = event.currentTarget as HTMLFormElement;

  const { localFile, remoteFile, fileType }: FormDataJson = formDataToJson(
    new FormData(form)
  );

  if (remoteFile === "" && localFile?.size === 0)
    return "Forms não preenchido.";

  form.reset();
  togglePopUp(false);

  let fileString: Promise<string>;
  let fileTable: Promise<TableRow[]>;
  let extension: string | undefined;

  if (!needToDownloadCsv(localFile, remoteFile)) {
    extension = localFile.name.split(".").pop();
    fileString = formatToString(localFile);
  } else {
    extension = remoteFile.split(".").pop();
    fileString = axios
      .post(`${SERVER}/uploadHorario`, {
        url: remoteFile,
      })
      .then((data) => data.data.csvData)
      .catch((e) => {
        return e;
      });
  }

  //@ts-ignore
  if ((await fileString)?.response?.data?.error)
    //@ts-ignore
    return (await fileString).response.data;

  if (extension === "csv") {
    fileTable = fileString.then((formatedFile) => formatCsv(formatedFile));
  } else if (extension === "json") {
    fileTable = fileString.then((formatedFile) => JSON.parse(formatedFile));
  } else {
    alertFunction("Invalid file extension found: " + extension);
    return;
  }
  return fileTable
    .then((file) => {
      handleData(
        document.getElementById("HorarioPrincipal") as HTMLDivElement,
        file
      );
      setUserTable(fileType, file);
    })
    .catch((e) => {
      return e.response?.data
        ? JSON.stringify(e.response.data)
        : "Não conseguiu conectar-se ao servidor.";
    });
}

/**
 * Função para saber se é possivel contactar com o backend.
 * @returns
 */
export async function checkBackendStatus(): Promise<string> {
  const response = axios
    .get(`${SERVER}/uploadHorario`)
    .catch((e) => e.code)
    .then((a) => {
      if (a === "ERR_NETWORK") {
        return "OFFLINE";
      }
      if (a === "ERR_BAD_REQUEST") {
        return "ONLINE";
      }
      return "UNDEFINED";
    });
  return await response;
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
    fileType: formData.get("fileType") as string,
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
 * Se existir alguma linha sem dados ignora-a não devolvendo-a no TableRow[].
 * Ver {@link TableCell} | {@link TableRow}
 *
 * @param {String} text - Ficheiro de texto do .CSV
 * @param {Boolean} [enableHeaders] - (opcional) o ficheiro enviado tem headers, por default tem.
 * @returns {TableRow[]} Ficheiro .CSV formatado
 */
export function formatCsv(
  text: string,
  enableHeaders: boolean = true
): TableRow[] {
  const splitedText: string[] = text.split(new RegExp("\r\n|\n|\r"));
  const delimiter: string =
    splitedText.length > 0 && splitedText[0].includes(";") ? ";" : ",";

  const headers: TableCell[] = enableHeaders
    ? splitedText[0].split(delimiter)
    : splitedText[0].split(delimiter).map((_element, index) => index);

  const dataRows: string[] = splitedText
    .slice(1)
    .filter((row) => row.length != 0);

  return dataRows.map((linha) =>
    linha.split(delimiter).reduce((json, currentCell, coluna) => {
      json[headers[coluna]] = currentCell;
      return json;
    }, {} as TableRow)
  );
}

/**
 * Função para receber o ficheiro remoto.
 * @param {String} remoteFileUrl - URL a fazer upload do ficheiro
 * @param {Function} handleData - função a executar após a transformação do ficheiro
 * @returns {Promise<string | void>} - resultado do server
 */
async function getRemoteFile(
  remoteFileUrl: string,
  handleData: (file: TableRow[]) => void
): Promise<string | void> {
  return axios
    .post(`${SERVER}/uploadHorario`, {
      url: remoteFileUrl,
    })
    .then((r) => formatCsv(r.data.csvData))
    .then((file) => handleData(file))
    .catch((e) => e);
}

/**
 * Carregar ficheiros iniciais para o cálculo de sugestões.
 * @param {Function} handleData - função a executar após a transformação do ficheiro
 */
export function loadInitialCsvFiles(
  handleData: (file: TableRow[], index: number) => void
): void {
  const urls: string[] = [
    "https://raw.githubusercontent.com/AlexandreMilharado/filesToUpload/main/Caracteriza%C3%A7%C3%A3oDasSalas.csv",
    "https://raw.githubusercontent.com/AlexandreMilharado/filesToUpload/main/HorarioDeExemplo.csv",
  ];
  urls.forEach(async (url, index) => {
    await getRemoteFile(url, (file) => {
      if (JSON.stringify(file) !== JSON.stringify([{}]))
        handleData(file, index);
    });
  });
}
