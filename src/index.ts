import { ApolloServer, gql } from "apollo-server";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import {
  createUsers,
  createQuestions,
  createQuestionConnection,
  getUsers,
} from "./utils";
import db from "../models";

// createUsers();
// createQuestions();
// createQuestionConnection();

const server = new ApolloServer({ typeDefs, resolvers });

db.sequelize.sync().then(() => {
  server.listen().then(({ url }: { url: string }) => {
    console.log(`Server listening at ${url}`);
  });
});
