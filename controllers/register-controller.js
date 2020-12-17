const { User } = require("../models/user")

const _ = require("lodash")
const bcrypt = require("bcrypt")
const SALT_FACTOR = 10

const userRegister = async (req, res) => {
  try {
    let name = await User.findOne({ name: req.body.name })
    if (name) {
      return res.status(400).send("Username is already registered.")
    }
    let email = await User.findOne({ email: req.body.email })
    if (email) {
      return res.status(400).send("Email is already registered.")
    } else {
      const user_info = _.pick(req.body, ["name", "email", "password", "admin"])
      if (!user_info.admin) {
        var user = new User({
          ...user_info,
          admin: 0,
        })
      } else {
        var user = new User({
          ...user_info,
        })
      }
      const salt = await bcrypt.genSalt(SALT_FACTOR)
      user.password = await bcrypt.hash(user.password, salt)
      await user.save()
      res.send(_.pick(user, ["_id", "name", "email", "admin"]))
    }
  } catch (err) {
    console.log(err)
    res.status(400).send(`An error has occurred.`)
  }
}

module.exports = {
  registerUser: userRegister,
}
