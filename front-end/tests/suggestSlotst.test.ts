import { describe, expect, it } from "vitest"
import { createSelectWithOptionsToClassDuration } from "../ts/suggestSlotst"
import { getDocument, getLabelHTML } from "./utilities"


// @vitest-environment jsdom
describe('createSelectWithOptionsToClassDuration', () => {
    it('adiciona corretamente a label ao document', () => {
        let doc = getDocument();
        expect(createSelectWithOptionsToClassDuration(doc)).toStrictEqual(getLabelHTML());
    })
})