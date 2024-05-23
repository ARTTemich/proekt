const ApiError = require('../error/ApiError')
const db = require('../db')

class CommentController {
    async create(req, res) {
        try {
            const {name, text, user_id, repo_id, parent_id} = req.body
            const comment = await db.query(`INSERT INTO comments (name, text, user_id, repo_id, parent_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [name, text, user_id, repo_id, parent_id]) 
            return res.json(comment.rows[0])
        } catch (e) {
            return res.json({message: 'error creating'})
        }
    }

    async delete(req, res) {
        try {
            const {id, user_id, role} = req.body
            const authorId = await db.query(`SELECT * FROM comments WHERE id = $1`, [id])
           
            if (user_id == authorId.rows[0].user_id || role == 'ADMIN') {
                const deleteChild = await db.query(`DELETE FROM comments WHERE parent_id = $1`, [id])
                const comment = await db.query(`DELETE FROM comments WHERE id = $1`, [id])
                return res.json(comment.rows[0])
            }
            return next(ApiError.badRequest('You are not the author of this comment'))
            
            
        } catch (e) {
            return res.json({message: 'error deleting'})
        }
    }

    async getAll(req, res) {    
        const id = req.params.id
        const comments = await db.query(`SELECT * FROM comments WHERE repo_id = $1 ORDER BY id`, [id])

        return res.json(comments.rows)
    }
}

module.exports = new CommentController()