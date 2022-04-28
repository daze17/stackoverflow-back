import db from "../../models";

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

export const getQuestions = async (): Promise<question[]> => {
  const questiondata = await db.Question.findAll({
    include: {
      model: db.User,
      through: {
        attributes: [],
      },
    },
    raw: true,
    nest: true,
  });
  const questions = await questiondata.map((question: question) => {
    return {
      ...question,
      status: Boolean(Number(question.status)),
    };
  });
  console.log(questiondata);
  return questions;
};
export const getUserDetail = async (context: any) => {
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
export const getQuestionDetail = async (data: any) => {
  try {
    const questionDatas = await db.Question.findAll({
      where: { id: data.questionId },
      include: {
        model: db.User,
        as: db.User.tableName,
        through: {
          attributes: [],
        },
      },
      raw: true,
      nest: true,
    });
    const _questionRaw = questionDatas.length
      ? questionDatas.reduce((obj: any, item: any) => item)
      : "";
    const questionRaw = {
      ..._questionRaw,
      status: Boolean(Number(_questionRaw.status)),
    };
    return questionRaw;
  } catch (error) {
    console.log(error);
  }
};

export const getAnswers = async (data: any) => {
  try {
    const findAnswers = await db.Comment.findAll({
      where: { QuestionId: data.questionId },
      raw: true
    });
    console.log(findAnswers, 'findAnswers')
    return findAnswers
  } catch (error) {
    console.log(error)
  }
};
