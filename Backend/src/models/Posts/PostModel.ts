import mongoose, { model, Schema } from "mongoose";
import PostInterface from "./PostType";

const PostSchema = new Schema<PostInterface>({
  name:{
    type:String,
    required:true
  },
  prompt:{
    type:String,
    required:true
  },
  photo:{
    type:String,
    required:true
  }
})
const Post = model<PostInterface>('Post', PostSchema);

export default Post;
