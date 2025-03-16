const express = require('express');
const app = express();
const port = 3000;
const readlinesync = require("readline-sync");

app.use(express.json());
app.use(express.static('public'));

const Customers = [];
const Transactions = [];
let loggedInUsername;

// API endpoints
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === "anurag" && password === "12345") {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

app.get('/api/customers', (req, res) => {
  res.json(Customers);
});

app.post('/api/customers/register', (req, res) => {
  const customer = req.body;
  customer.balance = 0;
  Customers.push(customer);
  res.json({ success: true });
});

app.post('/api/customers/login', (req, res) => {
  const { username, password } = req.body;
  const customer = Customers.find(c => c.username === username && c.password === password);
  if (customer) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});


// Main menu (This will likely be replaced by client-side JavaScript)
function mainMenu() {
  let choice = 0;

  do {
    console.log("\nMain Menu:");
    console.log("1. Admin login");
    console.log("2. Customer Registration");
    console.log("3. Customer Login");
    console.log("4. See transactions for a particular account");
    console.log("0. Exit Application");

    choice = readlinesync.question("Enter your choice: ");

    switch (choice) {
      case "1":
        adminLogin();
        break;
      case "2":
        customerRegistration();
        break;
      case "3":
        customerLogin();
        break;
      case "4":
        seeTransactionsForParticularAccount();
        break;
      case "0":
        console.log("Thanks for visiting us, see you again");
        break;
      default:
        console.log("Invalid choice. Please try again.");
    }
  } while (choice !== "0");
}

// Admin login (This will be replaced by the API call from client)
function adminLogin() {
  console.log("\nAdmin Login:");
  const username = readlinesync.question("Enter username: ");
  const password = readlinesync.question("Enter password: ", {
    hideEchoBack: true,
  });

  if (username === "anurag" && password === "12345") {
    console.log("Admin login successful!");
    adminMenu();
  } else {
    console.log("Invalid username or password. Please try again.");
  }
}

// Admin menu (This will be replaced by the API call from client)
function adminMenu() {
  let choice = 0;
  do {
    console.log("\nAdmin Menu:");
    console.log("1. View All Customers");
    console.log("2. Search Customer by Account Number");
    console.log("3. Search Customer by Mobile Number");
    console.log("0. Logout");

    choice = readlinesync.question("Enter your choice: ");

    switch (choice) {
      case "1":
        viewAllCustomer();
        break;
      case "2":
        searchCustomerByAccountNumber();
        break;
      case "3":
        searchCustomerByMobileNumber();
        break;
      case "0":
        console.log("Bye admin");
        break;
      default:
        console.log("Invalid choice. Please try again.");
    }
  } while (choice !== "0");
}

// View all customers (This will be replaced by the API call from client)
function viewAllCustomer() {
  console.log("\nView All Customers:");

  if (Customers.length === 0) {
    console.log("No Customers available.");
    return;
  }

  console.log("List of all customers:");
  Customers.forEach((customer) => {
    console.log(`Name: ${customer.name} Username: ${customer.username}`);
    console.log(
      `Mobile Number: ${customer.mobileNumber} Email: ${customer.email}`
    );
    console.log("------------------------");
  });
}

// Search customer by account number (This will be replaced by the API call from client)
function searchCustomerByAccountNumber() {
  console.log("\nSearch customer by Account Number:");
  const accountNumberToSearch = readlinesync.question(
    "Enter the Account Number to search: "
  );
  const foundCustomer = Customers.find(
    (customer) => customer.AccountNumber === accountNumberToSearch
  );

  if (foundCustomer) {
    console.log("Customer details:");
    console.log(`Name: ${foundCustomer.name}`);
    console.log(`Account Number: ${foundCustomer.AccountNumber}`);
    console.log(`Mobile Number: ${foundCustomer.mobileNumber}`);
    console.log(`Email: ${foundCustomer.email}`);
    console.log(`Username: ${foundCustomer.username}`);
    console.log("------------------------");
  } else {
    console.log("No customer found for the given account number.");
  }
}

// Search customer by mobile number (This will be replaced by the API call from client)
function searchCustomerByMobileNumber() {
  console.log("\nSearch Customer by Mobile Number:");

  const mobileNumberToSearch = readlinesync.question(
    "Enter mobile number to search: "
  );
  const foundCustomer = Customers.find(
    (customer) => customer.mobileNumber === mobileNumberToSearch
  );

  if (foundCustomer) {
    console.log("Customer details:");
    console.log(`Name: ${foundCustomer.name}`);
    console.log(`Account Number: ${foundCustomer.AccountNumber}`);
    console.log(`Mobile Number: ${foundCustomer.mobileNumber}`);
    console.log(`Email: ${foundCustomer.email}`);
    console.log(`Username: ${foundCustomer.username}`);
    console.log("------------------------");
  } else {
    console.log("No customer found for the given mobile number.");
  }
}

// See transactions for a particular account (This will be replaced by the API call from client)
function seeTransactionsForParticularAccount() {
  const accountNumber = readlinesync.question(
    "Enter account number to view transactions: "
  );

  const accountTransactions = Transactions.filter(
    (t) => t.account === accountNumber
  );

  if (accountTransactions.length > 0) {
    console.log(`Transactions for account ${accountNumber}:`);
    console.log("Date\t\tAmount\t\tTransaction Type");
    accountTransactions.forEach((transaction) => {
      console.log(
        `${transaction.date}\t${transaction.amount}\t\t${transaction.type}`
      );
    });
  } else {
    console.log(`No transactions found for account ${accountNumber}.`);
  }
}

// Customer Registration (This will be replaced by the API call from client)
function customerRegistration() {
  console.log("\nCustomer Registration:");
  const AccountNumber = readlinesync.question("Enter Account Number: ");
  const mobileNumber = readlinesync.question("Enter mobile number: ");
  const name = readlinesync.question("Enter name: ");
  const username = readlinesync.question("Enter username: ");
  const email = readlinesync.question("Enter email: ");
  const password = readlinesync.question("Enter password: ", {
    hideEchoBack: true,
  });
  const confirmPassword = readlinesync.question("Confirm password: ", {
    hideEchoBack: true,
  });

  if (password !== confirmPassword) {
    console.log("Passwords do not match. Registration failed.");
    return;
  }

  const newCustomer = {
    AccountNumber: AccountNumber,
    mobileNumber: mobileNumber,
    name: name,
    email: email,
    username: username,
    password: password,
    balance: 0, // Initialize balance to 0
  };

  Customers.push(newCustomer);
  console.log("Customer registration successful!");
}

// Customer Login (This will be replaced by the API call from client)
function customerLogin() {
  console.log("\nCustomer Login:");
  const username = readlinesync.question("Enter username: ");
  const password = readlinesync.question("Enter password: ", {
    hideEchoBack: true,
  });
  const customer = Customers.find(
    (c) => c.username === username && c.password === password
  );

  if (customer) {
    console.log("Login successful");
    loggedInUsername = username;
    customerMenu();
  } else {
    console.log("Invalid username or password. Please try again.");
  }
}

// Customer Menu (This will be replaced by the API call from client)
function customerMenu() {
  let choice = 0;
  do {
    console.log("\nCustomer Menu:");
    console.log("1. Edit details (name, email, and mobile number)");
    console.log("2. Change password");
    console.log("3. Deposit money to account");
    console.log("4. Withdraw money from account");
    console.log("5. See account statement");
    console.log("0. Logout");

    choice = readlinesync.question("Enter your choice: ");

    switch (choice) {
      case "1":
        editCustomerDetails();
        break;
      case "2":
        changePassword();
        break;
      case "3":
        depositMoneyToAccount();
        break;
      case "4":
        withdrawMoneyFromAccount();
        break;
      case "5":
        seeAccountStatement();
        break;
      case "0":
        loggedInUsername = null;
        break;
      default:
        console.log("Invalid choice. Please try again.");
    }
  } while (choice !== "0");
}

// Edit Customer Details (This will be replaced by the API call from client)
function editCustomerDetails() {
  console.log("\nEdit Customer Details: ");

  if (!loggedInUsername) {
    console.log("No Customer is currently logged in.");
    customerMenu();
    return;
  }

  const loggedInCustomerIndex = Customers.findIndex(
    (customer) => customer.username === loggedInUsername
  );

  if (loggedInCustomerIndex !== -1) {
    const updatedName = readlinesync.question("Enter updated name: ");
    const updatedMobileNumber = readlinesync.question(
      "Enter updated mobile number: "
    );
    const updatedEmail = readlinesync.question("Enter updated email: ");

    Customers[loggedInCustomerIndex].name = updatedName;
    Customers[loggedInCustomerIndex].mobileNumber = updatedMobileNumber;
    Customers[loggedInCustomerIndex].email = updatedEmail;

    console.log("Customer details updated successfully!");
  } else {
    console.log("No Customer found with the logged-in username.");
  }
}

// Change Password (This will be replaced by the API call from client)
function changePassword() {
  console.log("\nChange Password:");
  const loggedInCustomerIndex = Customers.findIndex(
    (customer) => customer.username === loggedInUsername
  );

  if (loggedInCustomerIndex !== -1) {
    const oldPassword = readlinesync.question("Enter your old password: ", {
      hideEchoBack: true,
    });

    if (Customers[loggedInCustomerIndex].password !== oldPassword) {
      console.log("Incorrect old password. Password change failed.");
    } else {
      const newPassword = readlinesync.question("Enter your new password: ", {
        hideEchoBack: true,
      });
      const confirmNewPassword = readlinesync.question(
        "Confirm your new password: ",
        { hideEchoBack: true }
      );

      if (newPassword !== confirmNewPassword) {
        console.log("Passwords do not match. Password change failed.");
      } else {
        Customers[loggedInCustomerIndex].password = newPassword;
        console.log("Password updated successfully!");
      }
    }
  }
}

// Deposit money (This will be replaced by the API call from client)
function depositMoneyToAccount() {
  console.log("\nDeposit money to account:");
  const amount = parseFloat(readlinesync.question("Enter the amount: "));

  const loggedInCustomer = Customers.find(
    (customer) => customer.username === loggedInUsername
  );

  if (loggedInCustomer && amount > 0) {
    loggedInCustomer.balance += amount;

    const transaction = {
      account: loggedInCustomer.AccountNumber,
      date: new Date().toISOString().split("T")[0],
      amount: amount,
      type: "deposit",
    };
    Transactions.push(transaction);

    console.log(
      `Deposit successful. New balance is: ${loggedInCustomer.balance}`
    );
  } else {
    console.log("Invalid deposit amount.");
  }
}

// Withdraw money (This will be replaced by the API call from client)
function withdrawMoneyFromAccount() {
  console.log("\nWithdraw money from account:");
  const amount = parseFloat(readlinesync.question("Enter the amount: "));

  const loggedInCustomer = Customers.find(
    (customer) => customer.username === loggedInUsername
  );

  if (loggedInCustomer && amount > 0 && loggedInCustomer.balance >= amount) {
    loggedInCustomer.balance -= amount;

    const transaction = {
      account: loggedInCustomer.AccountNumber,
      date: new Date().toISOString().split("T")[0],
      amount: amount,
      type: "withdrawal",
    };
    Transactions.push(transaction);

    console.log(
      `Withdrawal successful. New balance is: ${loggedInCustomer.balance}`
    );
  } else {
    console.log(
      "Insufficient balance or invalid withdrawal amount. Withdrawal failed."
    );
  }
}

// See account statement (This will be replaced by the API call from client)
function seeAccountStatement() {
  const loggedInCustomer = Customers.find(
    (customer) => customer.username === loggedInUsername
  );

  if (loggedInCustomer) {
    const accountTransactions = Transactions.filter(
      (t) => t.account === loggedInCustomer.AccountNumber
    );

    console.log("Account Statement:");
    console.log("Date\t\tAmount\t\tTransaction Type");
    accountTransactions.forEach((transaction) => {
      console.log(
        `${transaction.date}\t${transaction.amount}\t\t${transaction.type}`
      );
    });

    console.log(`Current Balance: ${loggedInCustomer.balance}`);
  } else {
    console.log("No account statement available.");
  }
}

// Run the program
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
  mainMenu();
});