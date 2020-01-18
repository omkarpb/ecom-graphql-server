import mongoose, { Schema } from 'mongoose';

let userSchema = new mongoose.Schema({
  name: String,
  orders: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

let User = mongoose.model('User', userSchema);
export default User;