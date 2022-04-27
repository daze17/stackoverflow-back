import db from "../../models";
import jwt from "jsonwebtoken";
import { get } from "lodash";
import { config } from "../../config";

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

const getHttpToken = (context: any) => {
  const authorization = get(context, "req.headers.authorization");
  if (authorization) return authorization.replace("Bearer ", "");
  return null;
};

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

export const getQuestions = async (): Promise<question[]> => {
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
export const getUserDetail = async (context: any) => {
  // const token = getHttpToken(context);
  try {
    const { user } = context;
    console.log(context.user, "user data");
    const userdata = await db.User.findAll({
      where: { id: user.userId },
      include: {
        model: db.Question,
        through: {
          attributes: [],
        },
      },
    });
    const userdetailArr = await userdata.map((user: user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        questions: user.Questions,
      };
    });
    const userdetail = userdetailArr.length
      ? userdetailArr.reduce((obj: any, item: any) => item)
      : "";
    console.log(userdetail);
    return userdetail;
  } catch (error) {
    console.log(error);
  }
};
