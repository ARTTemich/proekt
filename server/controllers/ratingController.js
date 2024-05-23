const ApiError = require('../error/ApiError')
const db = require('../db')

class RatingController {
    async rate(req, res) {
        try {
            const {rate, repo_id, user_id} = req.body
            
            const existRating = await db.query(`SELECT * FROM ratings WHERE repo_id = $1 and user_id = $2`, [repo_id, user_id])

            if (existRating.rows[0] == undefined) {
                // console.log('insert')
                const rating = await db.query(`INSERT INTO ratings (rate, repo_id, user_id) VALUES ($1, $2, $3)`, [rate, repo_id, user_id])
            } else if (existRating.rows[0].rate == rate) {
                // console.log('delete')
                const deleteRating = await db.query(`DELETE FROM ratings WHERE repo_id = $1 and user_id = $2`, [repo_id, user_id])
            } else if (existRating.rows[0].rate != rate) {                
                // console.log('update')
                const updateRating = await db.query(`UPDATE ratings SET rate = $1 WHERE repo_id = $2 and user_id = $3`, [rate, repo_id, user_id])            
            }
            const updateRepoRating = await db.query(`SELECT * FROM ratings WHERE repo_id = $1`, [repo_id])

            let step = 0
            let rating = 0
            updateRepoRating.rows.map(rate => {

                step++
                rating += rate.rate
            })
            rating = Math.floor(rating / step)
            const newRating = await db.query(`UPDATE repos SET rating = $1 WHERE id = $2`, [rating, repo_id])
        } catch (e) {
            return res.json({message: 'something went wrong...'})
        }
    }


    async getOne(req, res) {
        try {
            const id = req.params.id
            const user = req.params.user
            const rating = await db.query(`SELECT * FROM ratings WHERE repo_id = $1 and user_id = $2`, [id, user])

            return res.json(rating.rows)
        } catch (e) {
            return res.json({message: 'users didn`t rate this'})
        }
    }

    async getAll(req, res) {
        try {
            const id = req.params.id
            const rating = await db.query(`SELECT * FROM ratings WHERE repo_id = $1`, [id])
            
            return res.json(rating.rows)
        } catch (e) {
            return res.json({message: 'no ratings'})
        }
    }
}

module.exports = new RatingController()