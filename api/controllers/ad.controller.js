const createError = require('http-errors');
const Ad = require('../models/ad.model');

module.exports.list = (req, res, next) => {

  Ad.find().populate('author').then(ad => {
          console.log('datos con author =>');
          console.log(ad);
          res.status(200).json(ad);
          
        })
      .catch(next)
}

module.exports.create = (req, res, next) => {
    req.body.author = req.user.id;
    console.log('new cosa');
    console.log(req.body);

    if (req.file) {
        req.body.image = req.file.url
    }

    Ad.create(req.body)        
        .then(ad => res.status(201).json(ad))
        .catch(next) 
}

module.exports.get = (req, res, next) => {
    Ad.findById(req.params.id)
        .then(ad => {
            if (ad) res.status(200).json(ad)
            else next(createError(404, 'Ad not found'))
        })
        .catch(next)
}

module.exports.delete = (req, res, next) => {
    Ad.findById(req.params.id).then(ad => {
        if(ad.author === req.user.id)
            Ad.findByIdAndDelete(req.params.id)
            .then(ad => {
                if (ad) res.status(204).end();
                else next(createError(403, 'Forbidden'))
            })
            .catch(next)
    });
}

module.exports.update = (req, res, next) => {
    const { id } = req.params;

    Ad.findByIdAndUpdate(id, req.body, {new: true})
        .then(ad => {
            if(ad) res.status(200).json(ad);
            else next(createError(404, 'Ad not found'))
        });
}
