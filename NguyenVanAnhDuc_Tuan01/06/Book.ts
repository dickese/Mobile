// Lớp Book với 3 thuộc tính title, author, year
class Book {
    title: string; //tên sách
    author: string; //tác giả
    year: number; //năm xuất bản

    constructor(title: string, author: string, year: number) {
        this.title = title;
        this.author = author;
        this.year = year;
    }

    //Phương thức hiển thị thông tin sách
    showInfo(): void {
        console.log("Title : " + this.title)
        console.log("Author : " + this.author)
        console.log("Year : " + this.year)
    }
}

//Tạo đối tượng book và gọi phương thức hiển thị
const book = new Book("Doraemon", "Anh Đức", 1969);
book.showInfo()
