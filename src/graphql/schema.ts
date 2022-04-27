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

  input UserInput {
    name: String
    email: String
    password: String
  }
  input LoginInput {
    email: String!
    password: String!
  }
  input QuestionInput{
    userId: String
    title: String!
    questionBody: String!
    tags: String
    status: Boolean
  }
  type Login {
    accessToken: String
  }
  type askQuestion {
    questionId: String
  }

  type Query {
    users: [User]
    questions: [Question]
    me: User
  }
  type Mutation {
    addUser(input: UserInput): Boolean
    login(input: LoginInput): Login
    addQuestion(input: QuestionInput): askQuestion
  }
`;
