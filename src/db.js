import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB");
const handleError = (error) => console.log("DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen); // 한번만 일어남

// mongodb에 새로운 database를 만드는건 아주 간단해
// 이 url에 연결한 뒤 /뒤에 database 이름을 적어주면 돼. 
