import { Params, RequestWithLogFields } from "@/models/models.types";
import { NextResponse } from "next/server";

export interface MiddlewareNext {
  (): void | NextResponse | any;
  (err?: Error): NextResponse;
}

export interface Middleware {
  (
    req: RequestWithLogFields,
    context: { params: Params },
    next: MiddlewareNext
  ): void;
}

const execMiddleware = async (
  req: any,
  res: any,
  middleware: Middleware[],
  index = 0
) => {
  if (typeof middleware[index] !== "function") {
    res.status(500).end("Middleware must be a function!");
    throw new Error("Middleware must be a function!");
  }

  return await middleware[index](req, res, (async () => {
    return await execMiddleware(req, res, middleware, index + 1);
  }) as any);
};

export function combineMiddlewares(...middlewares: Middleware[]) {
  return async (req: RequestWithLogFields, context: { params: Params }) => {
    // let index = 0;

    // async function runMiddleware(err?: Error) {
    //   if (err) {
    //     return next(err);
    //   }
    //   if (index >= middlewares.length) {
    //     console.log(22222, index);

    //     // return;
    //     throw new Error("error");
    //   }
    //   const middleware = middlewares[index];
    //   index++;
    //   await middleware(req, context, (async () => {
    //     (await runMiddleware()) as unknown as MiddlewareNext;
    //   }) as any);
    // }

    // await runMiddleware();

    return await execMiddleware(req, context, middlewares);
  };
}
