const Joi = require("joi")
const mongoose = require("mongoose")

const lenMin = 4
const lenMax = 255

const collection_name = "users"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: lenMin,
      maxlength: lenMax,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      minlength: lenMin,
      maxlength: lenMax,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: lenMin,
      maxlength: lenMax,
    },
    admin: {
      type: Boolean,
    },
  },
  { collection: collection_name }
)

const User = mongoose.model("User", userSchema)

const joi_name_msgs = {
  "any.required": `An user name is required.`,
  "string.base": `The user name should be of type "text".`,
  "string.empty": `The user name should not be empty.`,
  "string.max": `The user name should be at most ${lenMax} characters long.`,
  "string.min": `The user name should be at least ${lenMin} characters long.`,
}

const joi_email_msgs = {
  "any.required": `An email is required.`,
  "string.base": `The email should be of type "text".`,
  "string.email": `The email needs to be a valid email address.`,
  "string.empty": `The email should not be empty.`,
  "string.max": `The email must be at most ${lenMax} characters long.`,
  "string.min": `The email must be at least ${lenMin} characters long.`,
}

const joi_pw_msgs = {
  "any.required": `A password is required.`,
  "string.base": `The password should be of type "text".`,
  "string.empty": `The password should not be empty.`,
  "string.max": `The password must be at most ${lenMax} characters long.`,
  "string.min": `The password must be at least ${lenMin} characters long.`,
}

const joi_admin_msgs = {
  "boolean.base": `The "admin" value provided needs to be a boolean value.`,
}

const validateUserRegister = body => {
  const schema = Joi.object({
    name: Joi.string()
      .min(lenMin)
      .max(lenMax)
      .required()
      .messages(joi_name_msgs),
    email: Joi.string()
      .min(lenMin)
      .max(lenMax)
      .required()
      .email()
      .messages(joi_email_msgs),
    password: Joi.string()
      .min(lenMin)
      .max(lenMax)
      .required()
      .messages(joi_pw_msgs),
    admin: Joi.boolean().messages(joi_admin_msgs),
  })
  return schema.validate(body)
}

const validateUserLogin = body => {
  const schema = Joi.object({
    email: Joi.string()
      .min(lenMin)
      .max(lenMax)
      .required()
      .email()
      .messages(joi_email_msgs),
    password: Joi.string()
      .min(lenMin)
      .max(lenMax)
      .required()
      .messages(joi_pw_msgs),
  })

  return schema.validate(body)
}

exports.User = User
exports.validateUserRegister = validateUserRegister
exports.validateUserLogin = validateUserLogin
