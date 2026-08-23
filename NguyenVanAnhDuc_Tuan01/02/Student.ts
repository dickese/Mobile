import { Person } from "../01/Person.ts";

class Student extends Person {
    grade: number;

    constructor(name: string, age: number, grade: number) {
        super(name, age);
        this.grade = grade;
    }

    displayInfo(): void {
        console.log("Name : " + this.name);
        console.log("Age : " + this.age);
        console.log("Grade : " + this.grade);
    }
}

const student = new Student("Duc", 20, 10);
student.displayInfo()
