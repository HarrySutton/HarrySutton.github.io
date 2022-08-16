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

let thing = new HTMLElement()

$ts("canvas", {}, [], [["click", (e, el) => {}]])