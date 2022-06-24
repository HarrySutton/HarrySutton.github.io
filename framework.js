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

const $id  = id  => document.getElementById(id)
const $cls = cls => document.getElementsByClassName(cls)
const $tag = tag => document.getElementsByTagName(tag)

/**
 * @const - Body element of the page
 * @type {HTMLElement}
 */
const BODY = $tag("body")[0];

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

/**
 * Loads a JS file to the page
 * @param {string} src - Path to JS file 
 * @param {string} id - ID for the script tag
 * @param {function} error - Function to call on error
 * @returns {string|null} - ID if one was given, null if not
 */
function addScript(src, id = null, error = () => console.error(`JS file '${src}' not found`)){
    BODY.append($(
        "script",
        {
            id: id,
            src: src,
            onerror: () => {
                error();
                $id(id).remove()
            }
        }
    ))
    return id;
};

function usePageScript(){
    return addScript(
        `js/${PAGENAME}.js`, 
        `pagescript-${PAGENAME}`,
        () => console.warn("No JS for this page")
    );
}

Array.prototype.indexOfX = function(get, select){
    let props = this.map(get);
    return props.indexOf(select(...props))
}

// Array.prototype.prepend = function(item){
//     this = [item].concat(this)
// }

// let list = [2, 3, 4]
// list.prepend(1)
// console.log(list)

/**
 * Iterates many lists at the same time
 * @param {any[][]} lists - List of lists to enumerate 
 * @param {boolean} includeindex - Pass true to include the index
 * @returns {any[][]}
 */
function enumerate(lists, includeindex = false){
    let index = lists.indexOfX(l => l.length, Math.max);

    let list = [];
    for (let i = 0; i < lists[index].length; i++){
        let entry = lists.map(l => l? l[i] : null)
        list.push(includeindex? entry.concat([i]) : entry)
    }
    return list
}

/**
 * 
 * @param {Date} d - 
 * @param {string} format - 
 */
function date(d, format){
    let string = "";
    for (let i = 0; i < format.length; i++){

    }
}