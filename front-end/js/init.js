

//Executa assim que a pagina estiver completamente carregada
document.addEventListener("DOMContentLoaded", () => {

    console.log("hello world")

    document.getElementById("ClosePopUp").addEventListener("click", () => {TogglePopUp(false)});
    document.getElementById("OpenPopUp").addEventListener("click", () => {TogglePopUp(true)});

})


/**
 * Recebe um boolean para ativar/desativar o Pop Up de Upload
 *
 * @param {Boolean} isToShow
 */
function TogglePopUp(isToShow) {
    let popup = document.getElementById("PopUpUpload")
    if(isToShow){
        popup.classList.remove("hidden")
    }
    else{
        popup.classList.add("hidden")
    }
    
}
