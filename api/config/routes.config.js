const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.middleware');
const users = require('../controllers/users.controller');
const ads = require('../controllers/ad.controller');

// users
router.get('/userList', secure.isAuthenticated, users.list);
router.post('/users', users.create);
router.get('/users/:id', secure.isAuthenticated, users.get);
router.get('/profile/:id', secure.isAuthenticated, users.profile);
router.delete('/users/:id', secure.isAuthenticated, users.delete);
router.patch('/users/:id', secure.isAuthenticated, users.update);
router.post('/login', users.login)
router.post('/logout', users.logout)
router.post('/totp', users.totp)


// ad
router.get('/ads', secure.isAuthenticated, ads.list);
router.post('/ads',  secure.isAuthenticated, ads.create);
router.get('/ads/:id', secure.isAuthenticated, ads.get);
router.delete('/ads/:id', secure.isAuthenticated, ads.delete);
router.patch('/ads/:id', secure.isAuthenticated, ads.update);

module.exports = router;
