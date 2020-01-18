import mongoose, { Schema } from 'mongoose';

let commentSchema = new mongoose.Schema({
  message: String,
  commentedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  date: String,
  rating: Number
});

let Comment = mongoose.model('Comment', commentSchema);
export default Comment;