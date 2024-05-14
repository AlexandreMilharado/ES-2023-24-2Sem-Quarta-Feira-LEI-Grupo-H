import { describe, expect, it } from "vitest";
import { getTestFileJSON, getTestFileWithoutHeadersJSON } from "./utilities";
import {
  GetCarateristicas,
  GetHorario,
  addFile,
  generateEmpyArray,
  getFiles,
  reset,
  setUserTable,
  sortFiles,
} from "../ts/variables";

function loadPreconditons() {
  addFile(getTestFileJSON(), 0);
  addFile(getTestFileWithoutHeadersJSON(), 1);
  sortFiles();
}

function loadUserPreconditions() {
  setUserTable("Características", getTestFileJSON());
  setUserTable("Horário", getTestFileWithoutHeadersJSON());
}

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
    loadPreconditons();
  });
  it("retorna o ficheiro correto", () => {
    expect(GetHorario()).toStrictEqual(getTestFileWithoutHeadersJSON());
  });
});

describe("GetHorario", () => {
  it("a carregar a précondições", () => {
    loadPreconditons();
  });
  it("retorna corretamente o ficheiro", () => {
    expect(GetHorario()).toStrictEqual(getTestFileWithoutHeadersJSON());
  });


});

describe("GetCarateristicas", () => {
  it("a carregar a précondições", () => {
    loadPreconditons();
  });
  it("retorna corretamente o ficheiro", () => {
    expect(GetCarateristicas()).toStrictEqual(getTestFileJSON());
  });
});

describe("GetHorario User", () => {
  it("a carregar a précondições do user", () => {
    loadUserPreconditions();
  });

  it("retorna corretamente o ficheiro inserido pelo user", () => {
    expect(GetHorario()).toStrictEqual(getTestFileWithoutHeadersJSON());
  });
})

describe("GetCarateristicas User", () => {
  it("a carregar a précondições do user", () => {
    loadUserPreconditions();
  });

  it("retorna corretamente o ficheiro inserido pelo user", () => {
    expect(GetCarateristicas()).toStrictEqual(getTestFileJSON());
  });
})

describe("generateEmpyArray", () => {
  it("cria array vazio corretamente", () => {
    expect(generateEmpyArray(5)).toStrictEqual([null, null, null, null, null]);
  });
});

describe("setUserTable", () => {
  it("não modifica array se não for bem colocado o tipo de tabela", () => {
    setUserTable("Empty", [{}]);
    expect(GetCarateristicas()).toStrictEqual(getTestFileJSON());
  })
})