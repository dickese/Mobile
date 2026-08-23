// Lớp BankAccount với thuộc tính balance
class BankAccount {
    balance: number; //số dư

    constructor(balance: number = 0) {
        this.balance = balance;
    }

    //Phương thức nạp tiền
    deposit(amount: number): void {
        this.balance += amount;
    }

    //Phương thức rút tiền
    withdraw(amount: number): void {
        if (amount > this.balance) {
            console.log("Insufficient balance!")
            return
        }
        this.balance -= amount;
    }
}

//Tạo đối tượng account và thử nạp/rút tiền
const account = new BankAccount(100);
account.deposit(50);
console.log("Balance after deposit : " + account.balance)
account.withdraw(30);
console.log("Balance after withdraw : " + account.balance)
account.withdraw(500);
