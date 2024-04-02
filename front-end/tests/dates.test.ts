import { describe, it, expect } from "vitest";
import {
  EMPTY_DATA,
  calculateSemesters,
  dateStringFormatCToDate,
  getSemesterWeekNumber,
  getWeekNumber,
} from "../ts/dates";

describe("dateStringFormatCToDate", () => {
  it("devolve Invalid Data se for inserida uma data não válida", () => {
    const result: boolean =
      (dateStringFormatCToDate("38/01/2023") as Date).toString() ===
        "Invalid Date" &&
      (dateStringFormatCToDate("18/01/-2023") as Date).toString() ===
        "Invalid Date" &&
      (dateStringFormatCToDate("18/01/a") as Date).toString() ===
        "Invalid Date";
    expect(result).toBe(true);
  });

  it("devolve Invalid Data se for inserida uma string com campos incompletos, por exemplo: dd/mm", () => {
    expect(dateStringFormatCToDate("12/01")).toBe(null);
  });

  it('devolve Data corretamente caso seja passado a string com "dd/mm/yyyy"', () => {
    const result: Date = dateStringFormatCToDate("12/01/2023") as Date;
    expect(result).toStrictEqual(new Date("2023/01/12"));
  });

  it('devolve Data corretamente caso seja passado a string com "dd/mm/yy"', () => {
    const result: Date = dateStringFormatCToDate("12/01/23") as Date;
    expect(result).toStrictEqual(new Date("2023/01/12"));
  });
});

describe("getWeekNumber", () => {
  it("devolve número da semana se a semana começar numa Segunda", () => {
    expect(getWeekNumber(new Date("2024/01/07"))).toBe(1);
  });

  it("devolve número da semana se a semana começar num Domingo", () => {
    expect(getWeekNumber(new Date("2024/01/07"), 0)).toBe(2);
  });

  it("devolve EMPTY_DATA se não for passada uma data inválida", () => {
    expect(getWeekNumber(new Date("2024/13/06"))).toBe(EMPTY_DATA);
  });
});

describe("calculateSemesters", () => {
  // TODO Dar fix a isto quando a função aceitar dados do tabulator
  it("devolve as datas dos semestres corretamente quando não é passado dados da tabela", () => {
    expect(JSON.stringify(calculateSemesters([{}]))).toBe(
      JSON.stringify({
        firstSemesterStart: new Date(2022, 8, 1),
        firstSemesterFinish: new Date(2023, 0, 28),
        secondSemesterStart: new Date(2023, 0, 30),
        secondSemesterFinish: new Date(2023, 6, 1),
      })
    );
  });
});

describe("getSemesterWeekNumber", () => {
  it("devolve EMPTY_DATA se for passada uma data inválida", () => {
    expect(
      getSemesterWeekNumber(
        new Date("2024/12/50"),
        new Date(2024, 8, 1),
        new Date(2024, 0, 30)
      )
    ).toBe(EMPTY_DATA);
  });

  it("devolve  número da semana correto para uma data do segundo semestre", () => {
    expect(
      getSemesterWeekNumber(
        new Date("2024/2/13"),
        new Date(2023, 8, 1),
        new Date(2024, 0, 30)
      )
    ).toBe(3);
  });

  it("devolve  número da semana correto para uma data do primeiro semestre", () => {
    expect(
      getSemesterWeekNumber(
        new Date("2024/1/13"),
        new Date(2023, 8, 1),
        new Date(2024, 0, 30)
      )
    ).toBe(20);
  });
});
