// Lớp Rectangle với 2 thuộc tính width và height
class Rectangle {
    width: number; //chiều rộng
    height: number; //chiều cao

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    //Phương thức tính diện tích
    calculateArea(): number {
        return this.width * this.height;
    }

    //Phương thức tính chu vi
    calculatePerimeter(): number {
        return 2 * (this.width + this.height);
    }
}

//Tạo đối tượng rectangle và gọi các phương thức tính
const rectangle = new Rectangle(5, 3);
console.log("Area : " + rectangle.calculateArea())
console.log("Perimeter : " + rectangle.calculatePerimeter())
