const express = require('express')
const router = express.Router();

const UserController = require('../controllers/UserController')
const authoContoller = require('../controllers/authController')
router 
    .route('/')
    .get(UserController.findAllcoworkings)
    



router
    .route('/login')
    .post(authoContoller.login)




    
module.exports = router;