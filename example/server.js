const { FuncServer } = require("../");

// Initialize the server
const server = new FuncServer();

// Declare your Functions
function hello(name = "World!") {
  return `Hello ${name}`;
}

function login(email, password) {
  return "Logged In";
}

// Register a Function
server.register(hello);

// Register with a Custom Client Name
server.register([login, "loginUser"]);

// Start the server
server.start(2345);

// Client API

// const hiRes = fetch("http://localhost:2345/func", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     fun: "hello",
//     args: ["Mario!"],
//   }),
// });
