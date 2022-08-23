const tru = "[!![]]+[]" // true
const fls = "[![]]+[]"  // false
const zro = "+[]"
const one = "+!![]"

function bracket(str){
    return `(${str})`
}

function square(str){
    return `[${str}]`
}

function int(x){
    return `+(${x})`
}

function stringChars(chars){
    return chars.map(char => `[${char}]`).join("+")
}

function stringVal(val){
    return `[${val}]+[]`
}

function number(x){
    if (x == 0){
        return zro
    }else if (x < 10){
        return one.repeat(x);
    }else{
        return int(stringChars(x.toString().split("").map(Number.parseInt).map(number)));
    }
}

function get(obj, i){
    return `(${obj})[${number(i)}]`
}

function interpret(fuck){
    return (Function(`return ${fuck}`))()
}

const alphabet = {};

function add(item){
    let val = interpret(item);
    for (let i = 0; i < val.length; i++){
        let char = val[i];
        if (!(char in alphabet)){
            alphabet[char] = get(item, i)
        }
    }
}

add(tru);
add(fls);

function string(str){
    return stringChars(str.split("").map(char => {
        if (!isNaN(Number.parseInt(char))){
            return number(Number.parseInt(char))
        }else if (char in alphabet){
            return alphabet[char]
        }else{
            throw `Character '${char}' not found`
        }
    }))
}

const inf = stringVal(int(string("1e1111"))) // Infinity

add(inf)

const nan = `[][+[]]`;

add(nan)

const fnc = stringVal(`[][${string("at")}]`)

add(Fnc)

const Fnc = stringVal(`${fnc}[${string("constructor")}]`);



