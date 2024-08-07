import { RequestWithLogFields } from "@/middleware";
import { v4 as _v4 } from "uuid";
import { MiddlewareNext } from "./combineMiddlewares";
import { cookies } from "next/headers";
import { Params } from "@/models/models.types";
import { NextResponse } from "next/server";

async function uuidCookieMiddleware(
  request: RequestWithLogFields,
  context: { params: Params },
  next: MiddlewareNext
) {
  try {
    const cookieStore = cookies();
    let uuid = (await cookieStore.get("MONITOR_UUID")) as string | undefined;

    if (!uuid) {
      uuid = await _v4().substring(0, 16);
      const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
      await cookieStore.set("MONITOR_UUID", uuid, {
        maxAge: oneDayInMilliseconds,
        httpOnly: true,
      });
    }
    next();
    // return NextResponse.json({ message: "success111" });
    // throw new Error("error");
  } catch (error: any) {
    next(error);
    throw new Error(error);
  }
}

export default uuidCookieMiddleware;
