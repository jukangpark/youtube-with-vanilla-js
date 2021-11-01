import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "express-flash";

import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";

const app = express();
const logger = morgan("dev");
//
app.use(
  "/static",
  express.static("assets"),
  express.static("node_modules/@ffmpeg/core/dist")
);
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* 
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});
*/

// 이 미들웨어는 브라우저가 우리의 backend와 상호작용 할때 마다 브라우저에게 쿠키를 줌,
app.use(
  session({
    secret: process.env.COOKIE_SECRET, // 나중에는 이 secret을 말 그대로 아무도 모르는 문자열로 쓸겁니다.
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    // 이 세션 미들웨어가 사이트로 들어오는 모두를 기억하게 할 거야.
    // 우리의 세션들은 우리의 MongoDB database에 저장되어 있다.
  })
);

/*
app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    console.log(sessions);
    next();
    // session 을 보여주기 위한 미들웨어
  });
});
*/

// process.cwd() + '/views'
// process.cwd() = current working directory
// package.json이 node.js를 실행하고 있어.
// cwd는 node js를 실행하는 폴더임. -> wetube(O), wetbue/src(X)
// /documents/wetube 폴더에서 package.json이 node.js를 실행하고 있어.
// 따라서 default값을 바꿔야함
// app.set("views"를 사용하면 우리는 이 default값을 바꿀 수 있어요);

app.get("/add-one", (req, res, next) => {
  req.session.potato += 1;
  return res.send(`${req.session.id}\n${req.session.potato}`);
  // 브라우저마다 서로 다른 세션 id를 가진 텍스트를 보내고 있다.
  // 서버가 브라우저한테 세션 id를 주고 있다. 그리고 브라우저가 요청을 보낼때마다
  // 쿠키에서 세션 id를 가져와 보내주는거지. 그러면 서버가 그 세션 id를 읽고
  //우리가 누군지 알 수 있는거야. 어떤 브라우저인지 알 수 있는거지..
});

app.use(flash());
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);

// 라우터는 url을 그룹화 하는 방법이다. 공통 시작 부분으로 그룹화 하는 것이다.

export default app;
