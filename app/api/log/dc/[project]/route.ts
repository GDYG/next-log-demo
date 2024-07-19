import {
  getMethodMiddleware,
  postMethodMiddleware,
} from "@/server/middlewares";
import { combineMiddlewares } from "@/server/middlewares/combineMiddlewares";

export const GET = combineMiddlewares(getMethodMiddleware);
export const POST = combineMiddlewares(postMethodMiddleware);
