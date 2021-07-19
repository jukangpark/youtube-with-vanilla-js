import express from "express";

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`); // req는 객체이기 때문에 프로퍼티로 접근
    next(); // next()함수를 호출하는 미들 웨어
}

const privateMiddleware = (req, res, next) => {
    const url = req.url;

    if(url === "/protected") {
        return res.send("<h1>Not Allowed</h1>");
    }

    console.log("Allowed, you may continue");
    next();
}

const handleHome = (req, res) => {
    return res.send("<h1>I still love you</h1>");
}

const handleProtected = (req, res) => {
    return res.send("Welcome to the privated ");
}

app.use(logger); // 모든 라우트(길)에 적용되는 미들웨어
app.use(privateMiddleware); // 미들웨어
app.get("/", handleHome); 
app.get("/protected", handleProtected);

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening)

