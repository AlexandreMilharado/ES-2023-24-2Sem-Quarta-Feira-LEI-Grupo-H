import { TableRow } from "./interfaces";

/**
 * Cria e transfere um ficheiro com os dados(string) e o nome de ficheiro(string) especificados.
 * @param {string} data Dados a serem salvos(string pre formatada).
 * @param {string} filename Nome do ficheiro.
 */
export function saveToFile(data: string, filename: string): void {
  //Cria e chama um link de download escondido.
  //Adiciona \ufeff para denotar UTF8.
  let file = new File(["\ufeff" + data], filename, {
    type: "text/plain:charset?UTF8",
  });
  const url = window.URL.createObjectURL(file);
  let hiddenLink = document.createElement("a");

  hiddenLink.style.cssText = "display: none";
  hiddenLink.href = url;
  hiddenLink.download = file.name;
  hiddenLink.click();
}

/**
 * Cria e transfere o estado atual da tabela atual _tabledata_ (passada por argumentos).
 *
 * Este ficheiro será um ficheiro de texto formatado em JSON com o nome "save.json"
 *
 * Retorna o output da função de download.
 *
 * Se não houverem dados não efetua download.
 *
 * @param {TableRow[]} data Dados a serem salvos
 * @param downlaod Função que recebe os dados como string e o nome do ficheiro e efetua o download.
 * @returns O output da função download
 */
export function saveFileJSON(
  data: TableRow[],
  downlaod: (data: string, filename: string) => void | any = saveToFile
): void | any {
  if (
    JSON.stringify(data) ===
    JSON.stringify([{ Message: "Dados ainda não inseridos" }])
  ) {
    return;
  }
  const formatedJSON = JSON.stringify(data);
  return downlaod(formatedJSON, "save.json");
}

/**
 * Cria e transfere o estado atual da tabela atual _tabledata_ (passada por argumentos).
 *
 * Este ficheiro será um ficheiro de texto formatado em CSV com o nome "save.csv"
 *
 * O separador por defeito será o ponto e virgula ";". Caso exista pelo menos um ponto e virgula nos dados, o separador será mudado para a virgula ",".
 *
 * Ficheiros que contenham tanto "," como ";" não irão ser corretamente exportados e a sua importação não irá funcionar.
 *
 * Retorna o output da função de download.
 *
 * Se não houverem dados não efetua download.
 *
 * @param {TableRow[]} inputData Dados a serem salvos
 * @param downlaod Função que recebe os dados como string e o nome do ficheiro e efetua o download.
 * @returns O output da função download
 */
export function saveFileCSV(
  inputData: TableRow[],
  downlaod: (data: string, filename: string) => void | any = saveToFile
): void | any {
  if (
    JSON.stringify(inputData) ===
    JSON.stringify([{ Message: "Dados ainda não inseridos" }])
  ) {
    return;
  }

  //Confirma se alguma das celulas de dados contem ";".
  const hasSemicolins: boolean = inputData.some((tableRow) =>
    Object.entries(tableRow).some((tableCell) =>
      tableCell[1].toString().includes(";")
    )
  );

  let separator: string = ";";
  //Se existirem ";" nos dados, muda o separador para ",".
  if (hasSemicolins) {
    separator = ",";
  }

  //Obtem os cabeçalhos.
  const headers: string =
    //Obtem os pares chave/valor de uma linha.
    Object.entries(inputData[0])
      //Obtem as chaves (cabeçalhos).
      .map((v) => v[0])
      //Junta todos os cabeçalhos numa string separada com o separador.
      .reduce((previous, current) => previous + separator + current);

  //Obtem os dados.
  const data: string =
    //Começa com os dados todos.
    inputData
      //Converte a lista de TableRow numa lista de string, juntando todas as TableCell de cada TableRow numa string com o separador.
      .map((row) =>
        //Obtem os pares chave/valor de uma linha.
        Object.entries(row)
          //Mantem apenas os valores(index 1) e transforma-os em strings.
          .map((value) => value[1].toString())
          //Junta todas as strings usando o separador.
          .reduce((previous, value) => previous + separator + value)
      )
      //Junta todas as strings, separando-as por linhas.
      .reduce((previous, current) => previous + "\n" + current);

  // Junta os cabeçalhos aos dados.
  const formatedCSV: string = headers + "\n" + data;

  return downlaod(formatedCSV, "save.csv");
}
