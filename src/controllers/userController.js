import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  console.log(req.body);
  const { name, username, email, password, password2, location } = req.body;
  if (password !== password2) {
    return res.render("join", {
      pageTitle,
      errorMessage: "Password confirmation does not match.",
    });
  }
  const exists = await User.exists({ $or: [{ username }, { email }] });
  //mongodb/operator/query/or $or
  if (exists) {
    return res.render("join", {
      pageTitle: "Join",
      errorMessage: "This username/email is already takem.",
    });
  }
  await User.create({
    name,
    username,
    email,
    password,
    location,
  });
  return res.redirect("/login");
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See User");

// 나는 이 세 함수를 바깥과 공유하고 싶거든
// export default를 쓰면 한가지 밖에 못 내보냄
// 따라서 각각의 함수에 export를 담아뒀어
