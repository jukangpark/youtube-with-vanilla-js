// 내가 만든 객체를
// 우리의 template에 보낼 것입니다.
import Video from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";
// Video만 import 하면 formatHashtags도 딸려오지.

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner").populate("comments");
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
    // if 안에 return 이 없으면 JavaScript 는 영상이 없을 때 if 안의 코드를 실행하고
    // 그 밑에 코드들도 실행할텐데, 그건 우리가 원하지 않는 결과니까.
  }

  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    // 만약 존재하지 않는 영상이면 "Video not found" 를 출력할거야.
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }

  if (String(video.owner) !== String(_id)) {
    req.flash("erro", "Not authorized");
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edit : ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const { title, description, hashtags } = req.body;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "You are not the owner of the video.");
    return res.status(403).redirect("/");
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });

  req.flash("success", "Change saved");
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "UploadVideo" });
};

export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { video, thumb } = req.files;
  const { title, description, hashtags } = req.body;
  const isHeroku = process.env.NODE_ENV === "production";
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: isHeroku ? video[0].location : video[0].path,
      thumbUrl: isHeroku ? thumb[0].location : video[0].path,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags), // 각자의 특별한 static function
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    await user.save();
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "UploadVideo",
      errorMessage: error._message,
      // 이제 upload 를 render 할 때 에러 메시지도 함께 render 돼
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  const user = await User.findById(_id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  user.videos.splice(user.videos.indexOf(id), 1);
  await user.save();
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}$`, "i"),
        // query 에 이런 옵션들을 추가할 수 있으려면
        // regex 라는 연산자를 써야해
        // 이건 mongoDB가 하는 거야
      },
    }).populate("owner");
  }
  return res.render("search", { pageTitle: "Search", videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    body: { text },
    params: { id },
    session,
  } = req;

  const video = await Video.findById(id);
  const user = await User.findById(session.user._id);

  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }

  const newComment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });

  video.comments.push(newComment);
  video.save();

  user.comments.push(newComment);
  user.save();

  return res
    .status(201)
    .json({
      newCommentId: newComment._id,
      owner: user.username,
      avatarUrl: user.avatarUrl,
    });
};
