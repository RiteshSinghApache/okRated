'use strict';
module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reason_1: DataTypes.STRING,
    reason_2: DataTypes.STRING,
    reason_3: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'feedbacks',
    underscored: true,
    timestamps: true,
  });

  Feedback.associate = (models) => {
    Feedback.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Feedback;
};
