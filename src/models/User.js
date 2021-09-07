import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  username: { type: String, required: true, unique: true },
  password: { type: String },
  socialOnly: { type: Boolean, default: false },
  name: { type: String, required: true },
  location: String,
});

userSchema.pre("save", async function () {
  console.log("Users password:", this.password);
  // 여기서 this.password는 유저가 입력한 password를 말합니다.
  this.password = await bcrypt.hash(this.password, 5);
  console.log("Hashed password", this.password);
});

const User = mongoose.model("User", userSchema);

export default User;
