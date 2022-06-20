/*






*/

/**
 * Creates an HTML element
 * @param {string} tag - Tag of element
 * @param {object} attr - Attributes to apply
 * @param {HTMLElement[]} chld - List of child elements to append
 * @returns {HTMLElement} - HTML element
 */
 function $(tag, attr = {}, chld = []){
    let element = document.createElement(tag);

    for (let [key, val] of Object.entries(attr)){
        if (val) element[key] = val
    };

    element.append(...chld)

    return element
}

const id = id => document.getElementById(id)
const cls = cls => document.getElementsByClassName(cls)
const tag = tag => document.getElementsByTagName(tag)

const BODY = tag("body")[0];

const PAGENAME = window.location.pathname.split("/").pop().slice(0, -5);

function addScript(src, id = null, error = "No JS for this page"){
    BODY.append($(
        "script",
        {
            id: id,
            src: src,
            onerror: () => console.log(error)
        }
    ))
};

function usePageScript(){
    let id = `pagescript-${PAGENAME}`;
    addScript(`js/${PAGENAME}.js`, id);
    return id
}

function enumerate(func, lists){
    console.log(lists)
    for (let i = 0; i < lists[0].length; i++){
        func(...lists.map(list => list[i]))
    }
}

function datatype(keys, formats = []){

    const single = (...vals) => {
        let obj = {};
        enumerate(
            (key, val, format) => obj[key] = format? format(val) : val,
            [keys, vals, formats]
        );
        return obj
    };

    const multi = (...lists) => {
        return lists.map(list => single(...list))
    }

    return [single, multi]
}
