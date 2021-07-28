import express from "express"; // node_modules에서 express를 찾아서 임포트 해줌
import { 
    watch, 
    getEdit,
    postEdit, 
    getUpload,
    postUpload,
} from "../controllers/videoController"; //노드 js는 이 경로를 이해함.

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);
// 여기서 순서가 중요합니다.
// request는 맨 위부터 먼저 실행됩니다요
// 그 다음 다음걸로 넘어갑니다요
// express한테 여기 오는 이 id는 숫자여야 한다고 전달할 수 있다면

// 정규식 Regular Expression
// 'ab*cd' 
// ab?cd b가 선택 사항


// 파라미터(parameter)
// url안에 변수를 포함시킬 수 있게 해준다는 것이다.
// 내가브라우저로 가서 /videos/12121 expresss는 : 를 넣는 것은 : 뒤에 있는 것이 변수라는걸
// express에게 알려주기 위해서입니다.

export default videoRouter;