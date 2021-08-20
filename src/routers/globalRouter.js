import express from "express";
import { join, login } from "../controllers/userController";
import { home, search } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;

// 우리는 변수 globalRouter 를 export 하고 있다.
// 모든 파일은 모듈이기 때문에 분리되어 있다.
// default export
