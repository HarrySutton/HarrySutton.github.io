type Params = [
    /** List of all parameter names */
    string[],
    any[],
    boolean
]

type $__ = (args: any) => HTMLElement

function params(func: Function): Params{
    let fnStr = func.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '');
    let params = <string[]> fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(/([^\s,]+)/g);
    let defaults: any[] = [];
    while (params.indexOf('=') != -1){
        let val = params[params.indexOf('=') + 1]
        defaults.push(parse(val) ?? val);
        params.splice(params.indexOf('='), 2)
    }
    return [params, defaults, params.indexOf('...') != -1];
}



type Listener<E extends keyof HTMLElementEventMap, T> = [
    E,
    (e: HTMLElementEventMap[E], element: T) => void
]


function $ts<T extends keyof HTMLElementTagNameMap>(
    tag: T,
    attr, 
    chld: Array<string | HTMLElement>, 
    listeners: Listener<keyof HTMLElementEventMap, HTMLElementTagNameMap[T]>[]
){
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

    for (let [type, listener] of listeners){
        element.addEventListener(type, function(e){
            listener(e, element)
        })
    }

    return element
}

function $$ts($_: (...params: any[]) => HTMLElement){
    let [$params, $defaults] = $_.params();
    function $$_(...params){

        params = params.concat($defaults).slice(0, $params.length);

        let element = $_(...params);

        element.props = {};
        for (let [prop, param] of enumerate([$params, params])){
            element.props[prop] = param
        }
        
        element.set = function(prop, val){
            this.props[prop] = val;
            element = $$_(...Object.values(this.props))
            this.parentNode.replaceChild(element, this);
        }
        
        return element
    }
    return $$_
}

const breakpoints = {
    xs: 0,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,   
} as const

function $responsive(
    $_: () => HTMLElement,
    components: {
        sm?: () => HTMLElement,
        md?: () => HTMLElement,
        lg?: () => HTMLElement,
        xl?: () => HTMLElement,
    } = {}
): HTMLElement {
    if (screen.width < breakpoints.sm) return $_()

    for (let [bp, w] of Object.entries(breakpoints)){
        if (screen.width >= w && bp in components) return components[bp]()
    }

    return $_()
}

const $card = () => $responsive(
    () => $("div"),
    {

    }
)

let thing = new HTMLElement()

$ts("canvas", {}, [], [["click", (e, el) => {}]])