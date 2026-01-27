// Function that returns a Promise
function checkOrderStatus(orderId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof orderId === "number") {
        resolve("Order Shipped");
      } else {
        reject("Invalid Order ID");
      }
    }, 1000);
  });
}

// Consumer function using async/await
async function processOrder(orderId) {
  try {
    const result = await checkOrderStatus(orderId);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// Test cases
processOrder(101);      // ✅ Order Shipped
processOrder("ABC");   // ❌ Invalid Order ID
