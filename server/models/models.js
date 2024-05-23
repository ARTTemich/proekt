const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    // link: {type: DataTypes.STRING, unique: true},
    // role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Deal = sequelize.define('deal', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    worker: {type: DataTypes.INTEGER, allowNull: false},
    filePath: { type: DataTypes.STRING, defaultValue: '' }, // Путь к файлу
    fileName: { type: DataTypes.STRING, defaultValue: '' } // Имя файла
})

// const Rating = sequelize.define('rating', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     rate: {type: DataTypes.INTEGER}
// })

// const Comment = sequelize.define('comment', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     text: {type: DataTypes.STRING},
// })


// const Link = sequelize.define('link', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     url: {type: DataTypes.STRING, unique: true, allowNull: false},
//     title: {type: DataTypes.STRING}
// })

User.hasMany(Deal)
Deal.belongsTo(User)

module.exports = {
    User,
    Deal
}