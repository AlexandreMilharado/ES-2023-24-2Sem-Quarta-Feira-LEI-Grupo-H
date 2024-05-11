import { describe, it, expect } from "vitest";
import {
  EMPTY_DATA,
  dateStringFormatCToDate,
  getSemesterWeekNumber,
  getSemesterStarts,
  getWeekNumber,
  formatDateToDDMMYYYY,
  getDaysFromRange,
  getClassesStartingHours,
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

  it('devolve null caso caso seja passado a string com ""', () => {
    const result: Date = dateStringFormatCToDate("") as Date;
    expect(result).toBe(null);
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

describe("getSemesterWeekNumber", () => {
  it("devolve EMPTY_DATA se for passada uma data inválida", () => {
    expect(
      getSemesterWeekNumber(new Date("2024/12/50"), {
        2023: { first: new Date(2023, 8, 1), second: new Date(2024, 0, 30) },
      })
    ).toBe(EMPTY_DATA);
  });

  it("devolve  número da semana correto para uma data do segundo semestre", () => {
    expect(
      getSemesterWeekNumber(new Date("2024/2/13"), {
        2023: { first: new Date(2023, 8, 1), second: new Date(2024, 0, 30) },
      })
    ).toBe(3);
  });

  it("devolve  número da semana correto para uma data do primeiro semestre antes do ano acabar", () => {
    expect(
      getSemesterWeekNumber(new Date("2023/9/9"), {
        2023: { first: new Date(2023, 8, 1), second: new Date(2024, 0, 30) },
      })
    ).toBe(2);
  });

  it("devolve  número da semana correto para uma data do primeiro semestre", () => {
    expect(
      getSemesterWeekNumber(new Date("2024/1/13"), {
        2023: { first: new Date(2023, 8, 1), second: new Date(2024, 0, 30) },
      })
    ).toBe(20);
  });
});

describe("getSemesterStarts", () => {
  it("devolve um objecto com a primeira aula do primeiro semestre de 2018/2019 e segundo semestre 2017/2018", () => {
    expect(
      getSemesterStarts([
        "3/12/2018",
        "8/12/2018",
        "1/1/2019",
        "5/9/2018",
        "4/2/2018",
        "10/2/2018",
      ])
    ).toStrictEqual({
      2018: { first: new Date(2018, 8, 5) },
      2017: { second: new Date(2018, 1, 4) },
    });
  });
  it("devolve um objecto com a primeira aula do primeiro semestre de 2018/2019 e segundo semestre 2017/2018 com datas ", () => {
    expect(
      getSemesterStarts([
        "3/13/2018",
        "2018/12/08",
        "1/1/2019",
        "5/9/2018",
        "10/2/2018",
      ])
    ).toStrictEqual({
      2018: { first: new Date(2018, 8, 5) },
      2017: { second: new Date(2018, 1, 10) },
    });
  });
});

describe('formatDateToDDMMYYYY', () => {
  it('converte bem a data', () => {
    expect(formatDateToDDMMYYYY(new Date(1995, 11, 17))).toStrictEqual("17/12/1995");
  })
});

describe('getDaysFromRange', () => {
  it('converter range de datas', () => {
    expect(getDaysFromRange(new Date(2024, 0, 1), new Date(2024, 0, 10))).toStrictEqual([
      new Date("2024-01-01"),
      new Date("2024-01-02"),
      new Date("2024-01-03"),
      new Date("2024-01-04"),
      new Date("2024-01-05"),
      new Date("2024-01-06"),
      new Date("2024-01-08"),
      new Date("2024-01-09"),
      new Date("2024-01-10"),
    ]);
  })
});

describe('getClassesStartingHours', () => {
  it('devolve inicio das aulas corretamente num espaço de 90 minutos', () => {
    expect(getClassesStartingHours(new Date("1 08:00:00"), new Date("1 12:30:00"))).toStrictEqual([
      "08:00",
      "09:30",
      "11:00",
    ]);
  })
});

