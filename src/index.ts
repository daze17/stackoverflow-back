import { ApolloServer, gql } from "apollo-server";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import {
  createUsers,
  createQuestions,
  createQuestionConnection,
} from "./utils";
import jwt from "jsonwebtoken";
import { config } from "../config";
import db from "../models";

// createUsers();
// createQuestions();
// createQuestionConnection();

const getUser = (token: string) => {
  try {
    if (token) {
      const tokenData = jwt.verify(token, config.APP_SECRET);
      return tokenData;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.get("Authorization") || "";
    return { user: getUser(token.replace("Bearer ", "")) };
  },
});

db.sequelize.sync().then(() => {
  server.listen().then(({ url }: { url: string }) => {
    console.log(`Server listening at ${url}`);
  });
});
