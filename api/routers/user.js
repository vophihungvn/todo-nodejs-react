const { Router } = require('express')
const router = Router()

router.get('/', async (req, res) => {
  res.send('hello in user')
})

router.post('/', async (req, res) => {

})

module.exports = router