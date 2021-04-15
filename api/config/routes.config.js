const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.middleware');
const users = require('../controllers/users.controller');
const ads = require('../controllers/ad.controller');
const messages = require('../controllers/message.controller');
const results = require('../controllers/result.controller');

// users
router.get('/userList', secure.isAuthenticated, users.list);
router.post('/users', users.create);
router.get('/users/:id', secure.isAuthenticated, users.get);
router.get('/receivedMessages/:id', secure.isAuthenticated, users.receivedMessages);
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

// message
router.get('/messagesList/:userId', secure.isAuthenticated, messages.list);
router.post('/messages',  secure.isAuthenticated, messages.create);
router.get('/messages/:id', secure.isAuthenticated, messages.get);
router.delete('/messages/:id', secure.isAuthenticated, messages.delete);
router.patch('/messages/:id', secure.isAuthenticated, messages.update);

// result
router.get('/resultList/:id', secure.isAuthenticated, results.resultList);
router.post('/results',  secure.isAuthenticated, results.create);
router.get('/results/:id', secure.isAuthenticated, results.get);
router.delete('/results/:id', secure.isAuthenticated, results.delete);
router.patch('/results/:id', secure.isAuthenticated, results.update);

module.exports = router;
