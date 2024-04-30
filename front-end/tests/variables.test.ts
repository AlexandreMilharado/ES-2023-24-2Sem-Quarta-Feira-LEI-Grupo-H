import { describe, expect, it } from "vitest";
import { getTestFileJSON, getTestFileWithoutHeadersJSON } from "./utilities";
import {
  GetCarateristicas,
  GetHorario,
  addFile,
  generateEmpyArray,
  getFiles,
  reset,
  sortFiles,
} from "../ts/variables";

describe("addFile", () => {
  it("atualiza o array dos ficheiros corretamente", () => {
    addFile(getTestFileJSON(), 0);
    expect(getFiles()).toStrictEqual([getTestFileJSON()]);
  });

  it("atualiza o tamanho do array corretamente", () => {
    addFile(getTestFileJSON(), 1);
    expect(getFiles().length).toBe(2);
  });
});

describe("reset", () => {
  it("a carregar a précondições", () => {
    addFile(getTestFileJSON(), 1);
  });
  it("remove corretamente as tabelas do array", () => {
    reset();
    expect(getFiles().length).toBe(0);
  });
});

describe("GetHorario", () => {
  it("a carregar a précondições", () => {
    addFile(getTestFileJSON(), 0);
    addFile(getTestFileWithoutHeadersJSON(), 1);
    sortFiles();
  });
  it("retorna o ficheiro correto", () => {
    expect(GetHorario()).toStrictEqual(getTestFileWithoutHeadersJSON());
  });
});

describe("GetHorario", () => {
  it("a carregar a précondições", () => {
    reset();
    addFile(getTestFileJSON(), 0);
    addFile(getTestFileWithoutHeadersJSON(), 1);
    sortFiles();
  });
  it("retorna corretamente o ficheiro", () => {
    expect(GetHorario()).toStrictEqual(getTestFileWithoutHeadersJSON());
  });
});

describe("GetCarateristicas", () => {
  it("a carregar a précondições", () => {
    reset();
    addFile(getTestFileJSON(), 0);
    addFile(getTestFileWithoutHeadersJSON(), 1);
    sortFiles();
  });
  it("retorna corretamente o ficheiro", () => {
    expect(GetCarateristicas()).toStrictEqual(getTestFileJSON());
  });
});

describe("generateEmpyArray", () => {
  it("cria array vazio corretamente", () => {
    expect(generateEmpyArray(5)).toStrictEqual([null, null, null, null, null]);
  });
});
