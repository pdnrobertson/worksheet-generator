const express = require("express");
const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
const cors = require("cors");

// Import schema and resolvers
const typeDefs = require("./graphql/schemas/index");
const resolvers = require("./graphql/resolvers/index");

// Create application with express
const app = express();

// Allow cross-origin requests
app.use(cors());

app.use(
  expressJWT({
    secret: "supersecretawesomecode",
    credentialsRequired: false
  })
);

// Create Apollo Server with schema, resolvers and context
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    user: req.user
  })
});

server.applyMiddleware({ app, bodyParser });

const PORT = process.env.PORT || 4000;

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-genm8.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
    // After setting up in MongoDB Atlas. Env variables come from nodemon.json
  )
  .then(() => {
    app.listen(PORT, () =>
      // eslint-disable-next-line no-console
      console.log(`Server is now running on Port ${PORT}`)
    );
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.log("Not connected to Database ERROR!", err);
  });
