import express from "express";

const globalRouter = express.Router();

const handleHome = (req, res) => res.send("Home");

globalRouter.get("/", handleHome);

export default globalRouter;

// 우리는 변수 globalRouter 를 export 하고 있다. 
// 모든 파일은 모듈이기 때문에 분리되어 있다. 
// default export
