import express from "express";
import {
  getEdit,
  postEdit,
  logout,
  see,
  StartGithubLogin,
  finishGithubLogin,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import {
  protectorMiddleware,
  publicOnlyMiddleware,
  uploadFiles,
} from "../middlewares";
// 오브젝트를 열어 괄호를 열고, 같은 이름을 써야해
// default export 는 원하는 이름을 아무거나 쓸수가 있어
// node js 가 다 알기 때문에 자동으로 지정해준다.

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(uploadFiles.single("avatar"), postEdit);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/github/start", publicOnlyMiddleware, StartGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get(":id", see);

// 라우터는 url을 그룹화 하는 방법이야.
// 공통 시작 부분으로 그룹화 하는 거야

export default userRouter;

// edit이랑 remove라는 함수를 두개 가져와야해
