// TODO: 

module.exports.checkExists = (req, res, next) => {
    // buscar ad en db

    // no existe 404

    // existe,  req.found  foundAdd = result
    // después next

    //if (req.isAuthenticated() && req.session.secondFactor) { disable 2FA ;)
    if (req.isAuthenticated()) {
      next();
    } else {
      next(createError(401, 'user is not authenticated'))
    }
    
};