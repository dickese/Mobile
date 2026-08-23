class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    speak(): void {
        console.log(this.name + " makes a sound")
    }
}

class Dog extends Animal {
    speak(): void {
        console.log(this.name + " says : Woof Woof")
    }
}

class Cat extends Animal {
    speak(): void {
        console.log(this.name + " says : Meow")
    }
}

class Cow extends Animal {
    speak(): void {
        console.log(this.name + " says : Moo")
    }
}

const animals: Animal[] = [new Dog("Rex"), new Cat("Tom"), new Cow("Bella"), new Animal("Unknown")];

animals.forEach(animal => animal.speak())
