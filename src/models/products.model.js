import mongoose, { Schema } from 'mongoose';

let productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  rating: Number,
  seller: String,
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

let Product = mongoose.model('Product', productSchema);
export default Product;