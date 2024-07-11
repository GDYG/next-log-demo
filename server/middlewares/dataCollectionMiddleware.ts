import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { logger } from "@/server/index";
import { MiddlewareNext } from "./combineMiddlewares";
export interface RequestWithLogFields extends NextRequest {
  log_fields: {
    logId: string;
    ua: string;
    client_ip?: string | null;
  };
}

export interface Params {
  project: string;
}

async function dataCollectionMiddleware(
  request: RequestWithLogFields,
  context: { params: Params },
  next: MiddlewareNext
) {
  console.log(9999, request, context, next);
}

export default dataCollectionMiddleware;
