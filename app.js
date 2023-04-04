const express = require('express')
const app = express()
const port = 3005
const coworkings = require('./appCoworkings');


app.get('/api/coworkings', (req, res) => {
  // let sentence =''
  // coworkings.forEach((coworkings)=> {
  //   sentence += coworkings.name + ''
  // })
  // res.send(sentence)
  const limit = req.query.limit || 200
  const result =coworkings.filter (element => element.superficy > limit);

  const msg = ` La liste des coworkings a bien été retournée.`
  res.json({message:msg, data : result})
})

app.get('/api/coworkings/:id', (req, res) => {

  let myCoworking = coworkings.find((coworkings)=> {
    return coworkings.id == req.params.id
  })

  let result = {}

  if (myCoworking){
    const msg = `Le coworking n°${req.params.id} a bien été trouvé.`
    result = {message :msg ,data : myCoworking}
  } else {
    const msg = `Le coworking n°${req.params.id} n'as pas été trouvé.`
    result = ({message :msg ,data : myCoworking})
  }
  
  res.json(result)
  // res.send(`Coworkings n°${req.params.id} !`)
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})