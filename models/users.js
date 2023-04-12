module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique: {
          msg:"Le nom d'utilisateur est déjà pris."
        }
      },
      password: {
        type: DataTypes.STRING
      }
    },{
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
    
    
}