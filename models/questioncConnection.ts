"use strict";
import { Model } from "sequelize";

interface QuesttionConnectionAttributes {
  QuestionId: number;
  UserId: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class QuestionConnection
    extends Model<QuesttionConnectionAttributes>
    implements QuesttionConnectionAttributes
  {
    QuestionId!: number;
    UserId!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  QuestionConnection.init(
    {
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
      QuestionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Questions",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "QuestionConnection",
    }
  );
  return QuestionConnection;
};
