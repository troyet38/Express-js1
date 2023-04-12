const express = require('express')
const router = express.Router();

const UserController = require('../controllers/UserController')

router 
    .route('/')
    .get(UserController.findAllcoworkings)
    



// router
//     .route('/:id')
//     .get(coworkingsController.findCoworkingsByPK)

//     .put(coworkingsController.updateCoworkings)

//     .delete(coworkingsController.deleteCoworkings)


    
module.exports = router;