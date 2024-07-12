import { ResponseError, ResponseSuccess } from "@/app/api/common";
import dataCollectionModels from "@/models/dataCollectionModels";
import { RequestWithLogFields } from "@/models/models.types";
import { combineMiddlewares } from "@/server/middlewares/combineMiddlewares";
import uuidCookieMiddleware from "@/server/middlewares/uuidCookieMiddleware";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  project: string;
}

const middleware_1: any = async (_req: any, _res: any, next: any) => {
  console.log("Running middleware 1");
  next();
};

const middleware_2: any = async (_req: any, _res: any, next: any) => {
  console.log("Running middleware 2");

  // sleep for 2.5 seconds
  console.log("Sleeping for 2.5 seconds");
  await new Promise((resolve) => setTimeout(resolve, 2500));

  next();
};

const middleware_3: any = async (_req: any, _res: any, next: any) => {
  console.log("Running middleware 3");

  // Fetch data from json api
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const json = await res.json();
  console.log(json);

  next();
};

const middleware_4: any = async (_req: any, _res: any, next: any) => {
  console.log("Running middleware 4");
  next();
};

const hello = async (req: any, res: any) => {
  console.log(3333333, "run!!");

  return NextResponse.json(
    { message: "Hello World." },
    {
      status: 200,
    }
  );
};
export async function GET(request: NextRequest, context: { params: Params }) {
  try {
    const combineMiddleware = combineMiddlewares(
      // uuidCookieMiddleware,
      middleware_1,
      middleware_2,
      middleware_3,
      middleware_4,
      hello
    );
    return await combineMiddleware(request as RequestWithLogFields, context);

    console.log(11111111);

    // const { searchParams } = new URL(request.url);
    // const query = searchParams.toString();

    // if (!isValidData(query)) {
    //   return ResponseError(400, "Invalid data");
    // }

    // const missRequireFields = hasRequiredFields(searchParams);
    // if (!!missRequireFields) {
    //   return ResponseError(
    //     400,
    //     "Missing required fields: " + missRequireFields
    //   );
    // }

    // await dataCollectionModels(request as RequestWithLogFields, context);
    // return ResponseSuccess(200, "success", {});
  } catch (error: any) {
    return ResponseError(500, JSON.stringify(error));
  }
}

// export async function POST(request: NextRequest, context: { params: Params }) {
//   try {
//     const { name } = await request.json();
//     const combineMiddleware = combineMiddlewares(uuidCookieMiddleware);
//     const response = combineMiddleware(
//       request as RequestWithLogFields,
//       context,
//       (err?: Error) => {
//         if (err) return ResponseError(500, JSON.stringify(err));
//         return ResponseSuccess(200, "success", { name });
//       }
//     );
//     return response;
//   } catch (error) {
//     return ResponseError(500, JSON.stringify(error));
//   }
// }

const isValidData = (query: string) => {
  return query ? true : false;
};

const hasRequiredFields = (query: URLSearchParams) => {
  const requiredKeys = ["client", "timestamps", "page_name", "event", "target"];
  const missKey = requiredKeys.filter((key) => !query.get(key));
  return missKey?.join(",");
};
