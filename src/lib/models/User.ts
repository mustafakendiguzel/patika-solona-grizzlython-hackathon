import mongoose, { models, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  userName: string;
  password: string;
}

// Creating user schema
const UserSchema: Schema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Exporting module to allow it to be imported in other files

export default (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);
