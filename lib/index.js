"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunServer = void 0;
const Koa = require("koa");
const koaBody = require("koa-body");
class FunServer {
    constructor() {
        this.functions = [];
    }
    notFoundError(ctx) {
        ctx.status = 404;
        return {
            err: "Function Not Found",
        };
    }
    handler(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fun, args = [] } = ctx.request.body;
                if (!fun || typeof fun !== "string" || !this.functions)
                    return this.notFoundError(ctx);
                const func = this.functions.find((f) => f.name === fun);
                if (!func)
                    return this.notFoundError(ctx);
                const res = yield func.fun.apply(ctx, args);
                return (ctx.body = res);
            }
            catch (error) {
                return (ctx.body = {
                    error: true,
                    msg: error.message,
                });
            }
        });
    }
    _register(fun, name) {
        if (typeof fun !== "function") {
            throw new Error("Register requires a param of type function");
        }
        this.functions.push({
            fun,
            name: name || fun.name,
        });
    }
    register(...functions) {
        functions.forEach((fun) => {
            if (typeof fun === "function") {
                this._register(fun);
            }
            else {
                this._register(fun[0], fun[1]);
            }
        });
        return this;
    }
    start() {
        const server = new Koa();
        const PORT = 3333;
        server.use(koaBody());
        server.use(this.handler.bind(this));
        server.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
}
exports.FunServer = FunServer;
