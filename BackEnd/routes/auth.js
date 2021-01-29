const router = require('express').Router();

const authController = require('../controllers/auth');

const isAuth = require('../middleware/is-auth');

router.post('/signup', authController.postSignup);

router.post('/login', authController.postLogin);

router.post('/logout', isAuth, authController.postLogout);

module.exports = router;