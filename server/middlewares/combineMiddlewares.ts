import { ResponseError } from "@/app/api/common";
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

const execMiddlewareChain = async (
  req: RequestWithLogFields,
  context: { params: Params },
  middleware: Middleware[],
  index = 0
) => {
  if (typeof middleware[index] !== "function") {
    return ResponseError(500, "Middleware must be a function!");
  }

  let nextInvoked = false;
  const response = await middleware[index](req, context, (() => {
    nextInvoked = true;
  }) as MiddlewareNext);

  if (response !== undefined) {
    return response;
  }

  if (nextInvoked) {
    return await execMiddlewareChain(req, context, middleware, index + 1);
  }
};

// TODO: 调用中间件，也许有更好的实现方法，暂时写这两种
export function combineMiddlewares(...middlewares: Middleware[]) {
  return async (req: RequestWithLogFields, context: { params: Params }) => {
    // let result;
    // for (let i = 0; i < middlewares.length; i++) {
    //   let nextInvoked = false;
    //   const next = async () => {
    //     nextInvoked = true;
    //   };
    //   result = await middlewares[i](req, context, next as MiddlewareNext);
    //   if (!nextInvoked) {
    //     break;
    //   }
    // }
    const result = await execMiddlewareChain(req, context, middlewares);
    if (result !== undefined) return result;
    throw new Error("Your handler or middleware must return a NextResponse!");
  };
}
