// Step 1: Get user
function getUser(username) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "Rahul", type: "Premium" });
    }, 1500);
  });
}

// Step 2: Check subscription
function checkSubscription(user) {
  return new Promise((resolve, reject) => {
    if (user.type === "Premium") {
      resolve("Access Granted to Netflix");
    } else {
      reject("Please Subscribe");
    }
  });
}

// Consumer function
async function loginUser(username) {
  try {
    const user = await getUser(username);
    const access = await checkSubscription(user);
    console.log(access);
  } catch (error) {
    console.error(error);
  }
}

// Run
loginUser("rahul123");
