import Koa = require("koa");
import koaBody = require("koa-body");
import { Context } from "koa";

export { Context } from "koa";

type Body = {
  fun: string;
  args: any[];
};
export type Fun = (this: Context, ...args: any[]) => any;
type Funs = {
  fun: Fun;
  name: string;
}[];

export class FunServer {
  private functions: Funs = [];

  private notFoundError(ctx: Context) {
    ctx.status = 404;
    return {
      err: "Function Not Found",
    };
  }

  private async handler(ctx: Context) {
    try {
      const { fun, args = [] } = ctx.request.body as Body;

      if (!fun || typeof fun !== "string" || !this.functions)
        return this.notFoundError(ctx);

      const func = this.functions.find((f) => f.name === fun);
      if (!func) return this.notFoundError(ctx);

      const res = await func.fun.apply(ctx, args);
      return (ctx.body = res);
    } catch (error) {
      return (ctx.body = {
        error: true,
        msg: error.message,
      });
    }
  }

  private _register(fun: Fun, name?: string) {
    if (typeof fun !== "function") {
      throw new Error("Register requires a param of type function");
    }
    this.functions.push({
      fun,
      name: name || fun.name,
    });
  }

  public register(...functions: (Fun | [Fun, string])[]) {
    functions.forEach((fun) => {
      if (typeof fun === "function") {
        this._register(fun);
      } else {
        this._register(fun[0], fun[1]);
      }
    });

    return this;
  }

  public start() {
    const server = new Koa();
    const PORT = 3333;

    server.use(koaBody());
    server.use(this.handler.bind(this));
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}
