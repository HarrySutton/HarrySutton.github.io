class JSS{

    elements: HTMLCollection

    constructor(elements: HTMLCollection){
        this.elements = elements;
        return this
    }

    tag(tag: string){
        
    }

    // .
    class(name: string){

    }
    // #
    id(id: string){

    }

    // *
    star(){

    }

    // " "
    sub(){

    }
    
    // ,
    and(){

    }

    // >
    child(){

    }

    // +
    after(){
    }

    select(select: string){
        this
    }
}

const list = ["yes", "no"] as const
type ThingMap = typeof list[number]

function yee(thing: ThingMap){
    return [thing]
}

// document.getElementById()?.addEventListener

yee("hoi")

const jss = new JSS(document.documentElement.children);