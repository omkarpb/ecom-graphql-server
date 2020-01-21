const { PubSub } = require('apollo-server');
import { getCurrentDate } from './utility';

const COMMENT_ADDED = 'COMMENT_ADDED';
const pubsub = new PubSub();
const resolvers = {
  Query: {
    user: async (_, { id }, { db: { User } }) => {
      const user = await User.findById(id);
      return user;
    },
    product: async (_, { id }, { db: { Product } }) => {
      const product = await Product.findById(id).populate({
        path: 'comments',
        populate: { path: 'commentedBy'}
      }).exec();
      return product;
    },
    comment: async (_, { id }, { db: { Comment } }) => {
      const comment = await Comment.findById(id).populate('commentedBy').exec();
      return comment;
    },
    products: async (_, __, { db: { Product } }) => {
      const products = await Product.find({}).populate({
        path: 'comments',
        populate: { path: 'commentedBy'}
      }).exec();
      return products;
    },
    comments: async (_, __, { db: { Comment } }) => {
      const comments = await Comment.find({}).populate('commentedBy').exec();
      return comments;
    },
    users: async (_, __, { db: { User } }) => {
      const users = await User.find({});
      return users;
    },
  },
  User: {
    orders: () => {
      return [];
    }
  },
  // Product: {
  //   comments: (obj) => {
  //     return [];
  //   }
  // },
  // Comment: {
  //   commentedBy: (_, __, { currentUser }) => {
  //     return { name: currentUser.name };
  //   },
  // },
  Mutation: {
    createProduct: async (_, newProduct, { db: { Product } }) => {
      const product = new Product({
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        rating: newProduct.rating,
        seller: newProduct.seller
      });
      await product.save();
      return product;
    },
    createComment: async (_, { message, rating, productId }, { db: { Comment, Product }, currentUser }) => {
      const comment = new Comment({ message, rating, date: getCurrentDate(), commentedBy: currentUser.id});
      const res = await comment.save();
      const product = await Product.findById(productId);
      product.comments.push(comment);
      await product.save();
      pubsub.publish(COMMENT_ADDED, { commentAdded: res });
      return comment;
    },
    createUser: async (_, {name}, { db: { User } }) => {
      const user = new User({name});
      await user.save();
      return user;
    }
  },
  Subscription: {
    commentAdded: {
      subscribe: () => pubsub.asyncIterator([COMMENT_ADDED]),
    },
  },
}

export default resolvers;