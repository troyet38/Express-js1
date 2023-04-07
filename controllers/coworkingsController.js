let coworkings = require('../appCoworkings')
const { Coworking1 } = require('../db/sequelize')

exports.findAllcoworkings = (req, res) => {
  // let sentence =''
  // coworkings.forEach((coworkings)=> {
  //   sentence += coworkings.name + ''
  // })
  // res.send(sentence)
  const limit = req.query.limit || 200
  // const result =coworkings.filter (element => element.superficy > limit);

  // const msg = ` La liste des coworkings a bien été retournée.`
  // res.json({message:msg, data : result})
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

exports.findCoworkingsByPK = (req, res) => {

    let myCoworking = coworkings.find((coworkings)=> {
      return coworkings.id == req.params.id
    })
    Coworking1.findByPk(req.params.id)
      .then(()=> {
        const msg = `Le coworking n° a bien été trouvé.`
        res.json ({message :msg})
      })
      .catch(() => {
        const msg = `Le coworking n°${req.params.id} n'as pas été trouvé.`
        res.json ({message :msg })
      })

    // let result;
  
    // if (myCoworking){
    //   const msg = `Le coworking n°${req.params.id} a bien été trouvé.`
    //   result = {message :msg ,data : myCoworking}
    // } else {
    //   const msg = `Le coworking n°${req.params.id} n'as pas été trouvé.`
    //   result = ({message :msg ,data : myCoworking})
    // }
    
    // res.json(result)
    // res.send(`Coworkings n°${req.params.id} !`)
}

exports.updateCoworkings =  (req,res)=> {
    
  Coworking1.update(req.body, {
    where :  {
      id : req.params.id
    }
  }).then((coworking) => {
    if ( Coworking1 === null){
      const msg = "Le coworking demandé n'existe pas"
      res.json({message:msg})
    }else {
      const msg = "Le coworking a bien éte modifié."
      res.json({message:msg,data:coworking})
    }
  })
  
    
}

exports.deleteCoworkings = (req,res) =>{
  const coworkingToDelete = coworkings.find(el => el.id == req.params.id)
  
  if (!coworkingToDelete) {
    return res.status(404).json({ message: `Aucun coworking ne correspond à l'id ${req.params.id}` })
  }

  
  let coworkingsUpdated = []
  coworkings.forEach((el) => {
      if (el.id != coworkingToDelete.id) {
          coworkingsUpdated.push(el)
      }
  })

  coworkings = coworkingsUpdated;
  res.json(coworkings)
    
}

exports.createCoworkings = (req,res)=>{
  let newcoworkings = req.body;

  Coworking1.create({
    name: req.body.name,
    price: req.body.price,
    address: req.body.address,
    picture: req.body.picture,
    superficy: req.body.superficy,
    capacity: req.body.capacity
  }).then(() => {
    const msg = 'Un coworking a bien été ajouté.'
    res.json({ message: msg, data: newcoworkings })
  }).catch(error => res.json(error))
  res.json(req.body)
  
    
}