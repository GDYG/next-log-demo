import { NextRequest } from "next/server";

export interface RequestWithLogFields extends NextRequest {
  log_fields: {
    logId: string;
    ua: string;
    client_ip?: string | null;
  };
}

export interface Params {
  project: string;
}
