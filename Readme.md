
# FuncServer

A simple yet fast and powerful JSON based Backend Framework to build Next Generation API's for Node JS


## Installation

Install my-project with npm

```bash
  npm install funcserver
```
    
## Usage/Examples

### import the package
```javascript
    const { FuncServer } = require("funcserver")
```
### create The server
```javascript
    const server = new FuncServer()
```
### Register Your Functions
> *Note*: Only Use function syntax and not arrow Functions
```javascript
    function hello(name = "World!") {
        return `hello ${name}`
    }

    server.register(hello)
```
Any JSON serializable data can be returned from the function

### To give a cutom name to call from the client
```javascript
    server.register([hello, "customName"])
```

### Namespaced functions can also be created
```javascript
    // import createNamespace
    const { createNamespace } = require("funcserver")
    // create a Namespace
    const usersNs = createNamespace("users")
    // register functions
    function getAll() {
      return "All Users"
    }
    usersNs.register(getAll)
    // register Namespace
    server.registerNamespace(usersNs)
```
> Namespaced Functions can be Accessed through `namespaceName.functionName` syntax

### Start the server
```javascript
    const PORT = process.env.PORT || 1234
    server.start(PORT)
```
> You can pass optional Koa compatible middleware after the port which run before each request

  
## Client API Reference

#### Call your Function

```http
  POST /func
  Content-Type: application/json

  {
    "fun": "hello",
    "args": ["Mario"]
  }
```
> *Note*: Args is an array of all the arguments to be passed to a function
Returns JSON version of your function response
  