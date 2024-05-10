import { describe, it, expect } from "vitest";
import { getDocument, stringToHTMLElement } from "./utilities";
import { addNewCriteriaContainer } from "../ts/suggestSlotst";


describe("addNewCriteriaContainer", () => {
    it("devolve um container com um criterio", () => {
        const mainDivString =
            `
            <div>
            
            </div>
            `
        const buttonString =
            `
            <button>

            </button>
        `
        const mainDiv = stringToHTMLElement(mainDivString) as HTMLDivElement;
        // const label= stringToHTMLElement(lavelString);
        const button: HTMLButtonElement = stringToHTMLElement(buttonString) as HTMLButtonElement;
        // mainDiv.appendChild(button);
        const isRooms = true;
        addNewCriteriaContainer(mainDiv, button, isRooms);
        expect(mainDiv.querySelector("button")).toBe(button);
    });
});