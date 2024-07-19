import { MiddlewareNext } from "@/server/middlewares/combineMiddlewares";
import { Params, RequestWithLogFields } from "../../models/models.types";
import { ResponseError, ResponseSuccess } from "@/app/api/common";
import dataCollectionModels from "@/models/dataCollectionModels";
import { hasRequiredFields, isValidData } from "../utils";

const getMethodMiddleware = async (
  request: RequestWithLogFields,
  context: { params: Params },
  next: MiddlewareNext
) => {
  try {
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
    await dataCollectionModels(
      request as RequestWithLogFields,
      context,
      searchParams
    );

    return ResponseSuccess(200, "success", {});
  } catch (error: any) {
    return ResponseError(500, JSON.stringify(error));
  }
};

export default getMethodMiddleware;
