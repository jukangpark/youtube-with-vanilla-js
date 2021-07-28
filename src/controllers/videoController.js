// 내가 만든 객체를 
// 우리의 template에 보낼 것입니다.
const videos = [
    {
        title: "First Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 1,
        id: 1, 
    },
    {
        title: "Second Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 59,
        id: 2, 
    },
    {
        title: "Third Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 59,
        id: 3, 
    },
];

export const trending = (req, res) => {    
    return res.render("home", { pageTitle: "Home", videos});   
};

export const watch = (req, res) => {
    const { id } = req.params;

    const video = videos[id - 1];
    return res.render("watch", {pageTitle: `Watching ${video.title}`, video});
};

export const getEdit = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1];
    return res.render("edit", {pageTitle:`Editing ${video.title}`, video})
};

export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    videos[id - 1].title = title;
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "UploadVideo"});
};

export const postUpload = (req, res) => {
    console.log(req.body);
    const {title} = req.body;
    const newVideo = {
        title,
        rating: 0,
        comments: 2,
        createdAt: "just now",
        views: 1,
        id: videos.length + 1, 
    };
    videos.push(newVideo);
    // here we will add a video to the videos array.
    return res.redirect("/");
};