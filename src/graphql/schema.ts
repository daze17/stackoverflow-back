const { gql } = require("apollo-server");

export const typeDefs = gql`
  scalar Date

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
    tags: String
    status: Boolean
    createdAt: Date
    updatedAt: Date
    questionBody: String
    Users: User
  }
  type Login {
    accessToken: String
  }
  type askQuestion {
    questionId: Int
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
  input QuestionInput {
    userId: String
    title: String!
    questionBody: String!
    tags: String
    status: Boolean
  }
  input questionDetailInput {
    questionId: Int
  }

  type Query {
    me: User
    users: [User]
    questions: [Question]
    questionDetail(input: questionDetailInput): Question
  }
  type Mutation {
    addUser(input: UserInput): Boolean
    login(input: LoginInput): Login
    addQuestion(input: QuestionInput): askQuestion
  }
`;
