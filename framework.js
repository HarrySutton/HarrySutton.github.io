/*






*/

/**
 * Creates an HTML element
 * @param {string} tag - Tag of element
 * @param {object} attr - Attributes to apply
 * @param {HTMLElement|string[]} chld - List of child elements or text to append
 * @returns {HTMLElement} - HTML element
 */
 function $(tag, attr = {}, chld = []){
    let element = document.createElement(tag);
    let style = {};

    if (attr.style){
        style = attr.style;
        delete attr.style
    }

    for (let [key, val] of Object.entries(attr)){
        if (val) element[key] = val
    };

    element.append(...chld);

    for (let property in style){
		element.style.cssText += `${property}: ${style[property]}; `
	};

    return element
}

const id  = id  => document.getElementById(id)
const cls = cls => document.getElementsByClassName(cls)
const tag = tag => document.getElementsByTagName(tag)

/**
 * @const - Body element of the page
 * @type {HTMLElement}
 */
const BODY = tag("body")[0];

/**
 * @const - Name of current page without ".html"
 * @type {string}
 */
const PAGENAME = window.location.pathname.split("/").pop().slice(0, -5);

/**
 * @const - Parameters of current URL
 * @type {URLSearchParams}
 */
const URLARGS = new URLSearchParams(window.location.search)

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

/**
 * Iterates many lists at the same time
 * @param {any[][]} lists - List of lists to enumerate 
 * @param {boolean} includeindex - Pass true to include the index
 * @returns {any[][]}
 */
function enumerate(lists, includeindex = false){
    let lens = lists.map(l => l.length)
    let index = lens.indexOf(Math.max(...lens));

    let list = [];
    for (let i = 0; i < lists[index].length; i++){
        let entry = lists.map(l => l? l[i] : null)
        list.push(includeindex? entry.concat([i]) : entry)
    }
    return list
}

function formatter(keys, formats = {}){

    const single = (...vals) => {
        let obj = {};
        for (let [key, val, i] of enumerate([keys, vals], true)){
            obj[key] = formats[i]? formats[i](val) : val
        }
        return obj
    };

    const multi = (...lists) => {
        return lists.map(list => single(...list))
    }

    return [single, multi]
}

function appender(formatter, renderer, target = BODY){
    return (...data) => target.append(renderer(formatter(...data)))
}