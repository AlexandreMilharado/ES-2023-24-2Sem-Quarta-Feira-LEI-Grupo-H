/**
 * Manipulação de DOM Module
 * @module PopUp
 */

/**
 * Recebe um boolean para ativar/desativar o PopUp do upload do .CSV.
 *
 * @param {Boolean} isToShow - argumento para dar show do popup
 * @param {Document} documentElement - documento com Upload PopUp
 */
export function togglePopUp(isToShow: boolean, documentElement: Document) {
  let popup: HTMLElement | null = documentElement.getElementById("PopUpUpload");
  if (isToShow) {
    popup?.classList.remove("hidden");
  } else {
    popup?.classList.add("hidden");
  }
}

/**
 * Recebe um boolean para ativar/desativar o PopUp do save do .CSV.
 *
 * @param {Boolean} isToShow - argumento para dar show do popup
 * @param {Document} documentElement - documento com Save PopUp
 */
export function togglePopUpSave(isToShow: boolean, documentElement: Document) {
  let popup: HTMLElement | null = documentElement.getElementById("PopUpSave");
  if (isToShow) {
    popup?.classList.remove("hidden");
  } else {
    popup?.classList.add("hidden");
  }
}