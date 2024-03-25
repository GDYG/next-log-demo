import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const data = { data: { id: 123123, desc: "GET" } };
  return Response.json({ data });
}
