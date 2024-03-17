import { togglePopUp } from "./uploadCsv";

/**
 * Abre um popUp para fazer upload do .csv assim que a página estiver completamente carregada.
 */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("ClosePopUp").addEventListener("click", () => {
    togglePopUp(false);
  });
  document.getElementById("OpenPopUp").addEventListener("click", () => {
    togglePopUp(true);
  });
});
