import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';

import resolvers from './src/resolver';
import schema from './src/schema';
import Product from './src/models/products.model';
import Comment from './src/models/comments.model';
import User from './src/models/users.model';

const app = express();
app.use(cors());

mongoose.connect("mongodb://localhost/ecomDB");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to Mongodb");
});

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    currentUser: {
      id: '5e22b1f8654c95ca2066b8f0'
    },
    db: {
      Product,
      Comment,
      User
    }
  }
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 5000 }, () => {
  console.log('Apollo Server on http://localhost:5000/graphql');
});
