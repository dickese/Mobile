class Book {
    title: string;

    constructor(title: string) {
        this.title = title;
    }
}

class User {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class Library {
    books: Book[] = [];
    users: User[] = [];

    addBook(book: Book): void {
        this.books.push(book);
    }

    addUser(user: User): void {
        this.users.push(user);
    }
}

const library = new Library();
library.addBook(new Book("Doraemon"));
library.addBook(new Book("Conan"));
library.addUser(new User("Anh"));
library.addUser(new User("Duc"));

console.log("Books : " + library.books.map(book => book.title).join(", "))
console.log("Users : " + library.users.map(user => user.name).join(", "))
