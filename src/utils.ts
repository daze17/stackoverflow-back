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

interface question {
  id: number;
  title: string;
  question: string;
  status: boolean;
}

interface user {
  id: string;
  name: string;
  email: string;
  password: string;
  Questions: question[];
}

export const getUsers = async (): Promise<user[]> => {
  const userdata = await db.User.findAll({
    include: {
      model: db.Question,
      through: {
        attributes: [],
      },
    },
  });
  const users = await userdata.map((user: user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      questions: user.Questions,
    };
  });
  console.log(users);
  return users;
};

export const getQuestions = async (): Promise<user[]> => {
  const questiondata = await db.Question.findAll();
  const questions = await questiondata.map((question: question) => {
    return {
      id: question.id,
      title: question.title,
      status: Boolean(Number(question.status)),
    };
  });
  console.log(questions);
  return questions;
};
