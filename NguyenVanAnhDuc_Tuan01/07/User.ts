class User {
    private name: string; 

    constructor(name: string) {
        this.name = name;
    }

    get getName(): string {
        return this.name;
    }

    set setName(newName: string) {
        this.name = newName;
    }
}

const user = new User("Duc");
console.log("Name : " + user.getName)
user.setName = "Anh Duc";
console.log("Name after set : " + user.getName)
