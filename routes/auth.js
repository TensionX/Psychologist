const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/auth');
const ctrlHandler = require('../helpers/controllerHandler');

router.post('/signup', ctrlHandler(ctrl.signup));
router.post('/signin', ctrlHandler(ctrl.signin));
router.get('/refreshSession', ctrlHandler(ctrl.checkSession));
router.post('/logout', ctrlHandler(ctrl.logout));

module.exports = router;
