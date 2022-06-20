const scriptid = usePageScript();

console.log(PAGENAME)
console.log(scriptid)

// Nav Bar
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

const navlink = ({name, link}) => $(
    "a",
    {
        innerHTML:  name,
        href:       link + ".html",
        className:  link == PAGENAME? "active" : null
    }
)

tag("nav")[0].append(...navdata.map(navlink));

// Projects List
const [project, projectlist] = datatype(
    ["title", "desc", "imgsrc", "imgwidth"],
    [null, null, src => "images/"+src, null]
);

const card = ({title, desc, imgsrc, imgwidth}) => $(
    "li", {className: "card"}, [

        $("div", {}, [
            $("img", {src: imgsrc, width: imgwidth})
        ]),

        $("div", {}, [
            $("h3", {innerHTML: title}),
            $("p", {innerHTML: desc})
        ])
    ]
)

const projectslist = (data) => $(
    "ul",
    {className: "projects-list alternating-list"},
    data.map(card)
)