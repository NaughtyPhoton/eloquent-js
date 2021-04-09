const arrayToList = (arr) => {
    let list = null
    for (let i = arr.length - 1; i >= 0; i--) {
        list = {value: arr[i], rest: list}
    }
    return list
}

const listToArray = (list) => {
    const arr = []
    const getValue = (dictionary) => {
        arr.push(dictionary['value'])
        if (dictionary['rest']) {
            getValue(dictionary['rest'])
        }
    }
    getValue(list)
    return arr
}

const prepend = (newValue, list) => {
    return {value: newValue, rest: {...list}}
}

// const nth = (list, index) => {
//     let count = 0
//     const getValue = (dictionary) => {
//         if (count === index) {
//             return list['value']
//         } else if (count > index) {
//             return undefined
//         } else {
//             count++;
//             return getValue(dictionary['rest']);
//         }
//     }
//     return getValue(list)
// }

const nth = (list, n) => {
    if (!list) return undefined;
    else if (n === 0) return list.value;
    else return nth(list.rest, n - 1)
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
