class Car {
    brand: string; // hãng
    model: string; //dòng xe
    year: number; //năm sản xuất

    constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    //Phương thức hiển thị thông tin xe
    showInfo(): void {
        console.log("Brand : " + this.brand)
        console.log("Model : " + this.model)
        console.log("Year : " + this.year)
    }
}

//Tạo đối tượng car và gọi phương thức hiển thị
const car = new Car("Toyota", "Camry", 2022);
car.showInfo()
