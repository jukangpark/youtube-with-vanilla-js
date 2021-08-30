import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  description: { type: String, required: true, trim: true, minLength: 20 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }], // 스키마는 모델의 형태를 정의해주기 때문에 여기서 저장하려는 자료형은 '배열'이어야 한다. split으로 인해서 req.body에서 나온 문자열은 배열이 될것이고
  // 이 배열을 DB에 저장하려고 하는것.. split()은 문자열을 나눠서 배열로 반환.
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
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
