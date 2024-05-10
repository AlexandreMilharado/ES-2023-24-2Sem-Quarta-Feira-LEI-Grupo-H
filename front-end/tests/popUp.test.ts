import { describe, expect, it } from "vitest";
import { togglePopUp } from "../ts/popUp";
import { stringToHTMLElement } from "./utilities";

//@vitest-environment jsdom
describe("togglePopUp", () => {
    it("atualiza o array dos ficheiros corretamente", () => {
        expect(togglePopUp(false, new Document())).toStrictEqual(undefined);
    });

    it("atualiza o tamanho do array corretamente", () => {
        expect(togglePopUp(true, new Document())).toStrictEqual(undefined);
    });
});