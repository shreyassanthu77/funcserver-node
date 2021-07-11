const { FunCall } = require("../");

const server = new FunCall();

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
