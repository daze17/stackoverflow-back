const { gql } = require("apollo-server");

export const typeDefs = gql`
  type User {
    id: String
    name: String
    email: String
    password: String
    questions: [Question]
  }

  type Question {
    id: Int
    title: String
    status: Boolean
    user: [User]
  }

  type Query {
    users: [User]
    questions: [Question]
  }
`;
