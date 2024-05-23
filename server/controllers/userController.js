// const {User} = require('../models/models')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db')

const generateToken = (id, phone, name) => {
    return jwt.sign(
        {id , phone,name},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {name, phone, password} = req.body
        if ( !name || !phone || !password) {
            return next(ApiError.badRequest('Incorrect data'))
        }
        const dataCheck = await db.query(`SELECT FROM users WHERE phone = $1`, [phone]) // find one
        if (dataCheck.rows[0]) {
            return next(ApiError.badRequest('phone is already used'))
        }
        // const nameCheck = await db.query(`SELECT FROM users WHERE name = $1`, [name]) // find one
        // if (nameCheck.rows[0]) {
        //     return next(ApiError.badRequest('Name is already used'))
        // }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await db.query(`INSERT INTO users (name, phone, password) values ($1, $2, $3) RETURNING *`, [name, phone, hashPassword])
        const token = generateToken(user.rows[0].id, user.rows[0].phone, user.rows[0].name)
        return res.json({token})
    }

    async login(req, res, next) {
        const {phone, password} = req.body
        const user = await db.query(`SELECT * FROM users WHERE phone = $1`, [phone]) // find one

        if (!user.rows[0]) {
            return next(ApiError.badRequest('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.rows[0].password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Неверный пароль'))
        }

        const token = generateToken(user.rows[0].id, user.rows[0].phone, user.rows[0].name)
        return res.json({token})
    }

    async check(req, res) {
        const token = generateToken(req.user.id, req.user.phone, req.user.name)
        return res.json({token})
    }
    async list(req, res) {    
        const search = req.params.search
        const users = await db.query(`SELECT * FROM users WHERE name = $1`, [search])

        return res.json(users.rows)
    }
    // async profile(req, res) {    
    //     const search = req.params.search
    //     const users = await db.query(`SELECT * FROM users WHERE name = $1`, [search])

    //     return res.json(users.rows)
    // }
}

module.exports = new UserController()