module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Coworking', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique :{
                msg: 'Le nom est déjà pris'
            },
            validate:{
                notEmpty:{
                    msg: 'Ce champ ne peut être vide'
                }
            }
        },
        picture: {
            type: DataTypes.STRING,
        },
        superficy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                isInt: {
                    msg: 'Ma superficie doit être un entier'
                }
            }
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                isInt: {
                    msg: 'Le nombre de postes  doit être un entier'
                }
            }
        },
        price: {
            type: DataTypes.JSON,
            allowNull: false,
            validate :{
                isPriceValid(value){
                    if (value.hasOwnProperty('hour')&& value.hasOwnProperty('day') && value.hasOwnProperty('month')){
                        if (value.hour === null && value.day === null && value.month === null){
                            throw new Error("Au moins un des 3 tarifs doit être spécifié");
                        }else {
                            throw new Error("La syntaxe des données est incorrecte.");
                        }
                    }
                }
            }
        },
        address: {
            type: DataTypes.JSON,
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}