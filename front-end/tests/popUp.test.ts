import { describe, expect, it } from "vitest";
import { togglePopUp, togglePopUpSave } from "../ts/popUp";
import { getPopUpSave, getPopUpUpload, stringToHTMLElement } from "./utilities";

//@vitest-environment jsdom
describe("togglePopUp", () => {
    it("fecha corretamente o popUp", () => {
        let doc = getPopUpUpload();
        togglePopUp(false, doc);
        expect(doc.getElementById("PopUpUpload")?.classList.contains("hidden")).toBe(true);
    });

    it("abre corretamente o popUp", () => {
        let doc = getPopUpUpload();
        togglePopUp(true, doc);
        expect(doc.getElementById("PopUpUpload")?.classList.contains("hidden")).toBe(false);
    });
});

describe("togglePopUpSave", () => {
    it("fecha corretamente o popUp", () => {
        let doc = getPopUpSave();
        togglePopUpSave(false, doc);
        expect(doc.getElementById("PopUpSave")?.classList.contains("hidden")).toBe(true);
    });

    it("abre corretamente o popUp", () => {
        let doc = getPopUpSave();
        togglePopUpSave(true, doc);
        expect(doc.getElementById("PopUpSave")?.classList.contains("hidden")).toBe(false);
    });
});