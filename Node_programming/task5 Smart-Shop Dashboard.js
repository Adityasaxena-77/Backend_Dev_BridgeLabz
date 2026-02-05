// Fetch user
function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "Atul", isPremium: true });
    }, 1000);
  });
}

// Fetch orders
function fetchOrders(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { item: "Laptop", price: 1000, status: "delivered" },
        { item: "Phone", price: 500, status: "pending" }
      ]);
    }, 2000);
  });
}

// Dashboard logic
async function displayDashboard(id) {
  try {
    const user = await fetchUser(id);
    const orders = await fetchOrders(id);

    // 1. Filter delivered orders
    const deliveredOrders = orders.filter(
      order => order.status === "delivered"
    );

    // 2. Apply premium discount
    const discountedOrders = deliveredOrders.map(order => {
      return {
        ...order,
        price: user.isPremium ? order.price * 0.9 : order.price
      };
    });

    // 3. Calculate total
    const total = discountedOrders.reduce(
      (sum, order) => sum + order.price,
      0
    );

    // 4. Output
    console.log(`Welcome ${user.name} 👋`);
    console.log("Delivered Orders:", discountedOrders);
    console.log("Final Total:", total);

  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

// Run dashboard
displayDashboard(1);
