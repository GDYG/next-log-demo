import { RequestWithLogFields } from "@/middleware";
import { v4 as _v4 } from "uuid";
import { Params } from "./models.types";

/**
 * @function 数据监控-数据埋点
 * ?--------------------------------------------------
 * * uid
 * * 当uid为空时，可以用session标识唯一用户
 * * ✏️ 登录后的接口的 userid
 * ?--------------------------------------------------
 * * session 【Server】
 * * 当uid为空时，可以用来标识唯一用户
 * * ✏️ app web 跟cooikes一个效果 uuid 16len
 * ?--------------------------------------------------
 * * client_ip 【Server】
 * * 客户端ip
 * * ✏️ ctx.ip || headers["x-forwarded-for"] || ctx.req.connection.remoteAddress
 * ?--------------------------------------------------
 * * client
 * * webapp、wechat、web、android、ios、miniprogram
 * * ✏️
 * ?--------------------------------------------------
 * * url
 * * 页面地址, 当前页面地址
 * * ✏️ ctx.uri 不要有域名，直接“/”开头 APP忽略
 * ?--------------------------------------------------
 * * referer
 * * 上个页面
 * * ✏️ Web端 headers.referer || null  APP自理
 * ?--------------------------------------------------
 * * timestamps
 * * 触发时间
 * * ✏️ 时间格式为 2023-10-17T07:21:55.335Z  new Date().toISOString()
 * ?--------------------------------------------------
 * * page_name
 * * 页面名称--中文 (所有端名称要一致)
 * * ✏️ ["我的关注", "行业热点", "新闻详情", "舆情设置"]
 * ?--------------------------------------------------
 * * event
 * * 事件
 * * ✏️ ["点击", "跳转"]
 * ?--------------------------------------------------
 * * target
 * * 目标 表示用户点击的按钮或者Tab的描述跟UI一致，登录/注册需要区
 * * ✏️ ["登录", "注册", "舆情", "我的关注", "去设置关键词", "保存", "关注微信", "定制报告", "查看全文"]
 * ?--------------------------------------------------
 * * project 【Server】
 * * 监控项目
 * * ✏️ opinion -> 舆情数据埋点
 * ?--------------------------------------------------
 * * ua 【Server】
 * * 请求头
 * * ✏️ ctx.headers["user-agent"]
 * ?--------------------------------------------------
 * * /monitor/dc/opinion?uid=1&url=2&client=ios&referer=6&timestamps=7&page_name=8&event=9&target=10
 */

const buriedKeys = [
  "uid",
  "url",
  "client",
  "referer",
  "timestamps",
  "page_name",
  "event",
  "target",
  "client_ip",
  "ua",
  "session",
  "project",
  "token",
];

export type BuriedKeys = (typeof buriedKeys)[number];

export const getInitFields = async (
  request: RequestWithLogFields,
  context: { params: Params },
  query: URLSearchParams | object
) => {
  const { headers, ip, cookies } = request;
  const client_ip =
    ip || headers.get("x-forwarded-for") || request.headers.get("x-real-ip");
  const project = context.params.project;
  const url = request.nextUrl.pathname;
  const ua = (await headers.get("user-agent")) || "";
  const token = (await cookies.get("token")?.value) ?? "";
  const referer = (await headers.get("referer")) || null;
  const logId = await (cookies.get("MONITOR_UUID") ?? _v4().substring(0, 16));
  const session = logId;

  const logFields: Record<BuriedKeys, any> = {
    session,
    client_ip,
    ua,
    project,
    timestamps: new Date().toISOString(),
    token,
    uid: logId,
    url,
    referer,
  };

  buriedKeys.forEach((key) => {
    const value =
      query instanceof URLSearchParams
        ? (query as URLSearchParams)?.get(key)
        : (query as Record<string, any>)?.[key];
    logFields[key] = value ?? logFields[key];
  });

  return logFields;
};
