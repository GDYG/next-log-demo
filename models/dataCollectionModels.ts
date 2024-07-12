import { RequestWithLogFields } from "@/middleware";
import { v4 as _v4 } from "uuid";
import { logger } from "@/server/index";
import { getInitFields } from "./getInitFields";
import { Params } from "./models.types";

const dataCollectionModels = async (
  request: RequestWithLogFields,
  context: { params: Params }
) => {
  return new Promise(async (resolve, reject) => {
    const logFields = await getInitFields(request, context);
    await logger.info(logFields);
    resolve(logFields);
  });
};

export default dataCollectionModels;
