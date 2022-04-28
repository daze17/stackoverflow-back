"use strict";
import { Model } from "sequelize";

interface CommentConnectionAttributes {
  CommentId: string;
  UserId: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class CommentConnection
    extends Model<CommentConnectionAttributes>
    implements CommentConnectionAttributes
  {
    CommentId!: string;
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
  CommentConnection.init(
    {
      CommentId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Comments",
          key: "id",
        },
      },
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "CommentConnection",
    }
  );
  return CommentConnection;
};
