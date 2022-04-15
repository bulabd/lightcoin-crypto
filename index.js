class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let operation of this.transactions) {
      balance += operation.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -(this.amount);
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }

}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const  myAccount = new Account('snow-patrol');

console.log('Starting Balance: ', myAccount.balance);

const t1 = new Withdrawal(1.00, myAccount);
t1.commit();
console.log('Account Balance: ', myAccount.balance);

const t2 = new Deposit(9.99, myAccount);
t2.commit();
console.log('Account Balance: ', myAccount.balance);

const t3 = new Withdrawal(9.99, myAccount);
t3.commit();
console.log('Account Balance: ', myAccount.balance);

console.log('Ending Balance:', myAccount.balance);
console.log('Account Transaction History: ', myAccount.transactions);
