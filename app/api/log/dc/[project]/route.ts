import { ResponseError, ResponseSuccess } from "@/app/api/common";
import dataCollectionModels from "@/models/dataCollectionModels";
import { combineMiddlewares } from "@/server/middlewares/combineMiddlewares";
import dataCollectionMiddleware, {
  RequestWithLogFields,
} from "@/server/middlewares/dataCollectionMiddleware";
import uuidCookieMiddleware from "@/server/middlewares/uuidCookieMiddleware";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  project: string;
}

export async function GET(request: NextRequest, context: { params: Params }) {
  try {
    const combineMiddleware = combineMiddlewares(uuidCookieMiddleware);
    await combineMiddleware(
      request as RequestWithLogFields,
      context,
      (err?: Error) => {
        if (err) return ResponseError(500, JSON.stringify(err || {}));

        return {} as any;
      }
    );

    console.log(11111111, "no run!!");

    const { searchParams } = new URL(request.url);
    const query = searchParams.toString();

    if (!isValidData(query)) {
      return ResponseError(400, "Invalid data");
    }

    const missRequireFields = hasRequiredFields(searchParams);
    if (!!missRequireFields) {
      return ResponseError(
        400,
        "Missing required fields: " + missRequireFields
      );
    }

    await dataCollectionModels(request as RequestWithLogFields, context);
    return ResponseSuccess(200, "success", {});
  } catch (error: any) {
    return ResponseError(500, JSON.stringify(error));
  }
}

const middlewares = (req: any, res: any, next: any) => {
  console.log(3444444, req, res, next);
};

export async function POST(request: NextRequest, context: { params: Params }) {
  try {
    const { name } = await request.json();
    const combineMiddleware = combineMiddlewares(uuidCookieMiddleware);
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

const isValidData = (query: string) => {
  return query ? true : false;
};

const hasRequiredFields = (query: URLSearchParams) => {
  const requiredKeys = ["client", "timestamps", "page_name", "event", "target"];
  const missKey = requiredKeys.filter((key) => !query.get(key));
  return missKey?.join(",");
};