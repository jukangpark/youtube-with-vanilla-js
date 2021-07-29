// 내가 만든 객체를 
// 우리의 template에 보낼 것입니다.
import Video from "../models/Video";

export const home = (req, res) => {    
    Video.find({}, (error, videos) => {}); // search terms가 비어있으면 모든 형식을 찾는다는 것을 뜻한다.
    return res.render("home", { pageTitle: "Home"});   
};

export const watch = (req, res) => {
    const { id } = req.params;
    return res.render("watch", {pageTitle: `Watching`});
};

export const getEdit = (req, res) => {
    const { id } = req.params;
    return res.render("edit", {pageTitle:`Editing`})
};

export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "UploadVideo"});
};

export const postUpload = (req, res) => {
    console.log(req.body);
    const {title} = req.body;
    // here we will add a video to the videos array.
    return res.redirect("/");
};