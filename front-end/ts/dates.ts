/**
 * Funções para o Cálculo de Datas Module
 * @module Datas
 */

import { CsvRow } from "./uploadCsv";

/**
 * String a colocar caso não existam dados na célula da tabela.
 * @type {String}
 */
export const EMPTY_DATA: string = "";

/**
 * TODO Buscar ao tabulator
 */
let tabledata: CsvRow[] = [{ Message: "Dados ainda não inseridos" }];

/**
 * Objecto com o início e fim dos semestres.
 * @interface SemestersProps
 */
export interface SemestersProps {
  firstSemesterStart: Date;
  firstSemesterFinish: Date;
  secondSemesterStart: Date;
  secondSemesterFinish: Date;
}

/**
 * Objeto para saber o início do primeiro semestre e segundo semestre.
 * @type {SemestersProps}
 */
const {
  firstSemesterStart: semester1Start,
  secondSemesterStart: semester2Start,
}: SemestersProps = calculateSemesters(tabledata);

/**
 * Converter String "dd/mm/yyyy" em um Date object.
 *
 * Alternativamente, se dd/mm/yy é passado como argumento,
 * 1900's vai ser assumido para um yy maior que os últimos 2 digitos do ano atual (+2), caso contrário assume-se 2000's.
 *
 * @param {String} dateString - String da Data
 * @returns {Date} - Date Object
 */
export function dateStringFormatCToDate(dateString: string): Date | null {
  let dateParts: string[] = dateString.split("/");
  if (dateParts.length < 3) return null;

  const year: string =
    dateParts[2].length == 4
      ? dateParts[2]
      : dateParts[2] > String(new Date().getFullYear()).slice(2)
      ? "19" + dateParts[2]
      : "20" + dateParts[2];
  return new Date(year + "/" + dateParts[1] + "/" + dateParts[0]);
}

/**
 * Calcular o número da semana desde o início do ano.
 *
 * @param {Date} date - a data a verificar
 * @param {int} [firstDayOfTheWeek] - (opcional) 0 para Domingo, 1 para Segunda,...,6 para Sábado
 * @returns {int} - Número da semana
 */
export function getWeekNumber(
  date: Date,
  firstDayOfTheWeek: number = 1
): number | string {
  if (date === null || date.toString() === "Invalid Date") return EMPTY_DATA;

  const firstDayOfTheYear: Date = new Date(date.getFullYear(), 0, 1); //January 1st of the same year as date

  var weekStartOffset: number = firstDayOfTheYear.getDay() - firstDayOfTheWeek;
  weekStartOffset += weekStartOffset < 0 ? 7 : 0;

  const daysElapsedThisYear: number = Math.ceil(
    Math.abs(date.getTime() - firstDayOfTheYear.getTime()) /
      (1000 * 60 * 60 * 24)
  ); //Days since january 1st

  const correctedDay: number = daysElapsedThisYear + weekStartOffset;

  const weekNumber: number = Math.floor(correctedDay / 7) + 1;

  return weekNumber;
}


/**
 * Objeto do tipo Record que contêm pares chaves-valor onde:
 * Chave = ano do inicio do ano letivo (número) 
 * Valor = objecto que contêm dois atributos optativos: first e second que correspondem
 *         respetivamente à data de inicio do primeiro e data de inicio do segundo semestre
 *         desse ano letivo
 * @type {SemesterStartDates}
 */
type SemesterStartDates = Record<number, { first?: Date; second?: Date }>;

/**
 * Verifica para todas as datas das aulas não nulas importadas qual é a data desse semestre mais recente 
 * Guardando essa data como o inicio do semestro (primeiro ou segundo desse ano letivo)
 * @param {CsvRow[]} tableData - Dados da tabela
 * @param {string} dateKey - Nome da coluna onde se encontra as datas das UCs
 * @returns {SemesterStartDates} - Objecto com as datas inicio dos semestres presentes nos dados importados 
 * See {@link SemesterStartDates}
 */
export function getSemesterStarts(tableData : CsvRow[], dateKey: string = "Data da aula") : SemesterStartDates {
  let semesterStartingDates : SemesterStartDates = {};

  tableData.forEach((row) => {
    const date = dateStringFormatCToDate(row[dateKey] as string);
    if(date === null) return;
    
    const month = date.getMonth()+1;
    const fullYear = date.getFullYear() - (month < 8 ? 1 : 0);
    const semester : 'first' | "second" = (month > 8 || (month < 2 && date.getDay() < 20 )) ? "first" : "second";
    
    if(!semesterStartingDates[fullYear]){
      semesterStartingDates[fullYear] = {[semester]:date}
    }else if(!semesterStartingDates[fullYear][semester] || semesterStartingDates[fullYear][semester]!> date ){
      semesterStartingDates[fullYear][semester]=date
    }
  })
  return semesterStartingDates;  
}


/**
 * Temporariamente retorna estaticamente o valor para o ano académico 2022-2023.
 *
 * See {@link CsvRow} | {@link SemestersProps}.
 * @param {CsvRow[]} tableData - dados do .CSV importado
 * @returns {SemestersProps} - Início e fim dos semestres
 */
export function calculateSemesters(tableData: CsvRow[]): SemestersProps {
  // Semester Beginning dates for 2023/24
  return {
    firstSemesterStart: new Date(2022, 8, 1),
    firstSemesterFinish: new Date(2023, 0, 28),
    secondSemesterStart: new Date(2023, 0, 30),
    secondSemesterFinish: new Date(2023, 6, 1),
  };
}


/**
 * Calcular o número da semana apartir do início do semestre atual.
 *
 * See {@link getWeekNumber}.
 * @param {Date} date - Data a verificar
 * @param {Date} firstSemesterStart - data de início do primeiro semestre (normalmente Setembro)
 * @param {Date} secondSemesterStart - data de início do segundo semestre (normalmente Fevereiro)
 * @returns {number} - Número da semana consoante o semestre
 */
export function getSemesterWeekNumber( date: Date, firstSemesterStart: Date = semester1Start, secondSemesterStart: Date = semester2Start) {
  if (date === null || date.toString() === "Invalid Date") return EMPTY_DATA;

  const semesterStart: Date =
    date < secondSemesterStart ? firstSemesterStart : secondSemesterStart;

  const weekNumberOfSemesterStart: number = getWeekNumber(
    semesterStart
  ) as number;

  const weekNumberOfDate: number = getWeekNumber(date) as number;

  let newYearCorrection: number = 0;
  if (
    date < secondSemesterStart &&
    date > new Date(date.getFullYear() - 1, 11, 31)
  ) {
    newYearCorrection = getWeekNumber(
      new Date(date.getFullYear(), 11, 31)
    ) as number;
  }

  return weekNumberOfDate + newYearCorrection - weekNumberOfSemesterStart + 1 ;
}
