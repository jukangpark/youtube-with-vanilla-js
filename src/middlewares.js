export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  // 이 값이 False 이거나 undefined일 수도 있으니 Boolean을 사용
  console.log(res.locals);
  res.locals.loggedInUser = req.session.user;
  next();

  // next 를 호출하지 않으면 웹사이트가 work하지 않을거야.
  // pug template 에서 locals에 접근할 수 있다.
  // pug랑 Expresss가 서로 locals를 공유할 수 있도록 설정되어있다.
};
