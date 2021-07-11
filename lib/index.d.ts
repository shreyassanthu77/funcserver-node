import { Context } from "koa";
export { Context } from "koa";
export declare type Fun = (this: Context, ...args: any[]) => any;
export declare class FunServer {
    private functions;
    private notFoundError;
    private handler;
    private _register;
    register(...functions: (Fun | [Fun, string])[]): this;
    start(): void;
}
