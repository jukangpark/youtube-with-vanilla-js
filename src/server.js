import express from "express";

const PORT = 4000;

const app = express();

const gossipMiddleware = (req, res, next) => {
    console.log(`Someone is going to: ${req.url}`);
    next();
}

const handleHome = (req, res) => {
    return res.send("<h1>I still love you</h1>");
}

const handleLogin = (req, res) => {
    return res.send("Login here.");
}

app.use(gossipMiddleware,);
app.get("/",  handleHome);

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening)

