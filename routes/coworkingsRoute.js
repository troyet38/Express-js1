const express = require('express')
const router = express.Router();

const coworkingsController = require('../controllers/coworkingsController')

const authoContoller = require('../controllers/authController')

router 
    .route('/')
    .get(coworkingsController.findAllcoworkings)
    .post(authoContoller.protect, coworkingsController.createCoworkings)



router
    .route('/:id')
    .get(coworkingsController.findCoworkingsByPK)

    .put(authoContoller.protect,coworkingsController.updateCoworkings)

    .delete(coworkingsController.deleteCoworkings)


    
module.exports = router;