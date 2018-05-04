const bcrypt = require("bcryptjs");

const CreateValidator = require("../validations/users/create");

const User = require("../models/User");

exports.get = (req, res, next) => {
  res.json({ success: true, request: req.query });
};

exports.create = (req, res, next) => {
  const { errors, isValid } = CreateValidator(req.body);

  if (!isValid) {
    next({ status: 422, message: errors });
    return;
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        next({ status: 422, message: `${req.body.email} already exsits` });
        return;
      }

      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            next(err);
            return;
          }

          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => next(err));
        });
      });
    })
    .catch(err => next(err));
};
