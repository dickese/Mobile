class Employee {
    name: string;
    salary: number;

    constructor(name: string, salary: number) {
        this.name = name;
        this.salary = salary;
    }

    work(): void {
        console.log(this.name + " is working")
    }
}

class Manager extends Employee {
    manageTeam(): void {
        console.log(this.name + " is managing the team")
    }
}

class Developer extends Employee {
    writeCode(): void {
        console.log(this.name + " is writing code")
    }
}

const manager = new Manager("Duc", 2000);
const developer = new Developer("An", 1500);
manager.work()
manager.manageTeam()
developer.work()
developer.writeCode()
