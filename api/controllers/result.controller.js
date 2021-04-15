const createError = require('http-errors');
const Result = require('../models/result.model');

module.exports.resultList = (req, res, next) => {

  const criteria = {}

  if(req.query.type){
    criteria.type = req.query.type;
  }

  Result.find(criteria)
      .then(result => res.status(201).json(result))
      .catch(next)
}

module.exports.create = (req, res, next) => {
    Result.create(req.body)
        .then(result => res.status(201).json(result))
        .catch(next) 
}

module.exports.get = (req, res, next) => {
    Result.findById(req.params.id)
        .then(result => res.status(200).json(result))
        .catch(next)
}

module.exports.delete = (req, res, next) => {
    Result.findByIdAndDelete(req.params.id)
        .then(result => res.status(204).end())
        .catch(next)
}

module.exports.update = (req, res, next) => {
    const { id } = req.params;

    Result.findByIdAndUpdate(id, req.body, {new: true})
        .then(result => res.status(202).json(result))
        .catch(next)
}