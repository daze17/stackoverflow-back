import {
  getQuestions,
  getUserDetail,
  getUsers,
  getQuestionDetail,
  getAnswers,
} from "../resolvers/queries";
import {
  addUserMutation,
  loginMutation,
  addQuestionMutation,
  addCommentMutation,
} from "../resolvers/mutations";

export const resolvers = {
  Query: {
    me: async (_: any, {}, context: any) => getUserDetail(context),
    users: async () => getUsers(),
    questions: async () => getQuestions(),
    questionDetail: async (_: any, { input }: any) => getQuestionDetail(input),
    // getQuestions: async ( )
    answer: async (_: any, { input }: any) => getAnswers(input),
  },
  Mutation: {
    addUser: async (_: any, { input }: any) => addUserMutation(input),
    login: async (_: any, { input }: any) => loginMutation(input),
    addQuestion: async (_: any, { input }: any, context: any) =>
      addQuestionMutation(input, context),
    addComment: async (_: any, { input }: any, context: any) =>
      addCommentMutation(input, context),
  },
};
