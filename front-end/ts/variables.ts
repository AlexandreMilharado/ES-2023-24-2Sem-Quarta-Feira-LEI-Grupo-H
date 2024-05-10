/**
 * Funções para manusear o upload de múltiplos ficheiros
 * @module TablesUploaded
 */

import { TableRow } from "./interfaces";

let filesToCalculateSugestions: TableRow[][] = [];
let callingOrder: number[] = [];
let orderedArrayByInsert: TableRow[][];
let tablesByUser: TableRow[][] = [[], []];

/**
 * Adds table to TableRow[][] for future calculations.
 * @param {TableRow} table - table to add
 * @param {number} order - order where data will be stored
 */
export function addFile(table: TableRow[], order: number): void {
  filesToCalculateSugestions.push(table);
  callingOrder.push(order);
}

/**
 * Clears Tables from arrays.
 */
export function reset() {
  filesToCalculateSugestions = [];
  callingOrder = [];
  orderedArrayByInsert = [];
}
/**
 * Buscar o Array.
 * @returns {TableRow[][]} - Array de tabelas
 */
export function getFiles(): TableRow[][] {
  return filesToCalculateSugestions;
}

/**
 * Buscar o Horário.
 * @returns {TableRow[]} - Horário em tabela
 */
export function GetHorario(): TableRow[] {
  if (tablesByUser[1].length == 0) return orderedArrayByInsert[1];
  return tablesByUser[1];
}

/**
 * Buscar as Características da Sala.
 * @returns {TableRow[]} - Características em tabela
 */
export function GetCarateristicas(): TableRow[] {
  if (tablesByUser[0].length == 0) return orderedArrayByInsert[0];
  return tablesByUser[0];
}

/**
 * Cria um Array vazio de Tabelas.
 * @param {number} length - número de elementos a inserir no Array
 * @returns {TableRow[][]} - Array que contém as tabelas vazias
 */
export function generateEmpyArray(length: number): any {
  const arr: TableRow[][] = [];
  const fakeElement: any = null;
  for (let i = 0; i < length; i++) arr.push(fakeElement);

  return arr;
}

/**
 * Ordena o Array assumindo ordem de inserção na função {@link addFile}.
 */
export function sortFiles(): void {
  orderedArrayByInsert = generateEmpyArray(callingOrder.length);

  for (let i = 0; i < callingOrder.length; i++) {
    orderedArrayByInsert[callingOrder[i]] =
      filesToCalculateSugestions[callingOrder[i]];
  }
}

export function setUserTable(name: string, table: TableRow[]) {
  switch (name) {
    case "Características":
      tablesByUser[0] = table;
      break;
    case "Horário":
      tablesByUser[1] = table;
      break;
    default:
  }
}
