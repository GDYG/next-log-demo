import dataCollectionMiddleware from "@/server/middlewares/dataCollectionMiddleware";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return dataCollectionMiddleware(request as any);
}
