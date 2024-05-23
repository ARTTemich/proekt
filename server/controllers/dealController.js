const db = require('../db')

class DealController {
    async create(req, res) {
        try {
            const {name, description, worker} = req.body
            const deal = await db.query(`INSERT INTO deals (name, description, worker) VALUES ($1, $2, $3)`, [name, description, worker])
            return res.json(deal.rows[0])
        } catch (e) {
            return res.json({message: 'error'})
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.body
            const deal = await db.query(`DELETE FROM deals WHERE id = $1`, [id])
        } catch (e) {
            return res.json({message: 'error'})
        }
    }

    async getAll(req, res) {
        let {limit, page} = req.query
        const worker = req.params.worker
        // TODO: make pagination
        page = page || 1
        limit = limit || 5
        let offset = page * limit - limit

        const deals = await db.query(`SELECT * FROM deals WHERE worker = $1 ORDER BY id`, [worker])
        res.json(deals.rows)
    }

    async getOne(req, res) {
        // return res.json({message: 'getOne'})
        const id = req.params.id
        const deal = await db.query(`SELECT * FROM deals WHERE id = $1`, [id])
        return res.json(deal.rows[0])
    }

}

module.exports = new DealController()