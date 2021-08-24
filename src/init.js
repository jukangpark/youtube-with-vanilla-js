import "dotenv/config";
import "./db"; // 파일 자체를 import 해주기 서버는 이 라인을 보는순간 이 파일을 import 해줌으로써 서버가 mongo에 연결될거야.
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 9000;

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);

// server.js 는 express 된 것들과 server 의 configuration 에 관련된 코드만 처리하기 위해 만들어졌지
// database 나 models 같은 것들을 import 를 하기 위함은 아니니까
// nodemon은 현재 server.js 를 관찰하는데 server.js 는 app을 export할 뿐 작동시키지는 않기 때문에 package.json에서 src값을 init.js로 바꿔줘야함.
// init.js 는 필요한 모든 것들을 import 시키는 역할을 담당할 거야.
