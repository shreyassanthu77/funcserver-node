import { Fun, Funs } from ".";

export class Namespace {
  private funcs: Funs = [];
  constructor(private name: string) {}
  private _register(fun: Fun, name?: string) {
    if (typeof fun !== "function") {
      throw new Error("Register requires a param of type function");
    }
    this.funcs.push({
      fun,
      name: this.name + "." + (name || fun.name),
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

  public get functions() {
    return this.funcs;
  }
}

export function createNamespace(name: string) {
  return new Namespace(name);
}
