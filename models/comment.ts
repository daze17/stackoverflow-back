"use strict";
import { Model } from "sequelize";

interface CommentAttributes {
  id: string;
  commentBody: string;
  vote: number;
  QuestionId: number;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Comment extends Model<CommentAttributes> implements CommentAttributes {
    id!: string;
    commentBody!: string;
    vote!: number;
    QuestionId!: number;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Comment.belongsTo(models.Question);
      // Comment.belongsTo(models.User);
    }
  }
  Comment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      commentBody: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      vote: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      QuestionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Questions",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
