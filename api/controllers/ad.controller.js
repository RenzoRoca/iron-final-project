const createError = require('http-errors');
const Ad = require('../models/ad.model');

module.exports.list = (req, res, next) => {

  const criteria = {}

  if(req.query.type){
    criteria.type = req.query.type;
  }

  Ad.find(criteria)
      .then(ad => res.status(201).json(ad))
      .catch(next)
}

module.exports.create = (req, res, next) => {
    Ad.create(req.body)
        .then(ad => res.status(201).json(ad))
        .catch(next) 
}

module.exports.get = (req, res, next) => {
    Ad.findById(req.params.id)
        .then(ad => res.status(200).json(ad))
        .catch(next)
}

module.exports.delete = (req, res, next) => {
    Ad.findByIdAndDelete(req.params.id)
        .then(ad => res.status(204).end())
        .catch(next)
}

module.exports.update = (req, res, next) => {
    const { id } = req.params;

    Ad.findByIdAndUpdate(id, req.body, {new: true})
        .then(ad => res.status(202).json(ad))
        .catch(next)
}
