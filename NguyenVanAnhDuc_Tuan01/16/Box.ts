class Box<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    getValue(): T {
        return this.value;
    }

    setValue(value: T): void {
        this.value = value;
    }
}

const numberBox = new Box<number>(123);
const stringBox = new Box<string>("Hello");
const booleanBox = new Box<boolean>(true);

console.log("Number box : " + numberBox.getValue())
console.log("String box : " + stringBox.getValue())
console.log("Boolean box : " + booleanBox.getValue())
