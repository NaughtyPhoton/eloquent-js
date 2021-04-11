class Group {
    constructor(startingArray = []) {
        this.array = startingArray;
    }

    add(value) {
        if (!this.array.includes(value)) {
            this.array.push(value)
        }
    }

    delete(value) {
        this.array = this.array.filter(element => element !== value)
    }

    has(value) {
        return this.array.includes(value)
    }

    static from(startingArray) {
        return new Group(startingArray)
    }

    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                if (index >= this.array.length) return {done: true};
                return {value: this.array[index++], done: false};
            }
        }
    }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false

for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
}
// → a
// → b
// → c
