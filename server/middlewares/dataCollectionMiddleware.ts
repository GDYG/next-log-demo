import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { logger } from "@/server/index";
import next from "next";
import { Params, RequestWithLogFields } from "@/app/api/log/dc/[project]/route";

async function dataCollectionMiddleware(
  request: RequestWithLogFields,
  context: { params: Params }
) {
  const { headers, cookies, ip } = request;
  const logId = await uuidv4().substring(0, 8);
  const ua = headers.get("user-agent") || "";
  const client_ip =
    ip || headers.get("x-forwarded-for") || request.headers.get("x-real-ip");

  // console.log("logId", logId);
  // console.log("ua", ua);
  // console.log("client_ip", client_ip);
  // console.log("cookies", cookies);
  console.log(3333, context);

  request.log_fields = {
    logId,
    ua,
    client_ip,
  };

  logger.info("dataCollection", request.log_fields);
  // 继续处理请求
  return next({});
}

export default dataCollectionMiddleware;
