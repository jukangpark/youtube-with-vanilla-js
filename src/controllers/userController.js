import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";
import { response } from "express";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  console.log(req.body);
  const { name, username, email, password, password2, location } = req.body;
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "Password confirmation does not match.",
      // return 을 꼭 작성해줘야 이 뒤에 실행 되는 문장들을 실행되지 않게 해줄 수 있습니다.
      // 그걸 꼭 기억해야함.
    });
  }
  const exists = await User.exists({ $or: [{ username }, { email }] });
  //mongodb/operator/query/or $or
  if (exists) {
    return res.status(400).render("join", {
      //400 Bad Request: 이건 클라이언트에서 발생한 에러 때문에 요청을 처리하지 못할때 쓰면 됨.
      pageTitle: "Join",
      errorMessage: "This username/email is already taken.",
    });
  }
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: error._message,
    });
  }
};
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  // check if account exists
  const { username, password } = req.body;
  const pageTitle = "Login";
  //const exists = await User.exists({ username }); user를 두번 찾기 때문에 삭제
  const user = await User.findOne({ username, socialOnly: false });
  //!exists 대신 !user
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exists.",
    });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password",
    });
  }
  // check if password correct
  console.log("LOG USER IN! COMING SOON");
  req.session.loggedIn = true;
  req.session.user = user;
  // 이 두 줄이 우리가 실제로 세션을 initialize(초기화) 하는 부분인거지.
  // 이렇게 하면 세션에 정보를 추가 하는 거야.

  // session 에 saveUninitialized: false 로 설정하면 세션을 수정할 때만
  // 세션을 db에 저장하고 쿠키를 넘겨주는 것이다.
  // req.session.loggedIn 에 true 라는 값을 주었기 때문에 우리는 현재 이 두 줄로
  // 세션을 수정하고 있는 것이다.

  return res.redirect("/");
};

export const StartGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: { Accept: "application/json" },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    console.log(userData);
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        name: userData.name,
        avatarUrl: userData.avatar_url,
        username: userData.login,
        email: emailObj.email,
        password: "",
        socialOnly: true,
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
    // create an account
  } else {
    return res.redirect("/login");
  }
};

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See User");

// 나는 이 세 함수를 바깥과 공유하고 싶거든
// export default를 쓰면 한가지 밖에 못 내보냄
// 따라서 각각의 함수에 export를 담아뒀어
