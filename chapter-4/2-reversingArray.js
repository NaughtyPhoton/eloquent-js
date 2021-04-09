const reverseArray = (arr) => {
    const reversedArray = []
    for (let i = arr.length - 1; i >= 0; i--) {
        reversedArray.push(arr[i])
    }
    return reversedArray
}

const reverseArrayInPlace = (arr) => {
    const oldArray = [...arr]
    for (let i = 0; i < oldArray.length; i++) {
        arr[i] = oldArray[oldArray.length - i - 1]
    }
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
