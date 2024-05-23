const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const dealRouter = require('./dealRouter')
// const commentRouter = require('./commentRouter')
// const ratingRouter = require('./ratingRouter')

router.use('/user', userRouter)
router.use('/deal', dealRouter)
// router.use('/comment', commentRouter)
// router.use('/rating', ratingRouter)

module.exports = router