import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  fileUrl: { type: String, required: true },
  thumbUrl: { type: String, required: true },
  description: { type: String, required: true, trim: true, minLength: 20 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  // 스키마는 모델의 형태를 정의해주기 때문에 여기서 저장하려는 자료형은 '배열'이어야 한다.
  // 왜냐하면 split()은 req.body.hashtags 안에 있던 문자열을 "," 로 나눠서 배열로 반환하고
  // 그리고 그 배열은 Array.prototype.map() 메서드에 의해서 함수가 실행된이후 반환된 자료형은 배열이기 때문이다.
  meta: {
    views: { type: Number, default: 0, required: true },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

// this 라는 키워드는 우리가 저장하고자 하는 문서를 가리키는 거야.
// 이 몽구스 미들웨어는 document 를 save하기 전에 실행되는 function 입니다.
// 그리고 이것은 모두 javaScript 입니다.
const Video = mongoose.model("Video", videoSchema);
export default Video;
