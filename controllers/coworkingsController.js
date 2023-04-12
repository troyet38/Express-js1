let coworkings = require('../appCoworkings')
const { Coworking1 } = require('../db/sequelize')
const { Op, UniqueConstraintError, ValidationError } = require('sequelize');

exports.findAllcoworkings = (req, res) => {
  
  if(req.query.search){
    // notre recherche avec paramètres

    Coworking1.findAll({ where: { name: {[Op.like] : `%${req.query.search}%`} } })
    .then((elements)=>{
        if(!elements.length){
            return res.json({message: "Aucun coworking ne correspond à votre recherche"})    
        }
        const msg = 'La liste des coworkings a bien été récupérée en base de données.'
        res.json({message: msg, data: elements})
    })
    .catch((error) => {
        const msg = 'Une erreur est survenue.'
        res.status(500).json({message: msg})
    })
  } else {
    Coworking1.findAll()
      .then((elements) => {
        const msg ='la liste des coworkings a bien été recupérer en base de données'
        res.json({message:msg,data:elements})

      })
      .catch((error)=> {
        const msg='une erreur est survenue'
        res.json( {message : msg})
      })  
  }
  
}

exports.findCoworkingsByPK = (req, res) => {

 
  Coworking1.findByPk(req.params.id)
    .then(coworking => {
        if (coworking === null) {
            const message = `Le coworking demandé n'existe pas.`
            res.status(404).json({ message })
        } else {
            const message = "Un coworking a bien été trouvé."
            res.json({ message, data: coworking });
        }
    })
    .catch(error => {
        const message = `La liste des coworkings n'a pas pu se charger. Reessayez ulterieurement.`
        res.status(500).json({ message, data: error })
    })

    
}

exports.updateCoworkings =  (req,res)=> {
    
  Coworking1.update(req.body, {
    where :  {
      id : req.params.id
    }
  }).then((coworking) => {
    if ( coworking === null){
      const msg = "Le coworking demandé n'existe pas"
      res.json({message:msg})
    }else {
      const msg = "Le coworking a bien éte modifié."
      res.json({message:msg,data:coworking})
    }
  }).catch((error) => {
    if(error instanceof UniqueConstraintError || error instanceof ValidationError){
        return res.status(400).json({message: error.message, data: error})
    } 
    const msg = "Impossible de mettre à jour le coworking."
    res.status(500).json({message: msg})
})
  
    
}

exports.deleteCoworkings = (req,res) =>{
  
  Coworking1.findByPk(req.params.id)
    .then(coworking => {
      if (coworking === null){
        const message = `Le coworkings demandé n'existe pas`
        return res.status(404).json({message})
      }
      return Coworking1.destroy({
        where :{
          id: req.params.id
        }
      })
        .then(() => {
          const message = `Le coworkings ${coworking.name} a bien été suprimé`
          res.json({message,data:coworking})
        })
    })
    .catch(error => {
      const message = `Impossible de supprimer le coworking.`
      res.status(500).json({message,data:error}) 
    })
  
  
    
}

exports.createCoworkings = (req,res)=>{
  let newcoworkings = req.body;

  Coworking1.create({
    name: newcoworkings.body.name,
    price: newcoworkings.body.price,
    address: newcoworkings.body.address,
    picture: newcoworkings.body.picture,
    superficy: newcoworkings.body.superficy,
    capacity: newcoworkings.body.capacity
  }).then((element) => {
    const msg = 'Un coworking a bien été ajouté.'
    res.json({ message: msg, data: element })
  }).catch(error => {
    if (error instanceof UniqueConstraintError || error instanceof ValidationError ) {
      return res.status(400).json({message : error.message, data: error})
    }
    res.status(500).json(error)
  })
  
  
    
}