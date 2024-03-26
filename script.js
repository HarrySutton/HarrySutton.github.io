/** 
 * Sets an img tag's src then returns a promise that resolves when the image loads 
 * @param {HTMLImageElement} img - 
 * @param {string} src - 
 * @return {Promise<void>} 
 */
function imgLoad(img, src){
    img.src = src;
    return new Promise(res => img.onload = res)
}

// Makes the nav buttons stay down after being clicked
document.querySelectorAll("a.card.press").forEach(a => a.addEventListener("mousedown", e => e.target.className += " active"))

const dialog = document.createElement("dialog");

const modalimg = document.createElement("img");
const modalcap = document.createElement("p");

dialog.append(modalimg)
dialog.append(modalcap)
document.body.append(dialog)

dialog.addEventListener("click", e => {
    dialog.close()
})

document.querySelectorAll("img:not(.modal *)").forEach(img => {
    img.addEventListener("click", async e => {

        modalcap.innerHTML = e.target.alt

        modalimg.src = e.target.src

        // Waits for image to load before displaying the modal
        await new Promise(res => modalimg.onload = res)
        
        dialog.showModal()

        // imgLoad(modalimg, e.target.src)
        //     .then(() => {
        //         modal.style.visibility = "visible";
        //         modal.style.opacity = 1
        //     })
        
    })
})