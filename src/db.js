import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  // 이건 Mongoose 가 오래된 것 들을 처리하는 방법이라 시키는대로 할 수 밖에 없어.
  // 그래서 몇가지 세팅을 콕 찝어 설정해야하지만 딱히 큰 문제는 아니다.
});

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB");
const handleError = (error) => console.log("DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen); // 한번만 일어남

// mongodb에 새로운 database를 만드는건 아주 간단해
// 이 url에 연결한 뒤 /뒤에 database 이름을 적어주면 돼
