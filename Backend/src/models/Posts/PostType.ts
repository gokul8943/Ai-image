import { Document, Schema, Types } from "mongoose";

interface PostInterface extends Document {
  name:string
  prompt:string
  photo:string
}

export default PostInterface;