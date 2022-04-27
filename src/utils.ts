import db from "../models";
import { users } from "../seeders/usersSeed";
import { questions } from "../seeders/questionsSeed";
import { questionConnections } from "../seeders/questionConnectSeed";

export const createUsers = () => {
  users.map((user) => {
    db.User.create(user);
  });
};
export const createQuestions = () => {
  questions.map((question) => {
    db.Question.create(question);
  });
};
export const createQuestionConnection = () => {
  questionConnections.map((qConnection) => {
    db.QuestionConnection.create(qConnection);
  });
};