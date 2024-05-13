import { describe, expect, it } from "vitest";
import { setData } from "../ts/table";
import { getHorarioDiv, getTablutator, getTestFileJSON } from "./utilities";

// @vitest-environment jsdom
describe('setData', () => {
    it('acrescenta corretamente semanas do semestre e ano no html', () => {
        let table = getTestFileJSON();
        setData(getHorarioDiv() as HTMLDivElement, table);
        expect(table).toStrictEqual(getTablutator());
    })
})