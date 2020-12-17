const { ContactForm } = require("../models/contact")

const _ = require("lodash")

const contactSubmit = async (req, res) => {
  try {
    let form = new ContactForm(
      _.pick(req.body, ["subject", "email", "date", "body"])
    )
    await form.save()
    res.send(_.pick(form, ["_id", "email", "date"]))
  } catch (err) {
    console.log(err)
    res.status(400).send(`An error has occurred.`)
  }
}

module.exports = {
  contactSubmit: contactSubmit,
}
