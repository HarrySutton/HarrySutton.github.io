function $(tag, attr = {}){
    let element = document.createElement(tag);
    for (let [key, val] of Object.entries(attr)){
        if (val) element[key] = val
    };
    return element
}

HTMLElement.prototype.$ = function(t, a){
    this.appendChild($(t, a))
}

const getPage = () => window.location.pathname.split("/").pop().slice(0, -5)

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
            className:  getPage() == link? "active" : null
        }
    )
}