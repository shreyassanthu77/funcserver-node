const { FuncServer } = require("../");

const server = new FuncServer();

const hi = () => (name) => {
  console.log(this);
  return "Hello " + (name || "World");
};

server
  .register(
    [hi(), "hi"],
    [
      () => {
        console.log(this);
        return "Hello";
      },
      "hello",
    ]
  )
  .start();
