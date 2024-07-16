import { Params, RequestWithLogFields } from "@/models/models.types";
import { NextRequest, NextResponse } from "next/server";

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
  req: RequestWithLogFields,
  context: { params: Params },
  middleware: Middleware[],
  index = 0
) => {
  if (typeof middleware[index] !== "function") {
    NextResponse.json("Middleware must be a function!", {
      status: 500,
    });
    throw new Error("Middleware must be a function!");
  }

  return await middleware[index](req, context, (async () => {
    await execMiddleware(req, context, middleware, index + 1);
  }) as any);
};

export function combineMiddlewares(...middlewares: Middleware[]) {
  return async (req: RequestWithLogFields, context: { params: Params }) => {
    await execMiddleware(req, context, middlewares);
  };
}
