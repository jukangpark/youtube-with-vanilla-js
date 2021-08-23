import User from "../models/User";

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
      errorMessage: "This username/email is already takem.",
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
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See User");

// 나는 이 세 함수를 바깥과 공유하고 싶거든
// export default를 쓰면 한가지 밖에 못 내보냄
// 따라서 각각의 함수에 export를 담아뒀어
