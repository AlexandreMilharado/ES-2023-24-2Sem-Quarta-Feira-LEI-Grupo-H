/**
 * Funções para o Cálculo de Datas Module
 * @module Datas
 */

/**
 * String a colocar caso não existam dados na célula da tabela.
 * @type {String}
 */
export const EMPTY_DATA = "";

let tabledata = [{ Message: "Dados ainda não inseridos" }];

/**
 * Objeto para saber o início do primeiro semestre e segundo semestre.
 * @type {{firstSemesterStart : number, secondSemesterStart: number}}
 */
const {
  firstSemesterStart: semester1Start,
  secondSemesterStart: semester2Start,
} = calculateSemesters(tabledata);

/**
 * Converter String "dd/mm/yyyy" em um Date object.
 *
 * Alternativamente, se dd/mm/yy é passado como argumento,
 * 1900's vai ser assumido para um yy maior que os últimos 2 digitos do ano atual (+2), caso contrário assume-se 2000's.
 *
 * @param {String} dateString - String da Data
 * @returns {Date} - Date Object
 */
export function dateStringFormatCToDate(dateString) {
  let dateParts = dateString.split("/");
  if (dateParts.length < 3) return null;

  const year =
    dateParts[2].length == 4
      ? dateParts[2]
      : dateParts[2] > String(new Date().getYear() + 1900 + 2).slice(2)
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
export function getWeekNumber(date, firstDayOfTheWeek = 1) {
  if (date === null || isNaN(date)) return EMPTY_DATA;

  const firstDayOfTheYear = new Date(date.getFullYear(), 0, 1); //January 1st of the same year as date

  var weekStartOffset = firstDayOfTheYear.getDay() - firstDayOfTheWeek;
  weekStartOffset += weekStartOffset < 0 ? 7 : 0;

  const daysElapsedThisYear = Math.ceil(
    Math.abs(date - firstDayOfTheYear) / (1000 * 60 * 60 * 24)
  ); //Days since january 1st

  const correctedDay = daysElapsedThisYear + weekStartOffset;

  const weekNumber = Math.floor(correctedDay / 7) + 1;

  return weekNumber;
}

/**
 * Temporariamente retorna estaticamente o valor para o ano académico 2022-2023.
 *
 * @param {Array<JSON>} tableData - dados do .CSV importado
 * @returns {{ firstSemesterStart: Date, firstSemesterFinish: Date,secondSemesterStart: Date,secondSemesterFinish: Date}} - Início e fim dos semestres
 */
export function calculateSemesters(tableData) {
  // Semester Beginning dates for 2023/24
  return {
    firstSemesterStart: new Date(2022, 8, 1),
    firstSemesterFinish: new Date(2023, 0, 28),
    secondSemesterStart: new Date(2023, 0, 30),
    secondSemesterFinish: new Date(2023, 6, 1),
  };

  // TODO - Make Semesters calculation dynamic
  // const ucs = [];
  // tableData.forEach((value) => {
  //   const found = ucs.find((v) => {
  //     return value["uc"] == v["uc"] && value["curso"] == v["curso"];
  //   });
  //   if (found) {
  //     a = dateStringFormatCToDate(value.data);
  //     if (a < found.firstDate) {
  //       found.firstDate = a;
  //     }
  //     if (a > found.lastDate) {
  //       found.lastDate = a;
  //     }
  //   } else {
  //     ucs.push({
  //       curso: value["curso"],
  //       uc: value["uc"],
  //       firstDate: dateStringFormatCToDate(value["data"]),
  //       lastDate: dateStringFormatCToDate(value["data"]),
  //     });
  //   }
  // });

  // console.log(ucs);
  // const cursos = new Set(
  //   ucs.map((v) => {
  //     return v.curso;
  //   })
  // );
  // console.log(cursos);

  // const output = {};

  // function calculateSemestersPerCourse(ucs) {
  //   console.log("ucs: ", ucs);
  //   const firstClass = ucs.reduce((previous, next) => {
  //     return previous.firstDate < next.firstDate ? previous : next;
  //   }, (initialValue = ucs[0]));
  //   const lastClass = ucs.reduce((previous, next) => {
  //     return previous.lastDate > next.lastDate ? previous : next;
  //   }, ucs[0]);
  //   console.log("fc", firstClass, "lc", lastClass);
  //   const semesters = []; //[{ucs:["DIAM,PISID,ES"],firstDate:...,lastDate:...},...]
  //   function addClass() {
  //     function intercepts() {}
  //   }
  //   return { firstClass: new Date(), lastClass: new Date() };
  // }

  // cursos.forEach((value) => {
  //   console.log("curso:", value);
  //   const curso = ucs.filter((v) => {
  //     return v.curso == value;
  //   }); //tem apenas as UCs de um curso
  //   console.log("curso", curso);
  //   calculateSemestersPerCourse(curso);
  // });

  // const firstSemesterStart = tableData[0]["data"];
  // const secondSemesterStart = tableData[1]["data"];
  // return {
  //   firstSemesterStart: firstSemesterStart,
  //   secondSemesterStart: secondSemesterStart,
  //   firstSemesterFinish: firstSemesterFinish,
  //   secondSemesterFinish: secondSemesterFinish,
  // };
}

/**
 * Calcular o número da semana apartir do início do semestre atual.
 *
 * See {@link getWeekNumber}.
 * @param {Date} date - Data a verificar
 * @param {Date} firstSemesterStart - data de início do primeiro semestre (normalmente Setembro)
 * @param {Date} secondSemesterStart - data de início do segundo semestre (normalmente Fevereiro)
 * @returns {int} - Número da semana consoante o semestre
 */
export function getSemesterWeekNumber(
  date,
  firstSemesterStart = semester1Start,
  secondSemesterStart = semester2Start
) {
  if (date === null || isNaN(date)) return EMPTY_DATA;

  const semesterStart =
    date < secondSemesterStart ? firstSemesterStart : secondSemesterStart;

  const weekNumberOfSemesterStart = getWeekNumber(semesterStart);

  const weekNumberOfDate = getWeekNumber(date);

  let newYearCorrection = 0;
  if (
    date < secondSemesterStart &&
    date > new Date(date.getFullYear() - 1, 11, 31)
  ) {
    newYearCorrection = getWeekNumber(new Date(date.getFullYear(), 11, 31));
  }

  return weekNumberOfDate + newYearCorrection - weekNumberOfSemesterStart + 1;
}
