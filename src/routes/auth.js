const express = require('express');
const controller = require('../controllers/userController');

const router = express.Router();

router.post('/user/login', controller.login);
router.post('/user/signup', controller.signup);
router.post('/user/authenticate', controller.auth);

router.all('/*', (request, response) => {
    response.status(404).end(JSON.stringify({
        status: "error",
        message: "page not found"
    }));
});

module.exports = router;