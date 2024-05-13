import { togglePopUp, togglePopUpSave } from "./popUp";
import { saveFileCSV, saveFileJSON } from "./tableDownload";
import { tabledata } from "./table";
import { loadInitialCsvFiles } from "./uploadCsv";
import { addFile } from "./variables";
import { createHtmlElementsHeat } from "./heatMap";

/**
 * Abre um popUp para fazer upload do .csv assim que a página estiver completamente carregada.
 */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("ClosePopUp")?.addEventListener("click", () => {
    togglePopUp(false, document);
  });
  document.getElementById("OpenPopUp")?.addEventListener("click", () => {
    togglePopUp(true, document);
  });

  loadInitialCsvFiles(addFile);

  document.getElementById("ClosePopUpSave")?.addEventListener("click", () => {
    togglePopUpSave(false, document);
  });

  document.getElementById("SaveFileCSV")?.addEventListener("click", (e) => {
    saveFileCSV(tabledata);
  });
  document.getElementById("SaveFileJSON")?.addEventListener("click", () => {
    saveFileJSON(tabledata);
  });

  createHtmlElementsHeat(document);
});
