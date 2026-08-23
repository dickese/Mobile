class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    bark(): void {
        console.log(this.name + " says : Woof Woof")
    }
}

class Cat extends Animal {
    meow(): void {
        console.log(this.name + " says : Meow")
    }
}

const dog = new Dog("Rex");
const cat = new Cat("Tom");
dog.bark()
cat.meow()
