const { FuncServer, createNamespace } = require("../");

// Initialize the server
const server = new FuncServer();

// Declare your Functions
function hello(name = "World!") {
  return `Hello ${name}`;
}

function login(email, password) {
  return "Logged In";
}

function getAll() {
  return {
    data: "All Users",
  };
}

// Register a Function
server.register(hello);

// Register with a Custom Client Side Name
server.register([login, "loginUser"]);

// You can also create Namespaced functions
const usersNs = createNamespace("users");

usersNs.register(getAll); // Available at users.getAll

// Register The Namespace

server.registerNamespace(usersNs);

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
