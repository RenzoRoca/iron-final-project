const createError = require('http-errors');
const Message = require('../models/message.model');
const User = require('../models/user.model');

module.exports.list = (req, res, next) => {

    Message.find({ mention: req.params.id})
        .then(message => {
            if (message) res.status(200).json(message)
            else next(createError(404, 'Messages not found'))
    })
    .catch(next)

  /*
  if(req.query.type){
    criteria.type = req.query.type;
  }

  Message.find(criteria)
      .then(message => res.status(201).json(message))
      .catch(next)
  */
}

module.exports.create = (req, res, next) => {
    req.body.author = req.user.id;
    Message.create(req.body)
        .then(message => {

            if(message) {
                User.findOne({ _id: message.mention })
                    .then(user => {
                        User.updateOne({ _id: message.mention }, { $push: { messages: message } }, { new: true }).then(user => {
                            if (!user) {
                                next(httpError(404, 'Invalid user'))
                            } else {
                                res.status(201).json(message)
                            }
                        }).catch(next);
                    })
            }
        })
        .catch(next) 
}

module.exports.get = (req, res, next) => {
    Message.findById(req.params.id)
        .then(message => {
            if (message) res.status(200).json(message)
            else next(createError(404, 'Message not found'))
        })
        .catch(next)
}

module.exports.delete = (req, res, next) => {
    Message.findById(req.params.id).then(message => {
        if(message.author === req.user.id)
            message.findByIdAndDelete(req.params.id)
            .then(message => {
                if (message) res.status(204).end();
                else next(createError(403, 'Forbidden'))
            })
            .catch(next)
    });
}

module.exports.update = (req, res, next) => {
    const { id } = req.params;

    Message.findByIdAndUpdate(id, req.body, {new: true})
        .then(message => {
            if(message) res.status(200).json(message);
            else next(createError(404, 'Message not found'))
        });
}
