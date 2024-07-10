import { NextResponse } from "next/server";
import { Params, RequestWithLogFields } from "./dataCollectionMiddleware";

export interface MiddlewareNext {
  (): void | NextResponse;
  (err?: Error): NextResponse;
}

export interface Middleware {
  (
    req: RequestWithLogFields,
    context: { params: Params },
    next: MiddlewareNext
  ): void;
}

export function combineMiddlewares(...middlewares: Middleware[]) {
  return (
    req: RequestWithLogFields,
    context: { params: Params },
    next: MiddlewareNext
  ) => {
    let index = 0;

    function runMiddleware(err?: Error) {
      if (err) {
        return next(err);
      }
      if (index >= middlewares.length) {
        return next();
      }
      const middleware = middlewares[index];
      index++;
      middleware(req, context, runMiddleware as MiddlewareNext);
    }

    runMiddleware();

    return next();
  };
}
