import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

async function dataCollectionMiddleware(
  request: NextRequest & { log_fields: any }
) {
  const { headers, cookies, ip } = request;
  const logId = await uuidv4().substring(0, 8);
  const ua = headers.get("user-agent") || "";
  const client_ip =
    ip || headers.get("x-forwarded-for") || request.headers.get("x-real-ip");

  console.log("logId", logId);
  console.log("ua", ua);
  console.log("client_ip", client_ip);

  request.log_fields = {
    logId,
    ua,
    client_ip,
  };

  try {
    const data = { data: { id: 123123, desc: "GET" } };
    return Response.json({ data });
  } catch (err) {
    throw err;
  }
}

export default dataCollectionMiddleware;
