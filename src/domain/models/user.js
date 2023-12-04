'use strict';

const { Model } = require('sequelize');

// Third-party packages
const bcrypt = require('bcrypt')

// Custom packages
const sendVerificationEmail = require('../../infrastructure/external-services/emailService');
const helper = require('../../app/middlewares/helper')


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations here

      User.hasOne(models.Profile, {
        as: 'profile',
        foreignKey: 'user_id',
      });

      User.hasOne(models.User_role, {
        as: 'user_role',
        foreignKey: 'user_id'
      });

      User.belongsTo(models.Tenant, {
        as: 'tenant',
        foreignKey: 'tenant_id'
      });

      User.belongsTo(models.Role, {
        as: 'role',
        foreignKey: 'role_id',
      });
      
    }

  }

  User.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_no: DataTypes.STRING, 
      password: DataTypes.STRING,
      type: DataTypes.STRING,
      verification_code: DataTypes.STRING,
      status: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
      tableName: 'users',
      hooks: {
        /*
        * Logic hooks for the User table are define here
        */

        // hash password before saving to the database
        beforeSave: async (user) => {
          if(user.changed('password')){
            user.password = bcrypt.hashSync(user.password, 10);
          }

          // Only generate verification code if not already present
          if(!user.verification_code){
            user.verification_code = await helper.generateVerificationCode();

            // Check if the email sending is successful before saving
            const emailProcessFeedBack = await sendVerificationEmail(user.email, user.firstname, user.verification_code);
            console.log(emailProcessFeedBack)

            if(!emailProcessFeedBack){
              throw new Error("System had issues while process request");
            }

          }

        },

      }
    }
  );

  return User;
};
