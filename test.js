

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

const functions = [
    "yes"
]

const text = document.getElementById("ta");

text.onkeyup = function(e){
    let inner = this.innerHTML.split(" ");

    inner = inner.map(word => {
        if (word in functions){
            return `<span class="func">${word}</span>`
        }
        return word
    })

    this.innerHTML = inner.join(" ")
}