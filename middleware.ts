import { NextResponse, NextRequest } from "next/server";

export interface RequestWithLogFields extends NextRequest {
  log_fields: {
    logId: string;
    ua: string;
    client_ip?: string | null;
  };
}

interface Params {
  project: string;
}

export async function middleware(
  request: NextRequest,
  context: { params: Params }
) {
  return NextResponse.next();
}

export const config = {
  matcher: "/home/:path*",
};
