import "./db";
import "./models/Video";
import express from "express";
import morgan from "morgan";

import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));

// 1. Install pug
// 2.pug를 뷰 엔진으로 설정한다.
// 3. 실제로 pug파일을 생성한다.

// 기본적으로 Express는 여기있는 views 폴더 안에 있는 파일을 찾아

// process.cwd() + '/views'
// process.cwd() = current working directory
// package.json이 node.js를 실행하고 있어.
// cwd는 node js를 실행하는 폴더임. -> wetube(O), wetbue/src(X)
// /documents/wetube 폴더에서 package.json이 node.js를 실행하고 있어.
// 따라서 default값을 바꿔야함
// app.set("views"를 사용하면 우리는 이 default값을 바꿀 수 있어요);

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

// 라우터는 url을 그룹화 하는 방법이다. 공통 시작 부분으로 그룹화 하는 것이다.

export default app;
