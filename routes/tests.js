const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/tests');
const ctrlHandler = require('../helpers/controllerHandler');
const guard = require("../helpers/guard");

router.get('/all', guard, ctrlHandler(ctrl.getAllTests));
router.post('/add', guard, ctrlHandler(ctrl.addTest));
router.post('/edit', guard, ctrlHandler(ctrl.editTest));
router.post('/remove', guard, ctrlHandler(ctrl.removeTest));
router.post('/assign', guard, ctrlHandler(ctrl.assignTest));
router.post('/getActive', guard, ctrlHandler(ctrl.getActiveTest));
router.post('/answerActive', guard, ctrlHandler(ctrl.answerActiveTest));
router.post('/clientTests', guard, ctrlHandler(ctrl.clientTests));
router.post('/clientTestComment', guard, ctrlHandler(ctrl.clientTestComment));

module.exports = router;