import { ResponseError, ResponseSuccess } from "@/app/api/common";
import { combineMiddlewares } from "@/server/middlewares/combineMiddlewares";
import dataCollectionMiddleware, {
  RequestWithLogFields,
} from "@/server/middlewares/dataCollectionMiddleware";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  project: string;
}

export async function GET(request: NextRequest, context: { params: Params }) {
  const response = new NextResponse();
  console.log(33333, response);
  return NextResponse.next();
}

export async function POST(request: NextRequest, context: { params: Params }) {
  try {
    const body: FormData = await request.formData();
    const name = body.get("name");
    const combineMiddleware = combineMiddlewares(dataCollectionMiddleware);
    const response = combineMiddleware(
      request as RequestWithLogFields,
      context,
      (err?: Error) => {
        if (err) return ResponseError(500, JSON.stringify(err));
        return ResponseSuccess(200, "success", { name });
      }
    );
    return response;
  } catch (error) {
    return ResponseError(500, JSON.stringify(error));
  }
}
