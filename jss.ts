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

HTMLCollection

const jss = new JSS(document.documentElement.children);