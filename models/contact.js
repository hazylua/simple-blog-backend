const Joi = require("joi")
const mongoose = require("mongoose")

const collection_name = "contact_forms"

const formSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    body: {
      // Change later, if using 'Slate'.
      type: String,
      required: true,
    },
  },
  { collection: collection_name }
)

const ContactForm = mongoose.model("ContactForm", formSchema)

const joi_subject_msgs = {
  "any.required": `A subject needs to be provided.`,
  "string.base": `The subject should be of type "text".`,
  "string.empty": `The subject should not be empty.`,
}

const joi_date_msgs = {
  "any.required": `A date needs to be provided.`,
  "date.base": `The date should be a valid "date" type.`,
  "date.empty": `The date should not be empty.`,
}

const joi_email_msgs = {
  "string.base": `The email should be of type "text".`,
  "string.email": `The email needs to be a valid email address.`,
  "string.empty": `The email should not be empty.`,
}

const joi_body_msgs = {
  "any.required": `A contact message needs to be provided.`,
  "string.base": `The contact message should be of type "text".`,
  "string.empty": `The contact message should not be empty.`,
}

const validateForm = bodyForm => {
  const schema = Joi.object({
    subject: Joi.string().required().messages(joi_subject_msgs),
    date: Joi.date().required().messages(joi_date_msgs),
    email: Joi.string().email().messages(joi_email_msgs),
    body: Joi.string().required().messages(joi_body_msgs),
  })
  return schema.validate(bodyForm)
}

exports.ContactForm = ContactForm
exports.validateForm = validateForm
