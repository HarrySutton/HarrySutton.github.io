// Makes the nav buttons stay down after being clicked
document.querySelectorAll("a.card.press").forEach(a => a.addEventListener("mousedown", e => e.target.className += " active"))

const dialog = document.createElement("dialog");

const modalimg = document.createElement("img");
const modalcap = document.createElement("p");
const modalclose = document.createElement("button");

modalclose.innerHTML = "&times;"

dialog.append(modalimg)
dialog.append(modalcap)
dialog.append(modalclose)
document.body.append(dialog)

modalclose.addEventListener("click", e => {
    dialog.close("yes")
})

document.querySelectorAll("img:not(dialog *)").forEach(img => {
    img.addEventListener("click", async e => {

        modalcap.innerHTML = e.target.alt

        modalimg.src = e.target.src
        modalimg.alt = e.target.alt

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