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