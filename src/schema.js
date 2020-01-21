import gql from 'graphql-tag'

const schema = gql`
  type Query {
    products: [Product]
    users: [User]
    comments: [Comment]
    product(id: ID!): Product
    comment(id: ID!): Comment,
    user(id: ID!): User,
  }
  type Product {
    id: ID!
    name: String!,
    description: String,
    price: Float!,
    rating: Float,
    seller: String,
    comments: [Comment]
  }
  type Comment {
    id: ID!,
    message: String,
    rating: Float!,
    date: String,
    commentedBy: User!
  }
  type User {
    id: ID!,
    name: String!,
    orders: [Product]
  }
  type Mutation {
    createProduct(name: String!, description: String, price: Float!, rating: Float, seller: String): Product!,
    createUser(name: String!): User!,
    createComment(message: String, rating: Float!, productId: ID!): Comment!
  }
  type Subscription {
    commentAdded(channelId: ID!): Comment
  }
`;

export default schema;