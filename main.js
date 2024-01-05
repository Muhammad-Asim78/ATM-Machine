import inquirer from "inquirer";
import { faker } from "@faker-js/faker";
const createUser = () => {
    let users = [];
    for (let i = 0; i < 9999; i++) {
        let user = {
            id: i,
            pin: 1000 + i,
            name: faker.person.fullName(),
            accountNumber: Math.floor(100000000 * Math.random() * 90000000),
            balance: 1000000 * i
        };
        users.push(user);
    }
    return users;
};
//atm machine
const atmMachine = async (users) => {
    const res = await inquirer.prompt({
        type: "number",
        message: "write pin code",
        name: "pin"
    });
    const user = users.find((val) => val.pin == res.pin);
    if (user) {
        console.log(`welcome ${user.name}`);
        atmFunc(user);
        return;
    }
    console.log("Invalid user pin");
};
//atm function
const atmFunc = async (user) => {
    const ans = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "Please select the option below ",
        choices: ["withdraw", "balance", "deposite", "exist"]
    });
    if (ans.select == "withdraw") {
        const amount = await inquirer.prompt({
            type: "number",
            message: "enter amount",
            name: "rupee"
        });
        if (amount.rupee > user.balance) {
            return console.log("insuficient Balance");
        }
        if (amount.rupee > 25000) {
            return console.log("ap 25000 sa ziadah ki amount nhi nikal sakta");
        }
        console.log(`withdraw amount ${amount.rupee}`);
        console.log(`Balance ${user.balance - amount.rupee}`);
    }
    if (ans.select == "balance") {
        console.log(`Balance ${user.balance}`);
        return;
    }
    if (ans.select == "deposite") {
        const deposite = await inquirer.prompt({
            type: "number",
            message: "Deposite aount enter",
            name: "rupee"
        });
        console.log(`Deposite amount: ${deposite.rupee}`);
        console.log(`Total Balance : ${user.balance + deposite.rupee}`);
    }
    if (ans.select == "exist") {
        console.log("thank for using atm...");
    }
};
const users = createUser();
atmMachine(users);
