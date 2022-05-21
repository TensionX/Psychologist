const { Router } = require('express');
const router = Router();
const ctrl = require('../controllers/clients');
const ctrlHandler = require('../helpers/controllerHandler');
const guard = require("../helpers/guard");

router.get('/', guard, ctrlHandler(ctrl.getAllClients));
router.post('/', guard, ctrlHandler(ctrl.addClient));
router.post('/delete', guard, ctrlHandler(ctrl.removeClient));

module.exports = router;