import cors from 'cors';
import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';

import resolvers from './src/resolver';
import schema from './src/schema';
import Product from './src/models/products.model';
import Comment from './src/models/comments.model';
import User from './src/models/users.model';

const PORT = 5000;
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
  tracing: true,
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

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})