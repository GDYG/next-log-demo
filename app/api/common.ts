import { NextResponse } from "next/server";

export const ResponseSuccess = (
  code: number,
  msg: string,
  data: any,
  count?: number
) => {
  const returnJson = {
    code,
    msg,
    data,
    count,
  };
  return NextResponse.json(returnJson, {
    status: 200,
  });
};

export const ResponseError = (code: number, msg: string) => {
  const returnJson = {
    code,
    msg,
  };
  return NextResponse.json(returnJson, {
    status: 200,
  });
};
