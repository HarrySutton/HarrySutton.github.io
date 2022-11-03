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

const modal = document.createElement("div");
modal.className = "modal";
modal.style.visibility = "hidden";
modal.style.opacity = 0;

const modalimg = document.createElement("img");
const modalcap = document.createElement("p");

modal.append(modalimg)
modal.append(modalcap)
document.body.append(modal)

modal.addEventListener("click", e => {
    modal.style.opacity = 0;
    modal.style.visibility = "hidden";
})

document.querySelectorAll("img").forEach(img => {
    img.addEventListener("click", e => {

        modalcap.innerHTML = e.target.alt

        imgLoad(modalimg, e.target.src)
            .then(() => {
                modal.style.visibility = "visible";
                modal.style.opacity = 1
            })
        
    })
})