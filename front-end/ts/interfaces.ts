/**
 * Interfaces usadas em múltiplos módulos
 * @module Interfaces
 */

/**
 * TableCell - célula da tabela.
 * @type {string | number}
 */
export type TableCell = string | number;

/**
 * Linha de dados da tabela.
 * @type TableRow
 */
export type TableRow = Record<string, TableCell>;
