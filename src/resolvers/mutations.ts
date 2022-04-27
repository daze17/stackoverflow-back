import db from "../../models";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import { ApolloError } from "apollo-server";

export const addUserMutation = async (data: any) => {
  const { name, email, password } = data;

  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const duplicatedEmail = await db.User.findAll({
      where: { email },
    });
    if (duplicatedEmail.length) throw new ApolloError("duplicated email");
    const addedUserData = await db.User.create({
      id: uuidv4(),
      name,
      email,
      password: passwordHash,
    });
    console.log(addedUserData.dataValues);
    return true;
  } catch (error) {
    console.log(error);
    throw new ApolloError("system error");
  }
};

export const loginMutation = async (data: any) => {
  try {
    const { email, password } = data;
    const addedUserData = await db.User.findAll({
      where: {
        email,
      },
    }).then((userdata: any) =>
      userdata.map((val: any) => {
        return {
          id: val.id,
          name: val.name,
          email: val.email,
          password: val.password,
        };
      })
    );
    const user = addedUserData.length
      ? addedUserData.reduce((obj: any, item: any) => item)
      : "";
    if (!user) throw new ApolloError("user not found");
    const passwordMatch = await bcrypt.compare(password, user?.password);
    console.log(!passwordMatch);
    if (!passwordMatch) throw new ApolloError("wrong password");
    console.log(user, "user");
    const accessToken = jwt.sign(
      {
        userId: user?.id,
        name: user?.name,
      },
      config.APP_SECRET,
      {
        expiresIn: 7 * 24 * 60 * 60 * 1000,
      }
    );
    console.log(accessToken);
    return { accessToken };
  } catch (error) {
    console.log(error);
    throw new ApolloError("system error");
  }
};

export const addQuestionMutation = async (data: any, context: any) => {
  try {
    const { title, questionBody, tags, status } = data;
    const { user } = context;
    const addQuestion = await db.Question.create({
      title,
      questionBody,
      tags,
      status,
    });
    console.log(addQuestion.dataValues, "hehe");
    const questionConnection = await db.QuestionConnection.create({
      UserId: user.userId,
      QuestionId: addQuestion.dataValues.id,
    });
    console.log(questionConnection.dataValues);
    const questionId = addQuestion.dataValues.id;
    return { questionId };
  } catch (error) {
    console.log(error);
    throw new ApolloError("system error");
  }
};
