const {Sequelize,DataTypes} = require('sequelize')
const CoworkingModel = require('../models/coworkings')
const coworkings = require('../appCoworkings')


const sequelize = new Sequelize('coworkings', 'root', '', {
    host: 'localhost',
    dialect:  'mariadb' ,
    logging: false
});
  



const Coworking1 = CoworkingModel(sequelize,DataTypes);

const initDb = ()=> {
    return sequelize.sync({force :true})
    .then(()=> {
        coworkings.forEach((element)=> {
            Coworking1.create({
            name: element.name,
            price: element.price,
            address: element.address,
            picture: element.picture,
            superficy: element.superficy,
            capacity: element.capacity,
            })

        })

    })
}
sequelize.authenticate()
    .then(() =>  console.log('Connection has been established successfully.'))
    .catch (error => console.error(`Unable to connect to the database ${error}`));

module.exports={
    sequelize,Coworking1,initDb
}