import { togglePopUp, togglePopUpSave } from "./popUp";
import { saveFileCSV, saveFileJSON } from "./tableDownload";
import { tabledata } from "./table";
import { TEST, loadInitialCsvFiles } from "./uploadCsv";
import { addFile } from "./variables";

/**
 * Abre um popUp para fazer upload do .csv assim que a página estiver completamente carregada.
 */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("ClosePopUp")?.addEventListener("click", () => {
    togglePopUp(false);
  });
  document.getElementById("OpenPopUp")?.addEventListener("click", () => {
    togglePopUp(true);
  });

  loadInitialCsvFiles(addFile);

  document.getElementById("ClosePopUpSave")?.addEventListener("click", () => {
    togglePopUpSave(false);
  });

  document.getElementById("SaveFileCSV")?.addEventListener("click", (e) => {
    saveFileCSV(tabledata);
  });
  document.getElementById("SaveFileJSON")?.addEventListener("click", () => {
    saveFileJSON(tabledata);
    TEST(); // Retirar
  });
});
