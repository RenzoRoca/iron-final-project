const createError = require('http-errors');
const User = require('../models/user.model');
const Message = require('../models/message.model');
const passport = require('passport');

module.exports.list = (req, res, next) => {

  const criteria = {}

  if(req.query.type){
    criteria.type = req.query.type;
  }

  User.find(criteria)
      .then(user => res.status(201).json(user))
      .catch(next)
}

module.exports.create = (req, res, next) => {
    User.create(req.body)
        .then(user => res.status(201).json(user))
        .catch(next) 
}

module.exports.get = (req, res, next) => {
    User.findById(req.params.id)
        .then(user => res.status(200).json(user))
        .catch(next)
}

module.exports.delete = (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => res.status(204).end())
        .catch(next)
}

module.exports.profile = (req, res, next) => {
  User.findById(req.params.id)
      .then(user => {
        if(req.params.id === user.id){
          res.status(200).json(user);
        }else {
          next(createError(403, 'Forbidden'));
        }
      })      
}

module.exports.update = (req, res, next) => {
    const { id } = req.params;

    User.findByIdAndUpdate(id, req.body, {new: true})
        .then(user => res.status(202).json(user))
        .catch(next)
}

module.exports.totp = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next(createError(401, 'user is not authenticated'))
    }

    if (totp(req.user.totpSecret) === req.body.totp) {
        req.session.secondFactor = true
        return res.json(req.user)
    }

    next(createError(400, 'invalid TOTP'))
}

module.exports.receivedMessages = (req, res, next) => {

  User.find(req.user.id).populate({
    path: 'message',
    match: { 
      match: { mention: { $eq: req.user.id } }
    }})
    .then(userMessages => {
      if (userMessages) {
        Message.find()
        res.status(200).json(userMessages)
      } else {
        next(createError(404, 'Ad not found'));
      } 
    }).catch(next)
}

module.exports.logout = (req, res, next) => {
  req.logout();

  res.status(204).end()
}

module.exports.login = (req, res, next) => {
  passport.authenticate('local-auth', (error, user, validations) => {
    if (error) {
      next(error);
    } else if (!user) {
      next(createError(400, 'Invalid credentials'))
    } else {
      req.login(user, error => {
        if (error) next(error)
        else {
            res.json(user)
        }
      })
    }
  })(req, res, next);
};

module.exports.loginWithGoogle = (req, res, next) => {
  const passportController = passport.authenticate('google-auth', (error, user, validations) => {
    if (error) {
      next(error);
    } else {
      req.login(user, error => {
        if (error) next(error)

        else res.redirect(`${process.env.WEB_URL}/authenticate/google/cb`)
      })
    }
  })
  
  passportController(req, res, next);
}