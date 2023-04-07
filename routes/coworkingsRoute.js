const express = require('express')
const router = express.Router();

let coworkingsController = require('../controllers/coworkingsController')

router 
    .route('/')
    .get(coworkingsController.findAllcoworkings)
    .post(coworkingsController.createCoworkings)



router
    .route('/:id')
    .get(coworkingsController.findCoworkingsByPK)

    .put(coworkingsController.updateCoworkings)

    .delete(coworkingsController.deleteCoworkings)


    
module.exports = router;