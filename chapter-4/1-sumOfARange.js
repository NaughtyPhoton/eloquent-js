const range = (start, end, step = start < end ? 1 : -1) => {
    const ret = []
    if (step > 0) {
        for (let i = start; i <= end; i += step) {
            ret.push(i)
        }
    } else {
        for (let i = start; i >= end; i += step) {
            ret.push(i)
        }
    }
    return ret
}

console.log(range(10, 21));
console.log(range(5, 2, -1));
