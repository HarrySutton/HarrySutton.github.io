const scriptid = usePageScript();

// Nav Bar
const navdata = [
    ["Home",        "index"     ],
    ["Projects",    "projects"  ],
    ["Games",       "games"     ]
];

const navlink = ([name, link]) => $(
    "a",
    {
        innerHTML:  name,
        href:       link + ".html",
        className:  link == PAGENAME? "active" : null
    }
)

$tag("nav")[0].append(...navdata.map(navlink));

const card = ([title, desc, imgsrc, imgwidth]) => $(
    "li", {className: "card"}, [

        $("div", {}, [
            $("img", {src: imgsrc, width: imgwidth})
        ]),

        $("div", {}, [
            $("h3", {}, [title]),
            desc
        ])
    ]
)

const projectslist = (data) => $(
    "ul",
    {className: "projects-list alternating-list"},
    data.map(card)
)