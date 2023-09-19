import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  email: String,
  password: String,
  location: {
    type: String,
    default: "My location",
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  avatar: String,
  avatarPublicId: String,
});

//To get the user without password
UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
