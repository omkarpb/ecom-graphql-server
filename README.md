# ECOM-graphql-server

This is tutorial project for understanding concepts of graphql and apollo library. This also uses mongodb database and mongoose as ODM. So before running make sure that you are running `mongod` instance.

## How to run?

1. `npm install`
1. `npm start` : This will start graphql server on port `5000`. You can test your queries on this URL `http://localhost:5000/graphql`.

## Sample Queries

Following are sample queries and mutations that you use to create objects and query the result.

```javascript
mutation CreateProduct($name: String!, $description: String, $price: Float!, $rating: Float, $seller: String) {
	createProduct(name: $name, description: $description, price: $price, rating: $rating, seller: $seller) {
    name
    description
    price
    rating
    seller
  }
}

mutation CreateComment($message: String!, $rating: Float!, $productId: ID!) {
  createComment(message: $message, rating: $rating, productId: $productId) {
    message
    rating
    date
  }
}

mutation CreateUser($name: String!) {
	createUser(name: $name) {
    id
    name
    orders {
      name
    }
  }  
}
query GetProducts {
  products {
    ...productDetails
  }
}

query GetProduct {
  product(id:"5e22b53720fc40ca95d280cd") {
    ...productDetails
  }
}

query GetComments {
  comments {
    ...commentDetails
  }
}

query GetUsers {
  users {
    name
    id
    orders {
      name
    }
  }
}

fragment productDetails on Product {
  id
  name
  description
  price
  rating
  seller
  comments {
    message
    date
    rating
    commentedBy {
      name
    }
  }
}

fragment commentDetails on Comment {
  id
  message
  rating
  date
  commentedBy {
    name
  }
}
```