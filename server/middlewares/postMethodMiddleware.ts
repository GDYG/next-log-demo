import { MiddlewareNext } from "@/server/middlewares/combineMiddlewares";
import { Params, RequestWithLogFields } from "../../models/models.types";
import { ResponseError, ResponseSuccess } from "@/app/api/common";
import { hasRequiredFields, isValidData } from "../utils";
import dataCollectionModels from "@/models/dataCollectionModels";

const postMethodMiddleware = async (
  request: RequestWithLogFields,
  context: { params: Params },
  next: MiddlewareNext
) => {
  try {
    const jsonData = await request.json();

    if (!isValidData(jsonData)) {
      return ResponseError(400, "Invalid data");
    }

    const missRequireFields = hasRequiredFields(jsonData);

    if (!!missRequireFields) {
      return ResponseError(
        400,
        "Missing required fields: " + missRequireFields
      );
    }

    await dataCollectionModels(
      request as RequestWithLogFields,
      context,
      jsonData
    );

    return ResponseSuccess(200, "success", {});
  } catch (error) {
    return ResponseError(500, JSON.stringify(error));
  }
};

export default postMethodMiddleware;
