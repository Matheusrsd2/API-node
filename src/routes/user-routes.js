const express = require('express')
var router = express.Router(); //interceptação das rotas
const userController = require('../controllers/user-controllers');

//POST
router.post("/", userController.post);
router.post("/auth", userController.login);

//GET ALL
router.get("/", userController.getAll);

//GET BY ID
router.get("/:userId", userController.getById);

router.put("/:userId", userController.put);

router.delete("/:userId", userController.delete);

module.exports = router;