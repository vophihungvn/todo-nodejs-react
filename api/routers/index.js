const { Router } = require('express')
const todo = require('./todo')
const user = require('./user')

const router = Router();

router.use('/user', user)
router.use('/todo', todo)

module.exports = router