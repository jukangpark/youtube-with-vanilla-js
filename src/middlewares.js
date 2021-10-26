const multer = require("multer");

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  // 이 값이 False 이거나 undefined일 수도 있으니 Boolean을 사용
  res.locals.loggedInUser = req.session.user || {};
  next();

  // next 를 호출하지 않으면 웹사이트가 work하지 않을거야.
  // pug template 에서 locals에 접근할 수 있다.
  // pug랑 Expresss가 서로 locals를 공유할 수 있도록 설정되어있다.
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Log in first");
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 3000000,
  },
});

export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 10000000,
  },
});
