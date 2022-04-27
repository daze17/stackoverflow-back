import { getQuestions, getUserDetail, getUsers } from "../resolvers/queries";
import {
  addUserMutation,
  loginMutation,
  addQuestionMutation,
} from "../resolvers/mutations";

export const resolvers = {
  Query: {
    users: async () => getUsers(),
    questions: async () => getQuestions(),
    me: async (_: any, {}, context: any) => getUserDetail(context),
  },
  Mutation: {
    addUser: async (_: any, { input }: any) => addUserMutation(input),
    login: async (_: any, { input }: any) => loginMutation(input),
    addQuestion: async (_: any, { input }: any, context: any) =>
      addQuestionMutation(input, context),
  },
};
