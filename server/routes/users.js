var express = require('express');
var router = express.Router();
var usersControllers = require("../controllers/usersControllores");

//ruta base http://localhost:3000/users
router.post('/createuser', usersControllers.createUser);
router.post('/login', usersControllers.login);
router.get('/oneuser/:id', usersControllers.oneUser);

module.exports = router;
