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

interface ThingMap{
    "yes": number,
    "no": string
}

function yee<T extends keyof ThingMap>(thing: T, other: ThingMap[T]){
    return [thing, other]
}

// document.getElementById()?.addEventListener

yee("no", "hi")

const jss = new JSS(document.documentElement.children);