/**
 * Funções para o Cálculo de Datas Module
 * @module Datas
 */

/**
 * String a colocar caso não existam dados na célula da tabela.
 * @type {String}
 */
export const EMPTY_DATA: string = "";

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
  if (!dateString) return null;
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
 * @param {number} [firstDayOfTheWeek] - (opcional) 0 para Domingo, 1 para Segunda,...,6 para Sábado
 * @returns {number} - Número da semana
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
export type SemesterStartDates = Record<
  number,
  { first?: Date; second?: Date }
>;

/**
 * Verifica para todas as datas das aulas não nulas importadas qual é a data desse semestre mais recente
 * Guardando essa data como o inicio do semestro (primeiro ou segundo desse ano letivo)
 * @param {string[]} datesList - Lista das datas provenientes da data importada na tabela (tabledata)
 * @returns {SemesterStartDates} - Objecto com as datas inicio dos semestres presentes nos dados importados
 * See {@link SemesterStartDates}
 */
export function getSemesterStarts(datesList: string[]): SemesterStartDates {
  let semesterStartingDates: SemesterStartDates = {};

  datesList.forEach((dateString) => {
    const date = dateStringFormatCToDate(dateString);
    if (date === null || date.toString() === "Invalid Date") return;

    const month = date.getMonth() + 1;
    const fullYear = date.getFullYear() - (month < 8 ? 1 : 0);
    const semester: "first" | "second" =
      month > 8 || (month < 2 && date.getDay() < 20) ? "first" : "second";

    if (!semesterStartingDates[fullYear]) {
      semesterStartingDates[fullYear] = { [semester]: date };
    } else if (
      !semesterStartingDates[fullYear][semester] ||
      semesterStartingDates[fullYear][semester]! > date
    ) {
      semesterStartingDates[fullYear][semester] = date;
    }
  });
  return semesterStartingDates;
}

/**
 * Calcular o número da semana apartir do início do semestre atual.
 *
 * See {@link getWeekNumber}.
 * @param {Date} date - Data a verificar
 * @param {SemesterStartDates} semesterStartingDates - Objecto com o inicio dos semestres existentes na informação importada
 * @returns {number} - Número da semana consoante o semestre
 */
export function getSemesterWeekNumber(
  date: Date,
  semesterStartingDates: SemesterStartDates
): string | number {
  if (date === null || date.toString() === "Invalid Date") return EMPTY_DATA;

  const month = date.getMonth() + 1;
  const academicYear = date.getFullYear() - (month < 8 ? 1 : 0);
  const semester: "first" | "second" =
    month > 8 || (month < 2 && date.getDay() < 20) ? "first" : "second";

  const semesterStart: Date = semesterStartingDates[academicYear][semester]!;

  const weekNumberOfSemesterStart: number = getWeekNumber(
    semesterStart
  ) as number;

  const weekNumberOfDate: number = getWeekNumber(date) as number;

  const newYearCorrection: number =
    semester === "first" && date.getFullYear() > academicYear
      ? (getWeekNumber(new Date(academicYear, 11, 31)) as number)
      : 0;

  return weekNumberOfDate + newYearCorrection - weekNumberOfSemesterStart + 1;
}

export function getClassesStartingHours(startTime: Date, finishStartTime: Date, classDuration = 90) {
  const hours = [];
  let currentHour = new Date('1 08:00:00');
  const finishHour = new Date('1 22:00:00');

  while (currentHour <= finishHour && currentHour <= finishStartTime) {
    if (currentHour >= startTime) {
      hours.push(
        `${String(currentHour.getHours()).padStart(2, '0')}:${String(currentHour.getMinutes()).padStart(2, '0')}`
      );
    }

    if (currentHour.getHours() === 11) {
      currentHour.setHours(13);
      currentHour.setMinutes(0);
    } else {
      currentHour.setMinutes(currentHour.getMinutes() + classDuration);
    }
  }

  return hours;
}

export function getDaysFromRange(startDate: Date, finalDate: Date): Date[] {
  let currentDate: Date = startDate;
  const dates = [];
  while (currentDate.getTime() <= finalDate.getTime()) {
    if (currentDate.getDay()) // Adiciona data se não for domingo
      dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

export function getDayOfWeek(date: Date): string {
  const dayOfWeek: number = date.getDay();
  let dayOfWeekString: string;
  if (dayOfWeek == 0) dayOfWeekString = "Dom";
  else if (dayOfWeek == 1) dayOfWeekString = "Seg";
  else if (dayOfWeek == 2) dayOfWeekString = "Ter";
  else if (dayOfWeek == 3) dayOfWeekString = "Qua";
  else if (dayOfWeek == 4) dayOfWeekString = "Qui";
  else if (dayOfWeek == 5) dayOfWeekString = "Sex";
  else dayOfWeekString = "Sab";

  return dayOfWeekString;
}

export function formatDateToDDMMYYYY(date: Date) {
  var day = String(date.getDate()).padStart(2, '0');
  var month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns 0-based index
  var year = date.getFullYear();
  return day + '/' + month + '/' + year;
}