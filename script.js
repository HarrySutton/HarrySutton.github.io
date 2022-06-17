function $(tag, attr = {}, chld = []){
    let element = document.createElement(tag);

    for (let [key, val] of Object.entries(attr)){
        if (val) element[key] = val
    };

    for (let child of chld){
        element.appendChild(child)
    }

    return element
}

HTMLElement.prototype.$ = function(...args){
    this.appendChild($(...args))
}

const pageName = window.location.pathname.split("/").pop().slice(0, -5);

const navdata = [
    {
        name: "Home",
        link: "index"
    },
    {
        name: "Projects",
        link: "projects"
    },
    {
        name: "Games",
        link: "games"
    },
];

const navbar = document.getElementsByTagName("nav")[0];
navbar.innerHTML = "";

for (let {name, link} of navdata){
    navbar.$(
        "a",
        {
            innerHTML:  name,
            href:       link + ".html",
            className:  link == pageName? "active" : null
        }
    )
}

function projectsList(data){
    return $(
        "ul",
        {className: "projects-list alternating-list"}
    )
}