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
      },
      roles :{
        type :DataTypes.STRING,
        set(roles){
          this.setDataValue('roles',roles.join());
        },
        get(){
          return this.getDataValue('roles').split(',');
        }
      }
    },{
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
    
    
}