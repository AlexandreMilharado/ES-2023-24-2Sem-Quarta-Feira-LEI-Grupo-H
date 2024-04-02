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
});

/**
 * Manipulação de DOM Module
 * @module PopUp
 */

/**
 * Recebe um boolean para ativar/desativar o PopUp do upload do .CSV.
 *
 * @param {Boolean} isToShow - argumento para dar show do popup
 */
export function togglePopUp(isToShow: boolean) {
  let popup: HTMLElement | null = document.getElementById("PopUpUpload");
  if (isToShow) {
    popup?.classList.remove("hidden");
  } else {
    popup?.classList.add("hidden");
  }
}
