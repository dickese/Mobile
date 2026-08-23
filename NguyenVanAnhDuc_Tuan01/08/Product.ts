class Product {
    name: string;
    price: number; 

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}

const products: Product[] = [
    new Product("Laptop", 1500),
    new Product("Mouse", 25),
    new Product("Phone", 700),
    new Product("Cable", 10),
    new Product("Monitor", 300)
];

const expensiveProducts = products.filter(product => product.price > 100);

console.log("Products with price > 100 :")
expensiveProducts.forEach(product => console.log("- " + product.name + " : " + product.price))
