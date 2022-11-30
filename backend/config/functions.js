export function filter_input(str){
    str = escape(str)
    return str
}

export function unfilter_input(str){
    str = unescape(str)
    return str
}

export function unescapeObjectValues(object){
    for(let prop in object){
        const value = object[prop]

        if(['string', 'number'].includes(typeof value)) object[prop] = unfilter_input(value)
    }

    return object
}
