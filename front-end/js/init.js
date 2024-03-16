//Executa assim que a pagina estiver completamente carregada
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("ClosePopUp").addEventListener("click", () => {
    togglePopUp(false);
  });
  document.getElementById("OpenPopUp").addEventListener("click", () => {
    togglePopUp(true);
  });
});

/**
 * Recebe um boolean para ativar/desativar o Pop Up de Upload
 *
 * @param {Boolean} isToShow
 */
export function togglePopUp(isToShow) {
  let popup = document.getElementById("PopUpUpload");
  if (isToShow) {
    popup.classList.remove("hidden");
  } else {
    popup.classList.add("hidden");
  }
}
