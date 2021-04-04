const size = 10;
let result = '';
for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
        if ((x + y) % 2 === 0) {
            result += ' ';
        } else {
            result += '#';
        }
    }
    result += '\n';
}
console.log(result)
