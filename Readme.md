
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

### Start the server
```javascript
    server.start()
```

  
## Client API Reference

#### Get all items

```http
  POST /
  Content-Type: application/json

  {
    "fun": "hello",
    "args": ["Mario"]
  }
```
Returns JSON version of your function response
  