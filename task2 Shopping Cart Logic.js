const cart = [
  { item: "Laptop", price: 50000, quantity: 1, inStock: true },
  { item: "Mouse", price: 1500, quantity: 2, inStock: true },
  { item: "Keyboard", price: 3000, quantity: 1, inStock: false }
];

// 1. Check if all items are in stock
const readyToShip = cart.every(item => item.inStock);
console.log(readyToShip ? "Ready to Ship" : "Wait");

// 2. Filter out NOT in stock items
const availableItems = cart.filter(item => item.inStock);

// 3. Calculate total bill
const totalBill = availableItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);

console.log("Available Items:", availableItems);
console.log("Total Bill:", totalBill);
