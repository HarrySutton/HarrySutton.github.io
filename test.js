

const $counter = (val = 0) => $(
    "button", 
    {className: "yes"}, 
    [`Count: ${val}!`],
    [
        ["click", function(e, $){
            $.set("val", $.props.val + 1)
        }],
        ["contextmenu", function(e, $){
            e.preventDefault();
            $.set("val", $.props.val - 1)
        }]
    ]
)

const $$counter = $$($counter);

const counter = $$counter();

BODY.append(counter)

class Magic extends Function{
    constructor(){
        super('...args', 'return this._bound.__call__(...args)')

        this._bound = this.bind(this)

        return this._bound
    }

    __call__(){}

    static object(obj){
        const magic = new Magic();
        for (let [key, val] of Object.entries(obj)){
            magic[key] = val
        }
        return magic
    }
}

class Count extends Magic{
    constructor(func){
        super();
        this.func = func;
        this.count = 0;
        return this
    }

    __call__(...args){
        this.count++
        return this.func(...args)
    }
}

const sayHi = Magic.object({
    thing: "yes",
    __call__: function(){console.log(this.thing)}
});

sayHi()

class $__ extends Magic{
    constructor(el){
        this.el = el
    }

    id(id){
        this.el.getElementById(id)
    }
}

const $ = new $__(document.documentElement)

const func = Function("a", "b", "return a + b");



