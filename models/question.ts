"use strict";
import { Model } from "sequelize";

interface QuesttionAttributes {
  id: number;
  title: string;
  questionBody: string;
  tags: string;
  status: boolean;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Question
    extends Model<QuesttionAttributes>
    implements QuesttionAttributes
  {
    id!: number;
    title!: string;
    questionBody!: string;
    status!: boolean;
    tags!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Question.belongsToMany(models.User, {
        through: "QuestionConnections",
      });
    }
  }
  Question.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      questionBody: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tags: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Question",
    }
  );
  return Question;
};
