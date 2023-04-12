const { UserModel } = require('../db/sequelize')
const { Op, UniqueConstraintError, ValidationError } = require('sequelize');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

exports.login = (req, res) => {
  if (!req.body.username || !req.body.password ){
    const msg = "Veuillez fournir un nom d'utilisateur et un mot de passe."
    return res.status(400).json({message:msg})
  }

  UserModel.findOne({where :{username :req.body.username}})
    .then(user => {
        if (!user){
            const msg = "L'utilisateur demandé n'existe pas."
            return res.status(400).json({message:msg})
        }
        bcrypt.compare(req.body.password,user.password)
            .then(isValid => {
                if(!isValid){
                    const msg = "le mot de passe est incorrect"
                    return res.status(400).json({message:msg})
                }

                //json web token

                const token = jwt.sign({
                    data:user.id
                },'jout',{expiresIn:'1h'})


                const  msg ="L'utilisateur a été connecté avec succès."
                user.password="hidden"
                return res.json({message:msg,user,token})
            })
    })
    .catch (error => {
        const msg = "L'utilisateur n'a pas pu se connecter."
        return res.status(500).json({message:msg,error})
    })
}
exports.signup = (req,res) => {
    bcrypt(req.body.password,10)
        .then(hash => {
            return UserModel.create({
                username : req.body.username,
                password:hash
            }).then((userCreated)=>{
                const message ="Un problème est survenu lors de la création du profil"
                return res.json({message,data:userCreated})
            })
        })
        .catch(error => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError){
                const message ="Un problème est survenu lors de la création du profil"
                return res.status(500).json({message :message.error,data:error})
            }
        })

}

exports.protect = (req,res,next) => {
    const authoHeader = req.headers.authorization

    if (!authoHeader){
        const message = "Un jeton est nécessaire pour accéder à la ressource"
        return res.status(401).json({message})
    }
    try{
        const token = authoHeader.split('')[1];
        const decoded = jwt.verify(token,privateKey)
        req.userId = decoded.data
    }catch(err){
        const message = "Jeton invalide"
        return res.status(403).json({message,data:err})
    }
    return next();
}

exports.restrictTo= (...roles) => {
    return (req,res,next)=> {
        UserModel.findByPk(req.userId)
            .then(user => {
                if(!user || !roles.every(role => user.roles.includes(role))) {
                    const message = "Droits insuffisants";
                    return res.status(403).json({message})
                }
            })
            .catch(err => {
                const message ="Erreur lors de l'autorisations"
                res.status(500).json({message,data:err})
            })
    }
}