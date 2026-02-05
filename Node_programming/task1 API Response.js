const rawUsers = [
  { id: 1, name: "Rahul", password: "fb_password", role: "admin" },
  { id: 2, name: "Sanya", password: "123_password", role: "user" },
  { id: 3, name: "Amit", password: "secret_password", role: "user" }
];

// 1. Remove password using map + rest operator
const safeUsers = rawUsers.map(({ password, ...rest }) => rest);

// 2. Filter admins only
const admins = safeUsers.filter(user => user.role === "admin");

console.log("Safe Users:", safeUsers);
console.log("Admins:", admins);
