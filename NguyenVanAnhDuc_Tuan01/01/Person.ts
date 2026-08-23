// Tạo 1 class Person với 2 thuộc tính name và age
export class Person {
    name: string; //kiểu chuỗi
    age: number; //kiểu số

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}


//Tạo đối tượng baby có kiểu Person với dữ liệu name và age
const baby: Person  = {
    name: "Baby",
    age: 1
} 

console.log("Baby name : " + baby.name)