import { getQuestions, getUsers } from "../utils";

export const resolvers = {
  Query: {
    users: async () => getUsers(),
    questions: async () => getQuestions(),
  },
};
